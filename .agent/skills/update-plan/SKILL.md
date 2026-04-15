---
name: update-plan
description: Cập nhật figma-to-code-plan.yaml — thay đổi status trong scanned array, ghi timestamp, thêm file_path. Dùng sau khi gen hoặc update code.
disable-model-invocation: true
argument-hint: <feature ID> <action: gen|update|init|scan>
---

# Skill: Update Plan YAML

## Input: $ARGUMENTS (feature ID + action)

## Mục tiêu
Cập nhật trạng thái trong `figma-to-code-plan.yaml` cho 1 feature hoặc phase.

## Các action hỗ trợ

### Action: `scan`
Khi vừa scan xong 1 Figma section cho 1 feature:

**Nếu file CHƯA tồn tại** → tạo mới với cấu trúc:
```yaml
project:
  name: <Tên project>
  platform: react-native
  figma_file: '<fileKey>'
phase_0:
  status: pending
  components_generated: []
scanned:
  - feature: '<featureId>'
    name: '<feature name>'
    scanned_at: <ngày hiện tại>
    figma_section: '<sectionId>'
    figma_section_name: '<section name>'
    status: scanned
    functions: [...]
```

**Nếu file ĐÃ tồn tại** → append hoặc update entry trong `scanned` array:
```yaml
# Thêm/update entry trong scanned:
- feature: '<featureId>'
  scanned_at: <ngày hiện tại>
  status: scanned
  functions:
    - id: '<ucNumber>'
      status: scanned
      figma_nodes: [...]
```

### Action: `gen`
Khi vừa gen code xong cho 1 feature:
```yaml
# Cập nhật entry trong scanned array:
generated_at: <ngày hiện tại YYYY-MM-DD>
status: done | partial    # tùy theo functions bên trong

# Cập nhật từng function:
functions:
  - id: '<funcId>'
    status: done | partial | scanned
    file_path: <đường dẫn file .tsx đã tạo>
    generated_at: <ngày hiện tại>
    note: <ghi chú nếu partial>
```

**Quy tắc đánh status:**
- Function `done` = UI hoàn chỉnh, bám sát Figma
- Function `partial` = đã gen nhưng thiếu nội dung
- Function `scanned` = chưa gen hoặc không tìm thấy thiết kế
- Feature `done` = TẤT CẢ functions đều done
- Feature `partial` = ít nhất 1 done, có function scanned/partial
- Feature `scanned` = chưa gen code nào
- **TUYỆT ĐỐI KHÔNG đánh done cho placeholder UI**

### Action: `update`
Khi vừa update code từ Figma mới:
```yaml
# Cập nhật entry trong scanned array:
generated_at: <ngày hiện tại YYYY-MM-DD>    # cập nhật ngày

# Cập nhật function đã update:
functions:
  - id: '<funcId>'
    generated_at: <ngày hiện tại>
    note: <mô tả thay đổi>
```

### Action: `init`
Khi hoàn thành phase 0 (init design system):
```yaml
# Cập nhật phase 0:
phase_0:
  status: done
  completed_at: <ngày hiện tại>
  components_generated: [<danh sách component names>]
```

## Quy tắc
1. **Đọc YAML trước** khi ghi → tránh mất dữ liệu
2. **Chỉ sửa fields liên quan** — không đụng vào các entry khác trong `scanned`
3. **Giữ format YAML** nhất quán (xem `.agent/rules/plan-schema.md`)
4. **Scan tạo file mới** nếu plan chưa tồn tại, **append** nếu đã tồn tại
5. **Không xóa entries** trong `scanned` array — chỉ thêm hoặc update

## Giới hạn
- **Chỉ cập nhật** `figma-to-code-plan.yaml` — không gen code, không đọc Figma
