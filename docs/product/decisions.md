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

## D-006 — Reconcile canonical implementation stack with shipping repositories
**Implementation alignment (October 14, 2026).** The actively developed frontend repository uses React 19/TypeScript/Vite, not Angular; the backend repository uses .NET 10 LTS, not .NET 8. Update agent and architecture guidance accordingly. This reconciles documentation with shipping code without changing V1 clinical scope or authorization contracts. Any future framework migration requires a separate explicit approved product/engineering decision.

## D-007 — Connection interruption state for V1 web
**Approved by product request (October 21, 2026).** The clinic and Platform web interfaces check unauthenticated `GET /health/ready` to decide whether their backend and database are reachable. A failed check shows a connection interruption screen with a short visible retry countdown; after limited retries it shows a disconnected state with manual retry while continuing periodic checks. Browser online/offline events trigger early checks but are not the source of truth. Restore the current page and refresh reads after a successful check. Do not queue, auto-replay, or claim durable storage of clinical writes while disconnected; advanced offline synchronization remains deferred.
