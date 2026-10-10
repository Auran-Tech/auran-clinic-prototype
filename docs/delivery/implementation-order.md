# V1 Implementation Order
1. Foundation: solution conventions, DB, error handling, logging, health, correlation ID.
2. Platform authentication/bootstrap and session security.
3. Clinic provisioning/lifecycle and actor-boundary enforcement.
4. Clinic authentication/context, RBAC, Super User and user management.
5. Clinic settings/branding/configuration foundation.
6. Patients + duplicate detection + patient numbering.
7. Medical/dynamic profile.
8. Workflow + Live Queue + check-in/history.
9. Visits + multi-session + pending documentation.
10. Measurements.
11. Clinical orders/prescriptions + files.
12. Follow-ups.
13. Reports/export.
14. Dashboard + audit completeness.
15. Frontend hardening, accessibility, security, performance and full regression.

Ship vertical slices as soon as dependencies permit; do not wait to build every backend module before integrating the frontend.
