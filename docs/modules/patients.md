# Patients — Implementation Contract

## Purpose
Universal clinic-scoped patient identity and demographics. Specialty/clinical fields do not belong on Patient.

## Actor & permissions
Clinic actor only. `Patient_View` for read/search, `Patient_Create` for registration, `Patient_Edit_Basic` for basic updates. Super User bypasses clinic permission checks but not ClinicId isolation.

## Data
`Patient`: Id Guid; ClinicId Guid; PatientNumber string max 64; FullName string max 256; Phone string max 64; Gender nullable string; DateOfBirth nullable date; Notes nullable text; audit timestamps/users. DB unique `(ClinicId,PatientNumber)` and `(ClinicId,Phone)`.

PatientNumber format is `{PatientNumberPrefix}-{clinic-local year}-{sequence}` (example `AU-2026-1`). Generation uses a concurrency-safe counter; no `MAX()+1`. Year is interpreted in clinic timezone and sequence resets per configured scope/year.

## Queries
- List: paginated; filters/search by patient number, name and phone; tenant scoped.
- Search: fast type-ahead by normalized name/phone/patient number.
- Duplicate assistance: exact phone plus fuzzy/name candidates. Exact same normalized phone inside clinic blocks create; same phone in another clinic is irrelevant.
- Get by id: 404 when not found in current clinic; never reveal cross-tenant existence.
- Timeline/profile links aggregate only permitted clinic records.

## Register command
Validate request → normalize phone/name → check exact duplicate → reserve next patient sequence → create Patient → audit → commit. Race on duplicate/counter must resolve as deterministic conflict/retry, never duplicate patient number.

### Registration fields
Required: FullName, Phone. Gender is supported and should be selected from product-supported values; DateOfBirth optional and cannot be in future; Notes optional. PatientNumber and ClinicId are server-generated/context-derived.

## Update
Editable basic fields: FullName, Phone, Gender, DateOfBirth, Notes. PatientNumber/ClinicId immutable. Changing phone re-runs duplicate rule.

## API target
`GET /api/patients`, `GET /api/patients/search`, `GET /api/patients/duplicates`, `POST /api/patients`, `GET /api/patients/{id}`, `PUT /api/patients/{id}`, `GET /api/patients/{id}/timeline`. Use BaseResponse conventions and pagination. 400 validation, 401/403 auth, 404 tenant-safe not found, 409 `PATIENT_PHONE_ALREADY_EXISTS`/number-generation conflict.

## UI
Patients screen: search input, Register Patient action, paginated table/cards with Patient Number/Name/Phone/Gender/Age and open action. Registration must encourage search first and show duplicate candidates before final creation. Patient details header shows core demographics and tabs/sections permitted by role.

States: loading skeleton; no results; first-patient empty state; duplicate warning; validation; forbidden; server error.

## Audit
Create and basic update. Store identifiers/changed field names; avoid dumping medical/free-text Notes into audit metadata.

## Tests
Unit: normalization, future DOB rejection, patient number scope/year, duplicate rule. Integration: tenant isolation, exact duplicate 409, concurrent number generation, permission denial, update-to-duplicate, cross-clinic same phone allowed. UI/E2E: search→register, duplicate prevention, permission-hidden create/edit.
