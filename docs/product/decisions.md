# Product Decision Log
## D-001 — Platform Foundation is V1
**Approved.** Platform Admin authentication, clinic provisioning, initial protected Clinic Super User/Admin, clinic metadata/lifecycle and suspension/reactivation are official V1. Supersedes legacy text listing Platform Administration as deferred.

## D-002 — Appointments/commercial billing deferred
Follow-up is a recommendation workflow, not scheduling. Subscriptions/plans/billing/renewals are outside V1.

## D-003 — Current tested backend wins for implemented foundation details
For routes, permission keys, account/session behavior, persistence constraints and foundation request/response contracts already implemented and tested in `Auran-Tech/auran-clinic-backend`, current code/generated Swagger/tests supersede older prototype/legacy examples. Product scope remains governed here.

## D-004 — No autonomous medical decision logic in V1
AURAN Clinic records clinician-entered clinical information. Autocomplete may improve data entry but must not diagnose, recommend medication/dosage/treatment or replace clinician judgment.

## D-005 — Missing permission gaps are explicit engineering work
Unfinished modules must use stable atomic permission keys or an explicitly recorded mapping to an existing permission. Role-name checks are forbidden.
