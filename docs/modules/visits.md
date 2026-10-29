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
Visits list filters by date/doctor/status/documentation; visit workspace displays patient context, session history, documentation form, measurements/orders/follow-up links.

The clinic Visits index uses `GET /api/visits` with page, pageSize, patient name/number or full visit-ID search, doctorId, status, documentationStatus, optional clinic-local `fromDate`/`toDate`, and an allow-listed sort field (`entryAtUtc`, `patientName`, `doctorName`, or `status`) plus descending. The backend converts inclusive local dates to a half-open UTC range using the clinic timezone, independent of the browser timezone. The response contains tenant-scoped visit rows and clinic summary counts for active visits, completed visits, and outstanding Draft/Pending documentation. `GET /api/visits/list-doctors` supplies doctor options drawn from visits in the same clinic. The table sorts from its column headers and pages on the server. A Filters dialog holds search, doctor, status, documentation, and date fields, with a nearby Clear action. Reversed dates cannot be applied.

The Pending Documentation page shows the clinic's outstanding Draft and Pending notes with patient number, doctor, visit status, start time, and elapsed time since the visit started. Its summary counts all outstanding notes, Draft notes, Pending notes, and visits that exited while documentation remains outstanding. The table can be sorted by its column headers and paginated after filtering. Search, doctor (for authorized super users), and documentation status are grouped in a Filters dialog with a nearby Clear action. A clinician with `Visit_Edit` can finish a note in an editor dialog; server-required fields are shown on validation failure, and successful completion removes the visit from the outstanding list. The page follows the established Visits prototype layout because the reference prototype does not contain a separate Pending Documentation screen. Its header contains page identity and context; navigation remains in the clinic sidebar. Its KPI cards, panel color, table headers, and pagination follow the shared workspace design in both themes.

`OPEN_DECISION`: Define the reminder threshold and delivery behavior before displaying overdue reminders or sending notifications. Elapsed time alone does not classify a note as overdue.

## Audit/tests
Audit session start/end, material documentation updates and completion without copying full sensitive notes to audit metadata. Test active-session invariant under concurrency, wrong-tenant doctor/patient, delayed documentation, exit-with-pending-docs, permissions and all conflict codes.
