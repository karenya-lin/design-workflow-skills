"""Interactive local settings. Never runs checks, connects accounts, or edits skills."""
import argparse
import copy
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile

import review

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    'workflow_profile', ROOT / 'optional-skill-profile/scripts/profile.py')
profile = importlib.util.module_from_spec(spec)
spec.loader.exec_module(profile)

LABELS = {
    'context_label': ('Project label', '專案名稱'),
    'company_label': ('Company label (optional)', '公司名稱（選填）'),
    'client_label': ('Client label (optional)', '客戶名稱（選填）'),
    'language': ('Agent response language', 'AI 回覆語言'),
    'timezone': ('Timezone', '時區'),
    'output_directory': ('Output directory preference', '輸出目錄偏好'),
    'preview_port': ('Preview port (1024–65535)', '預覽 port（1024–65535）'),
    'google_account': ('Google email preference (not OAuth)', 'Google Email 偏好（不是登入授權）'),
    'date_window': ('Work-record date window', '工作紀錄日期範圍'),
    'calendar_enabled': ('Allow asking to read selected Calendar', '允許詢問讀取指定日曆'),
    'gmail_enabled': ('Allow asking to read scoped Gmail', '允許詢問讀取限定 Gmail'),
    'jira_enabled': ('Allow asking to read scoped Jira', '允許詢問讀取限定 Jira'),
    'session_history_enabled': ('Allow asking to read session history', '允許詢問讀取對話紀錄'),
    'exclude_private_events': ('Exclude private calendar events', '排除私人日曆事件'),
    'calendar_ids': ('Selected calendar IDs', '指定日曆 ID'),
    'included_projects': ('Included projects', '包含的專案'),
    'excluded_projects': ('Excluded projects', '排除的專案'),
    'setup_seen': ('Remember onboarding choice', '記住初次設定選擇'),
}


def empty_pipeline():
    return {'version': 1, 'external_skills': [], 'checks': {}, 'phases': {
        'review': {'skills': ['uiux-checks', 'ui-design-review', 'a11y-review'], 'checks': []}}}


def read_pipeline(path):
    if path.is_symlink():
        raise ValueError('Symlink not accepted')
    if not path.exists():
        return empty_pipeline(), None
    return review.load(path)


def save_pipeline(path, doc, expected_hash):
    review.validate(doc)
    raw = (json.dumps(doc, ensure_ascii=False, indent=2) + '\n').encode('utf-8')
    if len(raw) > 131072 or profile.SECRET.search(raw.decode('utf-8')):
        raise ValueError('Oversized or credential-like configuration')
    with profile.lock(path):
        _, current_hash = read_pipeline(path)
        if current_hash != expected_hash:
            raise ValueError('Pipeline changed; restart and review')
        fd, tmp = tempfile.mkstemp(dir=path.parent, prefix='.review-', suffix='.tmp')
        try:
            with os.fdopen(fd, 'wb') as stream:
                stream.write(raw)
                stream.flush()
                os.fsync(stream.fileno())
            os.replace(tmp, path)
        finally:
            if os.path.exists(tmp):
                os.unlink(tmp)
    return hashlib.sha256(raw).hexdigest()


def patch_for(before, after):
    return {k: after.get(k) for k in before.keys() | after.keys() if before.get(k) != after.get(k)}


def parse_value(key, text):
    if text == '!':
        return None
    if key in profile.BOOL:
        if text not in {'1', '2'}:
            raise ValueError('Choose 1 or 2')
        value = text == '1'
    elif key == 'preview_port':
        value = int(text)
    elif key in profile.LIST:
        value = [v.strip() for v in text.split(',') if v.strip()]
    else:
        value = text
    profile.validate({key: value})
    return value


def remove_item(doc, kind, name):
    candidate = copy.deepcopy(doc)
    if kind in {'checks', 'external_skills'}:
        key = 'checks' if kind == 'checks' else 'skills'
        if any(name in p[key] for p in candidate['phases'].values()):
            raise ValueError('Remove phase references first')
    if kind == 'external_skills':
        candidate[kind].remove(name)
    else:
        del candidate[kind][name]
    review.validate(candidate)
    return candidate


