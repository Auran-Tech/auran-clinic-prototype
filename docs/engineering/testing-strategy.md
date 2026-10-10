# Testing Strategy
## Unit tests
Domain/application rules: permission union, Super User protection, patient number generation, duplicate phone, workflow transition validation, VisitSession invariant, dynamic field validation, report/filter logic where pure.

## Integration tests
Real API + test database for authentication/current context, Platform↔Clinic boundary, provisioning, tenant isolation, patient registration/conflict, check-in transaction, queue transition/history, sessions, documentation, file metadata, reports, permissions, suspension/reactivation and audit.

## E2E/Postman foundation
Preserve the existing sequential foundation suite covering health, login/refresh rotation, replay rejection, actor boundary, provisioning, duplicate initial admin, user/RBAC changes, session revocation, last Super User, audit, clinic suspension/reactivation and logout. Do not parallelize stateful token-rotation scenarios.

## Frontend
Unit/component tests for permission-driven UI and validation; integration/E2E for critical workflows. Test loading/empty/error/forbidden states.

A bug fix requires a regression test when reasonably automatable.
