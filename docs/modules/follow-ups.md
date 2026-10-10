# Follow-ups — Implementation Contract

## Data
FollowUp: Id, ClinicId, PatientId, VisitId, DoctorId, Recommendation, RecommendedDate?, Status, audit fields. Same-tenant patient/visit/doctor; Visit belongs to Patient.

## Status
Use backend `FollowUpStatus` enum as canonical. Status transitions should be simple operational tracking; do not create appointment/calendar semantics. Recommendation is clinician-entered text.

## Permissions
`FollowUp_View` reads; `FollowUp_Manage` creates/updates status/recommendation. Never authorize by Doctor role name.

## API target
`GET /api/follow-ups` with date/status/doctor/patient filters; `POST /api/visits/{id}/follow-up`; `PUT /api/follow-ups/{id}`. Paginate growing lists.

## UI
Follow-ups page columns: patient, doctor, visit/date, recommendation summary, recommended date, status, action. Filters by date/status/doctor and search patient. Patient/visit pages link related follow-up. Clearly label as recommendation, not booked appointment.

## Audit/tests
Audit create/material update/status. Test tenant integrity, permission, visit-patient mismatch, filters, status validation and that no appointment entity/slot is created.
