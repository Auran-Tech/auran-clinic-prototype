# Authorization & Permission Catalog

## Canonical backend keys
`Audit_View`; `Patient_View`, `Patient_Create`, `Patient_Edit_Basic`; `Users_View`, `Users_Manage`, `Users_Manage_Status`; `RBAC_View`, `RBAC_Manage`; `Queue_View`, `Queue_Move`; `Visit_View`, `Visit_Start`, `Visit_Edit`; `MedicalProfile_View`, `MedicalProfile_Edit`; `FollowUp_View`, `FollowUp_Manage`; `Reports_View`, `Reports_Export`; `Settings_View`, `Settings_Manage`; `Files_View`, `Files_Upload`; existing `Attendance_Create_Shift` is a backend foundation permission but Attendance is not a Clinic V1 product module unless separately scoped.

Permission catalog stores stable key, group and localized descriptions (English/Arabic). Legacy prototype dotted codes are not used for new backend authorization.

## Role grants (current backend)
**ADMIN:** every permission in `SystemPermissionCatalog.All`.
**RECEPTIONIST:** Patient_View/Create/Edit_Basic; Queue_View/Move; Visit_View/Start; FollowUp_View/Manage; Files_View/Upload.
**DOCTOR:** Patient_View; Visit_View/Start/Edit; MedicalProfile_View/Edit; FollowUp_View/Manage; Reports_View; Files_View/Upload.
**NURSE:** Patient_View; Queue_View/Move; Visit_View; MedicalProfile_View/Edit; Files_View/Upload.

## Super User
Protected flag, not role. Gets all clinic permissions; tenant boundary still applies. Only Super User can create another Super User; last active Super User protected.

## Missing atomic permissions required before unfinished V1 APIs ship
The current backend foundation does not yet expose dedicated keys for: Configuration management, clinical measurement creation, clinical-order/prescription management, dashboard (if needed separately), documentation completion (if Visit_Edit is considered too broad), and Queue CheckIn/Exit if finer separation is desired. Implementation MUST either (a) add stable atomic permission(s) to `Permissions` + `SystemPermissionCatalog` + role grants + localized descriptions + tests, or (b) record an explicit product decision mapping the action to an existing key. It MUST NOT authorize by role name.

## Actor policies
Platform routes require Platform actor and do not use clinic roles. Clinic routes require Clinic actor then permission. Wrong actor = 403.

## Frontend
Navigation/action visibility uses effective keys returned by login/current context. Hiding is UX only; backend remains authoritative.
