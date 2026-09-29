# User Flows
## Platform onboarding
Platform login → Provision clinic → create initial protected Super User/admin → clinic becomes usable → clinic user authenticates separately.
## Patient registration
Search name/phone → open correct existing match OR continue registration → exact phone duplicate check → generate patient number → create.
## Check-in
Find patient → check in → transaction creates Visit + QueueEntry + initial history → patient appears in Live Queue.
## Queue/visit
Move only through configured transition → record history → start/end doctor sessions as workflow requires → operationally exit/complete → documentation may remain pending.
## Documentation
Doctor opens incomplete Visit → edits clinical notes/orders → completes documentation when ready.
## Follow-up
Doctor records recommendation/date → appears in Follow-ups → staff reviews/updates status. No booking.
## Reporting
Select report → filters → preview → export PDF/Excel.
## Suspension
Platform Admin suspends clinic → active clinic sessions invalid → clinic access blocked → reactivate → users must establish fresh sessions.