class Menu:
    def __init__(self, workspace, name='default', language='en', input_fn=input, output_fn=print):
        self.ask = input_fn
        self.out = output_fn
        self.zh = language == 'zh-TW'
        self.path = profile.profile_path(workspace, name)
        self.review_path = self.path.with_name(name + '.review.local.json')
        self.saved = profile.read(self.path)
        self.prefs = copy.deepcopy(self.saved['preferences'])
        self.pipeline, self.digest = read_pipeline(self.review_path)
        self.saved_pipeline = copy.deepcopy(self.pipeline)

    def say(self, en, zh):
        self.out(zh if self.zh else en)

    def prompt(self, en, zh):
        return self.ask(zh if self.zh else en).strip()

    def confirm(self):
        return self.prompt('Type YES to save; anything else cancels: ',
                           '輸入 YES 儲存，其他輸入取消：') == 'YES'

    def show(self):
        self.out(str(self.path))
        self.out(json.dumps(profile.summary({'preferences': self.prefs}), ensure_ascii=False, indent=2))
        self.out(str(self.review_path))
        self.out(json.dumps(self.pipeline, ensure_ascii=False, indent=2))
        self.say('Local display only: do not paste private values or paths publicly.',
                 '僅本機顯示：請勿將私人資料或路徑貼到公開處。')

    def edit_preferences(self):
        keys = list(LABELS)
        for index, key in enumerate(keys, 1):
            self.out(f'{index}. {LABELS[key][1 if self.zh else 0]} ({key})')
        raw = self.prompt('Field number; Enter cancels: ', '選擇欄位編號；Enter 取消：')
        if not raw:
            return
        index = int(raw) - 1
        if not 0 <= index < len(keys):
            raise ValueError('Invalid choice')
        key = keys[index]
        self.say('Enter keeps; ! clears. Boolean: 1=yes, 2=no. Lists: comma-separated.',
                 'Enter 保留；! 清除。開關：1=是，2=否。清單用逗號分隔。')
        if key == 'language':
            self.say('Response language: auto (AI default), en, zh-TW, fr or ja. Other languages are also accepted.',
                     '回覆語言：auto（AI 預設）、en、zh-TW、fr、ja；也可輸入其他語言。')
        raw = self.prompt('New value (no secrets): ', '新值（不可放密碼或 Token）：')
        if raw:
            value = parse_value(key, raw)
            if value is None:
                self.prefs.pop(key, None)
                if key in profile.DEFAULTS:
                    self.prefs[key] = profile.DEFAULTS[key]
            else:
                self.prefs[key] = value

    def choose_ids(self, available, label):
        self.out(label)
        for index, value in enumerate(available, 1):
            self.out(f'{index}. {value}')
        raw = self.prompt('Ordered numbers separated by commas; Enter = none: ',
                          '依順序輸入編號，以逗號分隔；Enter = 不選：')
        indices = [int(v.strip()) - 1 for v in raw.split(',') if v.strip()]
        if any(i < 0 or i >= len(available) for i in indices):
            raise ValueError('Invalid selection')
        return list(dict.fromkeys(available[i] for i in indices))

    def edit_pipeline(self):
        self.say('1 Add/edit phase  2 Add/edit command  3 Declare external skill\n'
                 '4 Remove phase  5 Remove command  6 Remove external skill  0 Back',
                 '1 新增／修改階段  2 新增／修改指令  3 宣告外部 skill\n'
                 '4 刪除階段  5 刪除指令  6 刪除外部 skill  0 返回')
        action = self.prompt('Choose: ', '選擇：')
        if action not in {'1', '2', '3', '4', '5', '6'}:
            return
        name = self.prompt('ID (lowercase letters, numbers, hyphens); Enter cancels: ',
                           'ID（小寫英文、數字、連字號）；Enter 取消：')
        if not name:
            return
        pattern = review.SKILL_ID if action in {'3', '6'} else review.ID
        if not pattern.fullmatch(name):
            raise ValueError('Invalid ID')
        candidate = copy.deepcopy(self.pipeline)
        if action == '1':
            skills = self.choose_ids(sorted(review.SKILLS) + candidate.get('external_skills', []), 'Skills')
            checks = self.choose_ids(list(candidate['checks']), 'Checks')
            candidate['phases'][name] = {'skills': skills, 'checks': checks}
        elif action == '2':
            self.say('This SAVES a command, never executes it. No tokens or shell wrappers.\n'
                     'Enter the executable, then ONE argument per prompt (no wrapping quotes).',
                     '這裡只存指令，不執行。不可放 Token 或 shell 包裝。\n'
                     '先輸入執行檔，再逐項輸入參數（不用包引號）。')
            executable = self.prompt('Executable path/name: ', '執行檔路徑／名稱：')
            argv = [executable]
            for _ in range(99):
                arg = self.prompt('Next argument; Enter finishes: ', '下一個參數；Enter 結束：')
                if not arg:
                    break
                argv.append(arg)
            seconds = self.prompt('Timeout seconds (1–3600), default 60: ', '逾時秒數（1–3600），預設 60：')
            candidate['checks'][name] = {'argv': argv, 'timeout_seconds': int(seconds or '60')}
        elif action == '3':
            candidate.setdefault('external_skills', []).append(name)
            self.say('Declaration only. An agent must locate, read and check compatibility before use.',
                     '只是名稱宣告；使用前須由 AI 找到、閱讀並核對相容性，沒有自動安裝。')
        else:
            candidate = remove_item(candidate, {'4': 'phases', '5': 'checks', '6': 'external_skills'}[action], name)
        review.validate(candidate)
        if profile.SECRET.search(json.dumps(candidate)):
            raise ValueError('Credential-like input')
        self.pipeline = candidate

    def save_preferences(self):
        patch = patch_for(self.saved['preferences'], self.prefs)
        if not patch:
            self.say('No preference changes.', '沒有設定變更。')
            return
        self.say('Preference changes (account/calendar masked):', '設定差異（帳號／日曆已遮蔽）：')
        for key in patch:
            def display(prefs):
                return profile.summary({'preferences': prefs})['preferences'].get(key)
            self.out(f'{key}: {display(self.saved["preferences"])} -> {display(self.prefs)}')
        self.out(str(self.path))
        if self.confirm():
            self.saved = profile.save(self.path, patch, self.saved['revision'])
            self.prefs = copy.deepcopy(self.saved['preferences'])
            self.say('Saved and read back. No connection or write permission granted.',
                     '已儲存並讀回。沒有連接帳號，也沒有新增寫入授權。')

    def save_review(self):
        if self.pipeline == self.saved_pipeline and self.digest is not None:
            self.say('No pipeline changes.', '流程沒有變更。')
            return
        self.say('Before / after (local only):', '儲存前／後（僅本機顯示）：')
        self.out(json.dumps({'before': self.saved_pipeline if self.digest else None,
                             'after': self.pipeline}, ensure_ascii=False, indent=2))
        self.out(str(self.review_path))
        if self.confirm():
            save_pipeline(self.review_path, self.pipeline, self.digest)
            self.pipeline, self.digest = read_pipeline(self.review_path)
            self.saved_pipeline = copy.deepcopy(self.pipeline)
            self.say('Saved and read back. Commands and skills were NOT executed.',
                     '已儲存並讀回。沒有執行任何指令或 skill。')

    def run(self):
        self.say('Settings / local preferences only. No OAuth, process kill, Git or checks.\n'
                 'Settings files are private plain JSON outside your workspace. Never enter secrets.',
                 '設定選單／僅本機偏好。不做 OAuth、不停止程序、不操作 Git、不跑檢查。\n'
                 '設定是專案外的私人純 JSON，不是加密保管庫；請勿輸入秘密。')
        self.show()
        while True:
            self.say('\n1 Edit preferences  2 Edit skill/check pipeline  3 Show settings\n'
                     '4 Save preferences  5 Save pipeline  6 Reset preferences (pending save)\n'
                     '7 Reset pipeline (pending save)  8 Disconnect all sources (pending save)\n'
                     '9 Switch menu language  0 Exit without saving pending changes',
                     '\n1 修改偏好  2 修改 skills／檢查流程  3 顯示設定\n'
                     '4 儲存偏好  5 儲存流程  6 重設偏好（待儲存）\n'
                     '7 重設流程（待儲存）  8 停用所有來源（待儲存）\n'
                     '9 切換選單語言  0 離開，不儲存尚未儲存的變更')
            try:
                action = self.prompt('Choose: ', '選擇：')
                if action == '0':
                    return 0
                if action == '1':
                    self.edit_preferences()
                elif action == '2':
                    self.edit_pipeline()
                elif action == '3':
                    self.show()
                elif action == '4':
                    self.save_preferences()
                elif action == '5':
                    self.save_review()
                elif action == '6':
                    self.prefs = dict(profile.DEFAULTS)
                elif action == '7':
                    self.pipeline = empty_pipeline()
                elif action == '8':
                    for key in ('calendar_enabled', 'gmail_enabled', 'jira_enabled', 'session_history_enabled'):
                        self.prefs[key] = False
                    for key in ('google_account', 'calendar_ids'):
                        self.prefs.pop(key, None)
                    self.say('Pending local disconnect; save with 4. Revoke OAuth separately at the provider.',
                             '待停用本機來源；選 4 儲存。OAuth 權限需另到服務端撤銷。')
                elif action == '9':
                    self.zh = not self.zh
                else:
                    self.say('Choose a listed number.', '請選清單中的編號。')
            except (ValueError, OSError, KeyError):
                self.say('No save completed. Invalid input, locked or changed file: inspect and restart on conflict.',
                         '未完成儲存。輸入不合法、檔案被鎖定或已變更；衝突時請重新開啟核對。')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--workspace', required=True)
    parser.add_argument('--profile', default='default')
    parser.add_argument('--language', choices=['en', 'zh-TW'], default='en')
    args = parser.parse_args()
    try:
        return Menu(args.workspace, args.profile, args.language).run()
    except (EOFError, KeyboardInterrupt):
        print('\nClosed. Unsaved changes were discarded. / 已結束，未儲存變更已放棄。')
        return 0
    except (ValueError, OSError):
        print('Cannot open settings; check workspace, profile and JSON. Existing files were not reset.', file=sys.stderr)
        return 1


if __name__ == '__main__':
    for stream in (sys.stdin, sys.stdout):
        if hasattr(stream, 'reconfigure'):
            stream.reconfigure(encoding='utf-8')
    sys.exit(main())
