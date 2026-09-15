"""Build offline locale assets and the self-contained inspector prefix. No dependencies."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
START = '/* BEGIN GENERATED LOCALES */'
END = '/* END GENERATED LOCALES */'


def main():
    catalog = json.loads((ROOT / 'assets/locales.json').read_text(encoding='utf8'))
    if not all(isinstance(k, str) and len(v) == 3 and all(isinstance(s, str) and s for s in v)
               for k, v in catalog.items()):
        raise ValueError('Every source string needs English, French and Japanese')
    runtime = (ROOT / 'scripts/locale-runtime.js').read_text(encoding='utf8')
    built = runtime.replace('/* LOCALE_CATALOG */ {}', json.dumps(catalog, ensure_ascii=False))
    (ROOT / 'assets/i18n.js').write_text(built, encoding='utf8')
    path = ROOT / 'assets/inspector.js'
    source = path.read_text(encoding='utf8')
    if source.startswith(START):
        source = source.split(END, 1)[1].lstrip('\n')
    path.write_text(START+'\n'+built+'\n'+END+'\n'+source, encoding='utf8')
    print(f'Built {len(catalog)} UI strings in four locales.')


if __name__ == '__main__':
    main()
