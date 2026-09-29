# Visits & Doctor Sessions — Implementation Contract

## Model
Visit is the complete encounter: Id, ClinicId, PatientId, DoctorId, Status (max 32), DocumentationStatus (max 32), EntryAtUtc, CompletedAtUtc?, ExitAtUtc?, ChiefComplaint?, Examination?, Diagnosis?, Notes?, TreatmentPlan?, FollowUpText?, audit fields. Persisted relationships must enforce same-tenant Patient/Doctor references.

`DocumentationStatus`: `NotStarted`, `Draft`, `Pending`, `Completed`. Operational VisitStatus is independent. A patient can leave while documentation is Pending.

`VisitSession`: belongs to Visit and Doctor, StartAtUtc, EndAtUtc?, audit fields. Only one active (`EndAtUtc IS NULL`) session per Visit; enforce at persistence/service level. Doctor/session tenant must match Visit.

## Permissions
`Visit_View`; `Visit_Start`; `Visit_Edit`. Medical profile/order/follow-up/file actions also require their module permissions. A role name itself never authorizes.

## Session commands
Start: load visit → active/tenant/state checks → reject if active session exists (`VISIT_SESSION_ALREADY_ACTIVE`) → create session → update operational state if defined → audit → commit.
End: require active session; set EndAtUtc; reject none (`VISIT_SESSION_NOT_ACTIVE`); audit.

## Documentation
Edit complaint/examination/diagnosis/notes/treatment plan/follow-up text as clinician-entered text. The system does not diagnose, prescribe, or generate clinical recommendations autonomously. Saving incomplete work sets/keeps Draft/Pending according to explicit UI command. Complete Documentation is a deliberate action; it sets Completed and CompletedAtUtc after required server validation. Reopening completed docs is not a V1 assumption; if requested later it needs an audited product rule.

## API target
`GET /api/visits`, `GET /api/visits/{id}`, `PUT /api/visits/{id}/documentation`, `POST /api/visits/{id}/sessions/start`, `POST /api/visits/{id}/sessions/end`, `POST /api/visits/{id}/complete-documentation`.

## UI
Visits list filters by date/doctor/status/documentation; visit workspace displays patient context, session history, documentation form, measurements/orders/follow-up links. Pending Docs page filters `DocumentationStatus != Completed` and surfaces age since encounter/reminder threshold.

## Audit/tests
Audit session start/end, material documentation updates and completion without copying full sensitive notes to audit metadata. Test active-session invariant under concurrency, wrong-tenant doctor/patient, delayed documentation, exit-with-pending-docs, permissions and all conflict codes.
