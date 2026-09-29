# Dashboard — Implementation Contract

## Goal
Permission-safe operational overview, not a shortcut around module authorization.

## Widgets
V1 may show today's patient/check-in count, active queue count/by status, visits today, completed vs pending documentation, follow-ups due/recommended and doctor workload. Each metric is clinic-scoped and computed using clinic-local business day converted to UTC.

## Permission behavior
Dashboard route requires an approved dashboard/read permission if catalog adds one; otherwise only show widgets whose underlying data permission the user has. Never expose patient/clinical counts/details to a user lacking the corresponding read permission. Super User sees all clinic widgets.

## API target
`GET /api/dashboard` returns a purpose-built DTO, not raw entities. Avoid N+1; aggregate in SQL. No mutation/quick action should bypass the destination module's permission.

## UI
Cards + small charts, clear loading/empty/error state, links only when target permission exists. Clinic branding applies but semantic chart labels remain accessible.

## Tests
Clinic-local day boundary, tenant isolation, permission-based omission, empty clinic, aggregate correctness and query efficiency.
