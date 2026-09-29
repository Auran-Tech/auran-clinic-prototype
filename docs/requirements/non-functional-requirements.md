# Non-Functional Requirements — V1

## Security
HTTPS outside local; Identity hashing/lockout; JWT signature/issuer/audience/expiry validation; rotating hashed refresh sessions with replay rejection; login rate limit; CORS allow-list; secrets outside source; Platform↔Clinic actor isolation; tenant isolation; parent-aware file authorization; no credentials/tokens/full sensitive notes in logs/audit. Input binding rejects malformed/empty identifiers rather than silently using Guid.Empty.

## Reliability & integrity
All multi-record use cases transactional. Database composite tenant FKs reinforce application isolation. Unique constraints back duplicate/codes/roles/transitions. Concurrency-safe code counters; operational records use optimistic/persistence invariants where appropriate. State-invalidating actions take effect immediately.

## Performance targets
Normal interactive list/search endpoints should be designed for sub-second server processing at V1 clinic scale under healthy local-region infrastructure; exact SLO requires production measurement. Paginate unbounded lists, cap audit at 200, cap report preview, index ClinicId + common filters, avoid N+1 and client-side full-dataset filtering.

## Observability
Serilog structured logs; `X-Correlation-ID`; `/health/live` process health and `/health/ready` dependency/database readiness; exception middleware returns safe envelope; audit for privileged/domain actions. No stack traces in production responses.

## Localization/time
API messages/catalog support English/Arabic resources. Store UTC; use clinic TimeZoneId for business day and display. Locale/date/time formats are presentation settings. Angular architecture must support RTL without feature rewrites.

## Accessibility
Keyboard usable, visible focus, semantic labels, contrast, status not by color alone, validation announced/readable. Target WCAG 2.1 AA for production UI.

## Browser/responsive
Current evergreen Chrome/Edge/Firefox/Safari; desktop-first clinic operations with usable tablet widths. Critical workflows must not depend on hover.

## Maintainability
.NET 8 modular monolith, Angular feature architecture, no customer forks, migrations/tests/docs with behavior, stable permission/error codes, generated Swagger usable as integration contract.
