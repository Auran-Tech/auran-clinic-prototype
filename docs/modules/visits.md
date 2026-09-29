# Visits & Sessions
Visit is the whole encounter. A Visit may contain multiple doctor sessions, but only one active session at a time. Starting while active or ending without active session is a conflict. Operational Visit status is separate from DocumentationStatus (`NotStarted`, `Draft`, `Pending`, `Completed`). Documentation may finish later.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
