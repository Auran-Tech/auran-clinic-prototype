# Workflow & Live Queue
One configurable clinic-wide workflow in V1. Status has clinic, code, name, HEX color and sort order. Transition From and To differ and duplicates are forbidden. Check-in creates Visit + QueueEntry + initial history transactionally. Every movement must match a configured transition and create history. Exit records operational exit without implying documentation completion.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
