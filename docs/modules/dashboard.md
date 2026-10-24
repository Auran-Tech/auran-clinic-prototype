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

The dashboard follows the prototype's four circular cards, seven-day visits chart, live activity, queue distribution, doctor workload, attention list, and quick actions. The chart uses clinic-local dates and real visit counts. Live activity uses current queue entries and must not present them as completed historical events. Queue duration is the measured time since check-in; a Queue SLA percentage requires an approved target and must not be fabricated from prototype sample values. Historical prototype names, percentages, and trend indicators are visual examples only. Widget links follow the destination module's read permission.

Visit completion uses visits that started on the clinic-local current day as its denominator, and only completed visits from that same group as its numerator. Visits completed today from earlier days remain available as a separate reporting count and do not enter this percentage.

The application keeps the prototype's inset dashboard frame, compact header, four metric cards, and taller trend/activity row. The trend header may show the real seven-day visit total in place of the prototype's illustrative percentage. Known workflow status names are localized in the dashboard; custom names remain as configured by the clinic.

## Tests
Clinic-local day boundary, tenant isolation, permission-based omission, empty clinic, aggregate correctness and query efficiency.
