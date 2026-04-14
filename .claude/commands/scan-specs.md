---
description: "Scan specs tu anh mo ta hoac text -> map thanh functions -> ghi vao plan YAML. Vi du: /scan-specs --feature 3.1"
---

# /scan-specs $ARGUMENTS

Quet thong tin UI tu anh mo ta (paste truc tiep hoac folder docs/img_references/) va text mo ta, map thanh functions, ghi vao `figma-to-code-plan.yaml`.

## Input (parse tu $ARGUMENTS)

**Bat buoc:**
- `--feature <featureId>` — ID feature trong plan (vi du: `3.1`)

**Tuy chon:**
- `--images <path>` — Folder hoac file anh trong `docs/img_references/`
  - Folder: `docs/img_references/3.1/`
  - File: `docs/img_references/3.1_list.png`
  - Neu khong chi dinh, user paste anh truc tiep vao chat

Neu thieu `--feature` -> DUNG, yeu cau cung cap:
> "Can feature ID. Vi du: /scan-specs --feature 3.1"

## Yeu cau
- KHONG can Figma Desktop
- KHONG can MCP Server
- User cung cap anh + mo ta kem theo (ten function, loai view)

## Steps

### 1. Parse input & validate
- Extract `featureId` tu `--feature`
- Kiem tra file `figma-to-code-plan.yaml` CO TON TAI hay khong:
  - **Co** -> doc file, kiem tra feature nay da scan chua
    - Neu da scan -> hoi: "Feature nay da scan (source: X). Scan lai (ghi de)?"
  - **Chua co** -> danh dau la lan dau scan, se tao file moi o buoc 5

### 2. Thu thap input tu user

**Truong hop A: User paste anh truc tiep vao chat**
- User gui anh kem mo ta cho tung anh, vi du:
  > [anh 1] - Man danh sach ho so (list view)
  > [anh 2] - Man chi tiet ho so (detail view)
  > [anh 3] - Man tao moi ho so (form view)
- Voi moi anh, user can mo ta:
  - Ten function / man hinh
  - Loai view: list / detail / form / dialog / tab
  - Ghi chu them (neu co)

**Truong hop B: Anh trong folder docs/img_references/**
- Doc tat ca anh trong folder/path duoc chi dinh
- Hoi user mo ta cho tung anh:
  > "Tim thay 3 anh trong docs/img_references/3.1/:
  >   1. 3.1_list.png
  >   2. 3.1_detail.png
  >   3. 3.1_form.png
  > Hay mo ta tung anh (ten function, loai view):"

**Truong hop C: Chi co text mo ta (khong co anh)**
- User mo ta bang text cac man hinh can gen, vi du:
  > Feature 3.1 - Dashboard tong quan
  > - Man 1: Dashboard overview - hien thi chart + thong ke
  > - Man 2: Dashboard detail - chi tiet tung muc
- AI tao functions tu text mo ta

### 3. Hien thi proposed mapping va hoi confirm

> Hien thi proposed mapping:
```
Feature: 3.1 - Dashboard tong quan

Proposed mapping:
  Function "1": Dashboard overview (list view)
    spec_images: docs/img_references/3.1/3.1_list.png
  Function "2": Dashboard detail (detail view)
    spec_images: docs/img_references/3.1/3.1_detail.png
  Function "3": Tao moi ho so (form view)
    spec_images: docs/img_references/3.1/3.1_form.png

Confirm? (y/n/edit)
```

### 4. Luu anh vao docs/img_references/ (neu paste truc tiep)

- Neu user paste anh truc tiep vao chat -> luu vao `docs/img_references/{featureId}/`
- Naming convention: `{featureId}_{functionName}_{view}.png`
  - Vi du: `3.1_dashboard_overview_list.png`
- Neu anh da co trong folder -> khong can luu lai

### 5. Ghi vao figma-to-code-plan.yaml

#### TRUONG HOP 1: File CHUA ton tai (lan dau scan)

Tao file moi `figma-to-code-plan.yaml`:

```yaml
project:
  name: <Ten project>
  platform: react-native

phase_0:
  status: pending
  components_generated: []

scanned:
  - feature: '3.1'
    name: Dashboard tong quan
    source: specs
    scanned_at: '2026-04-14'
    spec_images:
      - 'docs/img_references/3.1/3.1_dashboard_overview_list.png'
      - 'docs/img_references/3.1/3.1_dashboard_detail.png'
    spec_description: 'Mo ta text tu user...'
    status: scanned
    functions:
      - id: '1'
        name: Dashboard overview
        status: pending
        spec_images:
          - 'docs/img_references/3.1/3.1_dashboard_overview_list.png'
        spec_description: 'Man list view hien thi chart + thong ke'
```

#### TRUONG HOP 2: File DA ton tai (scan lan sau)

- Doc file hien co
- **Neu feature da co trong `scanned`** -> update entry do
- **Neu feature chua co** -> append entry moi vao cuoi mang `scanned`
- KHONG thay doi cac entry khac trong file
- KHONG thay doi `project` va `phase_0` sections

**Quy tac ghi:**
- `source: specs` — scan tu anh/text mo ta (KHONG phai Figma)
- `status: scanned` — da quet specs, chua gen code (feature level)
- `status: pending` — chua gen code (function level)
- `status: done` — KHONG bao gio tu dat, chi `/gen-feature` moi set
- `spec_images` — mang duong dan anh (relative tu root project)
- `spec_description` — text mo ta tu user
- Function name: lay tu mo ta cua user
- Function id: auto-generate (so thu tu 1, 2, 3...)

### 6. Bao cao

```
=== SCAN COMPLETE ===
Feature: 3.1 - Dashboard tong quan
Source: specs (anh + text mo ta)

Functions found: 3
  #1: Dashboard overview (list view)
      spec_images: docs/img_references/3.1/3.1_dashboard_overview_list.png
  #2: Dashboard detail (detail view)
      spec_images: docs/img_references/3.1/3.1_dashboard_detail.png
  #3: Tao moi ho so (form view)
      spec_images: docs/img_references/3.1/3.1_form.png

Images saved: docs/img_references/3.1/ (3 files)
Plan YAML: figma-to-code-plan.yaml (updated / created)
-> Next: /gen-feature 3.1
```

## Luu y quan trong
- Command nay CHI scan va ghi metadata — KHONG gen code
- Gen code -> dung `/gen-feature` sau khi scan
- Moi feature chi co 1 source duy nhat: `figma` HOAC `specs` (khong hybrid)
- Neu feature da scan bang figma, muon doi sang specs -> can confirm ghi de
- Anh paste truc tiep se duoc luu vao `docs/img_references/{featureId}/`
- Chat luong gen code tu specs se phu thuoc vao chat luong anh + mo ta cua user
