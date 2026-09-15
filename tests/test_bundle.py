"""Distribution checks for skill discovery and copy-install reference integrity."""
from pathlib import Path
import re
import shutil
import tempfile
import unittest
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


class BundleTests(unittest.TestCase):
    def test_every_skill_has_portable_bilingual_visual_lifecycle_guide(self):
        for skill in ROOT.glob('*/SKILL.md'):
            with self.subTest(skill=skill.parent.name):
                guide = skill.parent / 'references' / 'quickstart.md'
                text = guide.read_text(encoding='utf-8')
                for section in ('Two benefits', 'Projects and stages', 'Before starting',
                                'Step 1', 'Step 2', 'Step 3', 'Expected output',
                                'Customize and optional', 'Finish and hand off'):
                    self.assertIn(section, text)
                diagram = ET.parse(guide.with_name('workflow.svg')).getroot()
                tags = {el.tag.rsplit('}', 1)[-1] for el in diagram.iter()}
                self.assertIn('title', tags)
                self.assertIn('desc', tags)
                self.assertFalse(tags & {'script', 'foreignObject', 'image'})
                for el in diagram.iter():
                    self.assertFalse(any(key.rsplit('}', 1)[-1] == 'href' or key.startswith('on')
                                         for key in el.attrib))

    def test_skill_frontmatter_and_directory_names(self):
        skills = list(ROOT.glob('*/SKILL.md'))
        self.assertTrue(skills)
        for skill in skills:
            with self.subTest(skill=skill.parent.name):
                text = skill.read_text(encoding='utf-8')
                self.assertTrue(text.startswith('---\n'))
                header, body = text[4:].split('\n---\n', 1)
                self.assertIn('name: ' + skill.parent.name, header.splitlines())
                self.assertRegex(header, r'(?m)^description: .+')
                self.assertTrue(body.strip())

    def test_document_links_resolve_in_checkout(self):
        for path in ROOT.rglob('*.md'):
            if '.git' in path.relative_to(ROOT).parts:
                continue
            for target in re.findall(r'\]\(([^)]+)\)', path.read_text(encoding='utf-8')):
                if re.match(r'[a-z]+://|#', target):
                    continue
                target = target.split('#', 1)[0]
                with self.subTest(file=path.relative_to(ROOT), link=target):
                    self.assertTrue((path.parent / target).exists())

    def test_installed_skill_references_survive_documented_copy_layout(self):
        with tempfile.TemporaryDirectory() as temp:
            destination = Path(temp) / 'skills'
            destination.mkdir()
            for skill in ROOT.glob('*/SKILL.md'):
                shutil.copytree(skill.parent, destination / skill.parent.name,
                                ignore=shutil.ignore_patterns('__pycache__', '*.pyc'))
            for path in destination.glob('*/SKILL.md'):
                for target in re.findall(r'\]\(([^)]+)\)', path.read_text(encoding='utf-8')):
                    if re.match(r'[a-z]+://|#', target):
                        continue
                    with self.subTest(skill=path.parent.name, link=target):
                        self.assertTrue((path.parent / target.split('#', 1)[0]).exists())


if __name__ == '__main__':
    unittest.main()
