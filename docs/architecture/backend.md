# Backend Architecture
## API
Controllers, auth policies, middleware, Swagger/OpenAPI, DI, HTTP configuration. No EF queries/business rules in controllers.
## Application
Use cases/services, DTOs, validators, filters, interfaces, response/pagination models and transaction orchestration.
## Domain
Entities, value concepts, fixed enums, invariants/domain policies. No ASP.NET/EF dependency.
## Infrastructure
DbContext/configurations/migrations, Identity/session persistence, repositories/query implementations, file storage, logging integrations.

Use async I/O and cancellation tokens. Prefer explicit transactions for multi-record use cases. Apply global exception handling. Preserve correlation IDs. Use one pagination model and consistent service/API response conventions already implemented in the codebase.
