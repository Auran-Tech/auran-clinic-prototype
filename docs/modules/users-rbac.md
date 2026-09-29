# Users, Roles & RBAC
Clinic roles: Admin, Receptionist, Doctor, Nurse. Users can have multiple roles. Permissions are unioned. Super User is a protected clinic flag, not a role, and has all clinic permissions. Static role definitions are read-only in V1. User role replacement/deactivation must invalidate affected sessions. Protect the last active Super User.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
