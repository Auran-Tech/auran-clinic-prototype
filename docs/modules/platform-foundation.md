# Platform Foundation — Implementation Contract

## Scope
Official V1 capability. Platform Admin operates tenant lifecycle without access to clinic patient/clinical APIs.

## Current API
`POST /api/platform/auth/login|refresh|logout`.
`POST /api/platform/clinics` provisions.
`GET /api/platform/clinics` lists.
`GET /api/platform/clinics/details?clinicId={guid}` gets operational metadata.
`PUT /api/platform/clinics` updates metadata; body includes ClinicId.
`PUT /api/platform/clinics/status` activates/suspends; body `{clinicId,isActive}`.
Platform lookup endpoints expose supported locales/timezones as implemented. All clinic-management routes require Platform actor policy.

## Provision request
CreateClinicRequest: required `Name`, required `CodePrefix`, optional `TimeZoneId`, `PatientNumberPrefix`, Phone, Email, Address, Website, Locale, required `Admin`. InitialClinicAdmin contains the initial credential/profile fields defined by backend. Server generates immutable clinic Code. Provision atomically creates Clinic + default ClinicSettings + initial active Clinic Super User + protected ADMIN assignment/Identity credential. Duplicate initial admin Identity or code conflict returns 409 (`clinic_provisioning_conflict`). Any failure rolls back.

## Update
UpdateClinicRequest: ClinicId, Name, TimeZoneId?, PatientNumberPrefix?, Phone?, Email?, Address?, Website?, Locale?. Generated Code immutable. Validate supported timezone/locale when lookup validation is enabled.

## Status
Suspension immediately causes clinic access-token state validation to fail and revokes/invalidates clinic sessions. Reactivation restores ability to authenticate but old sessions remain invalid. Platform actor remains usable.

## Platform UI
Login; Clinics table (name/code/status/timezone/admin reference); Provision wizard; Clinic details/edit; Suspend/Reactivate confirmation. Never show clinic patient/clinical data. Provision form validates admin email/password requirements before submit and explains generated code.

## Errors
400 validation/provisioning failure, 401 missing/invalid platform auth, 403 clinic token at platform route, 404 clinic not found, 409 provisioning conflict, 429 login rate limit.

## Audit/tests
Audit provision/update/status/security actions with Platform actor. Preserve current E2E sequence: platform login/refresh/replay → actor boundary → provision → get/list/update → duplicate admin → clinic login → reverse actor boundary → suspend invalidates session → reactivate fresh login → logout.
