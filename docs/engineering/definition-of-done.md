# Definition of Done
A feature is done only when applicable items are satisfied:
- Acceptance criteria pass and no unresolved scope assumption is hidden.
- Domain/application behavior implemented; controllers/components remain thin.
- Platform/Clinic actor boundary and clinic isolation applied.
- Permission and frontend visibility applied.
- Validation and stable error behavior implemented.
- Transactions/concurrency considered.
- Migration/index/constraint included when persistence changes.
- Swagger/OpenAPI verified.
- Audit/logging added where required; no sensitive data logged.
- Unit/integration/E2E tests added for critical paths and regressions.
- Backend and frontend build cleanly; relevant tests pass.
- No customer-specific code, duplicate response/pagination models or debug code.
- Accessibility/loading/empty/error states handled for UI work.
- Canonical docs/contracts updated if behavior changed.
