# Integrations
## V1 internal/external dependencies
SQL Server; ASP.NET Core Identity; file storage provider through `IFileStorage`; PDF/Excel report generation; structured logging/health infrastructure.

## Explicitly not integrated in V1
External laboratories, external radiology systems, pharmacy systems, insurers, accounting providers, patient mobile applications, payment/billing providers and message brokers.

Any new integration requires an approved contract covering ownership, authentication, retries/timeouts, idempotency, failure behavior, audit/logging, PHI/PII handling and test strategy before implementation.
