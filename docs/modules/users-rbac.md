# Clinic Users, Roles & RBAC — Implementation Contract

## Current permissions
`Users_View`, `Users_Manage`, `Users_Manage_Status`, `RBAC_View`, `RBAC_Manage`. Backend permission keys are canonical; legacy dotted prototype names are aliases/UX history only.

## Roles
Protected static codes: `ADMIN`, `RECEPTIONIST`, `DOCTOR`, `NURSE`. User may hold multiple roles; effective permissions are union. ADMIN receives all current SystemPermissionCatalog permissions. Built-in role definitions are system-owned and not renamed/deleted. V1 UI can view role matrix; changing built-in grants requires code/catalog + tests, not ad-hoc DB editing.

## Super User
`IsSuperUser` is a protected clinic user capability, not a role. Has all clinic permissions, remains tenant-scoped. Only a Super User may create another Super User. Normal managers cannot modify protected Super Users. Last active Super User cannot be deactivated/self-disabled. Super User does not become Platform Admin.

## Current API
`GET /api/users` requires `Users_View`.
`POST /api/users` requires BOTH `Users_Manage` and `RBAC_Manage`; request FullName, Email, Password, Phone?, IsSuperUser, Roles[]. Normal user requires >=1 valid system role. Creates Identity + domain user + role assignments atomically; 201.
`PUT /api/users` requires Users_Manage; updates business profile + Identity email/username; body includes UserId.
`PUT /api/users/roles` requires RBAC_Manage; replaces assignments and revokes all active sessions.
`PUT /api/users/status` requires Users_Manage_Status; activates/deactivates, deactivation revokes sessions; last Super User 409 `last_superuser_required`.
`POST /api/users/disable-self` allows authenticated user to disable self without ManageStatus, except last active Super User.
`GET /api/permissions/list` returns stable key/group/localized descriptions.

## Account state
Use business active state from current backend foundation plus Identity state. Do not resurrect sessions after reactivation. Email uniqueness/Identity conflicts return 409 where applicable.

## UI
Employees list: name/email/phone/roles/Super User/status/actions. Create/edit forms; roles multi-select; explicit Super User warning; status confirmation. Roles & Permissions: role tabs + localized permission matrix, read-only grants in V1 unless a later decision explicitly enables editing.

## Tests
Multi-role union, Admin all catalog, role replacement revocation, protected Super User, last Super User, self-disable, inactive login, cross-tenant IDs, dual-permission create, Identity transaction rollback, localized catalog.
