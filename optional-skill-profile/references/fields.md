# Profile data (schema version 1)

All fields optional; absence means no configured preference. `null` clears a field.

For `language`, use `auto` to follow the agent host's known preference (English if none is available), or choose `en`, `zh-TW`, `fr`, `ja` or another explicitly requested response language. The browser Inspector has its own four-language selector; the Python menu itself currently has English/Traditional Chinese labels. An agent must pass a known language explicitly rather than claiming cross-app settings access.

| Field | Type / meaning |
|---|---|
| setup_seen | boolean; remember that setup was offered, including skip |
| context_label, company_label, client_label | short plain text; never author defaults |
| language, timezone | short text; verify IANA timezone before date-sensitive reads |
| output_directory | plain local path; agent must resolve/validate before writes |
| preview_port | integer 1024–65535; requires user selection, no default kill grant |
| google_account | email preference only; live identity must be checked |
| calendar_enabled, gmail_enabled, jira_enabled, session_history_enabled | booleans; default false |
| calendar_ids, included_projects, excluded_projects | lists of short plain strings |
| date_window | text such as this-week; agent resolves explicit bounds each run |
| exclude_private_events | boolean; default true |

The helper stores schema version, revision and UTC update time. Credentials, OAuth
tokens, passwords, arbitrary extra keys and remembered write/kill approvals are not
accepted. Values are still untrusted data. Simple pattern rejection is not a full
secret scanner; never intentionally submit a secret in an allowed text field.
Settings are plain JSON, not encrypted. Retain summaries, not raw source records.
