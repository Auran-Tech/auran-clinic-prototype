# Non-Functional Requirements
## Security
HTTPS; strong password hashing via Identity; JWT validation; refresh rotation/replay protection; login rate limiting; CORS allow-list; secrets outside source control; actor and tenant isolation; file authorization; no sensitive token/password/medical-note logging.

## Reliability
Multi-record business operations are transactional. Concurrency-sensitive operational records should use optimistic concurrency where appropriate. Session-invalidating actions must take effect immediately according to current foundation behavior.

## Performance
All list endpoints are paginated where data can grow. Queries are tenant-filtered and indexed on common tenant/search keys. Reports must filter before generating large result sets. Avoid N+1 queries.

## Observability
Structured Serilog logging, correlation ID on responses, `/health/live` and `/health/ready`, auditable security/administrative actions.

## Maintainability
Modular monolith; thin controllers; no customer branches; one shared response/pagination convention; migrations tracked in source; automated tests around business/security boundaries.

## Localization
Persist UTC. Use clinic timezone/locale/date/time settings at presentation/business-date boundaries. V1 UI should be architected so Arabic/RTL can be added without rewriting features; exact localization content can evolve separately.

## Data integrity
Database uniqueness/FK constraints reinforce application rules. Audit records are immutable through normal application APIs.
