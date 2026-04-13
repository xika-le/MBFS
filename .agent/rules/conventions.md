# Conventions — Quy tắc chung

## File naming
- Screens: `TenScreenScreen.tsx` (ví dụ: `LoginScreen.tsx`, `DashboardScreen.tsx`)
- Components: `TenComponent.tsx` (ví dụ: `InvestorCard.tsx`, `SearchBar.tsx`)
- Theme files: lowercase (ví dụ: `colors.ts`, `typography.ts`)

## Folder structure
```
src/
├── theme/                    # Design tokens (Phase 0)
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   ├── borderRadius.ts
│   └── index.ts
├── components/
│   ├── shared/               # Shared components (Phase 0)
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   └── ...
│   └── [ModuleName]/         # Module-specific components
├── screens/
│   └── [ModuleName]/         # Screens per module
│       ├── LoginScreen.tsx
│       └── DashboardScreen.tsx
└── navigation/               # Navigation config
```

## Code style
- TypeScript bắt buộc
- Interface/type cho tất cả props
- Sử dụng theme tokens, KHÔNG hardcode values
- Import path alias: `@/theme`, `@/components/shared`

## Feature ID format
- Cấp 1: `1.`, `2.`, `3.`
- Cấp 2: `1.1`, `1.2`, `2.1`
- Cấp 3: `1.1.1`, `1.1.2`
- Cấp N: tiếp tục nối `.số`

## Comment convention
```typescript
// Feature: 4.2.1 - Đăng nhập ứng dụng mobile
// Generated at: 2026-04-01
// Updated at: 2026-04-10 (thay đổi: màu button, font size title)
```
