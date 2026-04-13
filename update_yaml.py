import yaml
from datetime import datetime

with open('figma-to-code-plan.yaml', 'r', encoding='utf-8') as f:
    plan = yaml.safe_load(f)

today = "2026-04-11"

for mod in plan['modules']:
    if mod['id'] == '1':
        for feat in mod['features']:
            if feat['id'] == '1.1':
                for func in feat['functions']:
                    if func['id'] == '2':
                        func['status'] = 'done'
                        func['file_path'] = 'app/src/screens/IndustrialZone/IZListScreen.tsx'
                        func['generated_at'] = today
                    elif func['id'] in ['3', '4', '5', '6']:
                        func['status'] = 'done'
                        func['file_path'] = 'app/src/screens/IndustrialZone/IZDetailScreen.tsx'
                        func['generated_at'] = today
                    elif func['id'] == '7':
                        func['status'] = 'done'
                        func['file_path'] = 'app/src/screens/IndustrialZone/IZProjectsScreen.tsx'
                        func['generated_at'] = today

if 'changelog' not in plan:
    plan['changelog'] = []
plan['changelog'].append({
    'date': today,
    'action': 'Generated',
    'feature': '1.1 - Khai thác thông tin khu công nghiệp trên mobile',
    'file': 'app/src/screens/IndustrialZone/*',
    'changes': 'Code chuẩn Expo project có mock data và navigation'
})

class MyDumper(yaml.SafeDumper):
    def increase_indent(self, flow=False, indentless=False):
        return super(MyDumper, self).increase_indent(flow, False)

with open('figma-to-code-plan.yaml', 'w', encoding='utf-8') as f:
    yaml.dump(plan, f, Dumper=MyDumper, default_flow_style=False, sort_keys=False, allow_unicode=True)
