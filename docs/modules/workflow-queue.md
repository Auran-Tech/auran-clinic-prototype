# Workflow & Live Queue — Implementation Contract

## Purpose
Configurable clinic operational flow for same-day patient movement. Queue state never determines clinical documentation completeness.

## Data
`WorkflowStatus`: Id, ClinicId, Code, Name, Color, SortOrder, IsEnabled. Unique `(ClinicId,Code)`. `WorkflowTransition`: Id, ClinicId, FromStatusId, ToStatusId; From != To; unique clinic/from/to; both statuses must belong to same clinic. `QueueEntry`: clinic, patient, visit, doctor/current assignee where configured, current status, EntryAtUtc, ExitAtUtc, concurrency token. `QueueStatusHistory`: queue/status/from/to timestamps, actor, optional note.

## Permissions
`Queue_View` reads board/history. `Queue_Move` performs check-in/movement/exit in the current backend catalog; if the implementation later splits CheckIn/Exit permissions, update catalog/docs together.

## Configuration
Admin/Super User configures statuses and allowed directed transitions, ordering/color/enabled state. A disabled status cannot accept new entries; existing historical references remain valid. Do not delete statuses that are referenced; disable instead unless safe deletion is proven.

## Check-in transaction
Resolve patient + selected doctor if required → reject invalid/active duplicate check-in according to current-day workflow → create Visit (`NotStarted` documentation) → create QueueEntry in configured initial status → create initial QueueStatusHistory → audit → commit. Failure rolls back all.

## Transition
Load entry with concurrency token → verify not exited → verify requested ToStatus is enabled and exact configured transition exists → update current status → insert history → trigger VisitSession start/end only when explicit workflow/application rule maps that status action → audit → commit. Never infer clinical diagnosis/action from status name.

## Exit
Set ExitAtUtc/terminal operational state and history. Close any operationally required active session according to explicit visit rule. Does not mark DocumentationStatus Completed.

## API target
`GET /api/queue` returns active entries by default; `includeRecentExits=true` also returns exits from the last 24 hours. `POST /api/queue/check-in`, `POST /api/queue/{id}/transition`, `POST /api/queue/{id}/exit`, `GET /api/queue/{id}/history`; configuration under `/api/configuration/workflow`. 409 for invalid transition/concurrency/already-exited conflicts.

## UI
Live board ordered by configured status/sort order by default; list headers control server sorting by stage, arrival time, patient name and doctor. A Filters dialog contains search, stage and doctor controls, with a nearby Clear button that clears applied filters immediately. Summary cards show patients in flow, average time since arrival, occupied stages and doctors with active patients; show a loading placeholder until queue data arrives. Cards show patient, patient number, doctor/assignee, entry/wait duration and permitted next actions. The Exited lane displays visits exited in the last 24 hours; active summary counts exclude these visits. Dragging a card to another lane uses the same configured transition and permission checks as the Move action; a final transition requires confirmation. Never show an impossible transition button. Use status name + color, not color alone. Refresh after mutations; optimistic UI only if rollback is reliable. Periodic REST polling is not labeled as live updates.

## Tests
Configuration same-tenant FK/invariants; check-in transaction rollback; transition allowed/forbidden; concurrent move conflict; history for every move; exit independent from docs; cross-tenant IDs; permission denial; board empty/loading/error states.
