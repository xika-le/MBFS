import re
import io
import os
import yaml

input_file = r'c:\Users\admin\Documents\Project\GOV\docs\MBFS_Cong_Dau_Tu_QG.md'

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

table_lines = [line.strip() for line in lines if line.strip().startswith('|') and 'Danh mục' not in line and '---' not in line]

modules = []
current_module = None
current_feature = None

last_module_name = "KHÁC"
last_feature_name = "Khác"

# | # | Danh mục | Nhóm chức năng | Chức năng chính | Nguồn tham khảo | Ưu tiên |
for line in table_lines:
    if line.startswith('| Ưu tiên |') or line.startswith('| Ưu tiên cao |') or line.startswith('| Ưu tiên thấp |') or line.startswith('| Cancel') or line.startswith('| Out-of-scope'):
        continue
    
    parts = [p.strip() for p in line.split('|')]
    if len(parts) >= 6:
        uc_id = parts[1]
        dm = parts[2]
        ncn = parts[3]
        ccn = parts[4]
        
        if not uc_id:
            continue
            
        if dm:
            last_module_name = dm.upper()
        if ncn:
            last_feature_name = ncn.capitalize()
            
        function_name = ccn
        if not function_name:
            continue # no specific function
            
        # find or create module
        mod = next((m for m in modules if m['name'] == last_module_name), None)
        if not mod:
            mod = {'id': str(len(modules) + 1), 'name': last_module_name, 'features': []}
            modules.append(mod)
            
        # find or create feature
        feat = next((f for f in mod['features'] if f['name'] == last_feature_name), None)
        if not feat:
            feat_id = f"{mod['id']}.{len(mod['features']) + 1}"
            feat = {'id': feat_id, 'name': last_feature_name, 'functions': []}
            mod['features'].append(feat)
            
        func = {
            'id': str(uc_id), # Keep sequential number!
            'name': function_name,
            'status': 'pending'
        }
        feat['functions'].append(func)

# Build feature_list.md
out_md = []
out_md.append("# Phân rã chức năng - Cổng Đầu Tư Quốc Gia (MBFS)\n")
out_md.append("Cây phân rã được trích xuất từ tài liệu Usecase của BA, giữ nguyên định danh của BA để map chuẩn với Figma.\n")

total_modules = len(modules)
total_features = sum(len(m['features']) for m in modules)
total_funcs = sum(len(f['functions']) for m in modules for f in m['features'])

for m_idx, mod in enumerate(modules):
    out_md.append(f"## {mod['id']}. {mod['name']}")
    for f_idx, feat in enumerate(mod['features']):
        # prefix for tree
        feat_prefix = "├── " if f_idx < len(mod['features']) - 1 else "└── "
        out_md.append(f"{feat_prefix}{feat['id']} {feat['name']}")
        
        for func_idx, func in enumerate(feat['functions']):
            is_last_feat = f_idx == len(mod['features']) - 1
            func_indent = "    " if is_last_feat else "│   "
            func_prefix = "├── " if func_idx < len(feat['functions']) - 1 else "└── "
            out_md.append(f"{func_indent}{func_prefix}[{func['id']}] {func['name']}")
    out_md.append("")

with open(r'c:\Users\admin\Documents\Project\GOV\docs\feature_list.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_md))

# Build YAML plan
plan = {
    'project': {
        'name': 'MBFS - Cổng Đầu Tư Quốc Gia',
        'platform': 'react-native',
        'figma_file': 'Đang chờ cấu hình'
    },
    'phase_0': {
        'status': 'pending',
        'components_generated': []
    },
    'modules': modules,
    'changelog': []
}

# Add PyYAML output
class MyDumper(yaml.SafeDumper):
    def increase_indent(self, flow=False, indentless=False):
        return super(MyDumper, self).increase_indent(flow, False)

with open(r'c:\Users\admin\Documents\Project\GOV\figma-to-code-plan.yaml', 'w', encoding='utf-8') as f:
    yaml.dump(plan, f, Dumper=MyDumper, default_flow_style=False, sort_keys=False, allow_unicode=True)

print(f"Tổng số Module: {total_modules}")
print(f"Tổng số Nhóm chức năng: {total_features}")
print(f"Tổng số Chức năng chi tiết (UC): {total_funcs}")
print("Đã tạo docs/feature_list.md và figma-to-code-plan.yaml")
