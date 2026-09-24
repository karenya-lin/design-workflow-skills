import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class SkillContractTests(unittest.TestCase):
    def skill_files(self):
        return sorted(path for path in ROOT.glob("*/SKILL.md") if path.is_file())

    def test_all_skill_descriptions_have_explicit_trigger_contracts(self):
        skills = self.skill_files()
        self.assertEqual(14, len(skills))
        for path in skills:
            text = path.read_text(encoding="utf-8")
            match = re.search(r"^description:\s*(.+)$", text, re.MULTILINE)
            self.assertIsNotNone(match, f"{path} has no description")
            description = match.group(1).strip()
            self.assertIn("Use ", description, f"{path} does not say when to use it")
            self.assertLessEqual(
                len(description),
                320,
                f"{path} description is too large for always-loaded routing metadata",
            )

    def test_large_workflows_keep_operational_detail_in_references(self):
        cases = {
            "figma-workflow-rebrand": "references/execution-runbook.md",
            "ui-element-inspector": "references/operator-runbook.md",
        }
        for skill, reference in cases.items():
            skill_path = ROOT / skill / "SKILL.md"
            body = skill_path.read_text(encoding="utf-8")
            self.assertLessEqual(
                len(body.splitlines()),
                90,
                f"{skill}/SKILL.md grew back into a full runbook",
            )
            self.assertTrue((ROOT / skill / reference).is_file())
            self.assertIn(reference, body)

    def test_readme_recommends_minimal_install_instead_of_all_skills(self):
        en = (ROOT / "README.md").read_text(encoding="utf-8")
        zh = (ROOT / "README.zh-TW.md").read_text(encoding="utf-8")
        self.assertIn("you do not need to install all fourteen", en)
        self.assertIn("不需要 14 個全部安裝", zh)


if __name__ == "__main__":
    unittest.main()
