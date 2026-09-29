# Database Architecture
SQL Server + EF Core migrations. Shared database, tenant discriminator `ClinicId` on clinic-owned aggregates unless ownership is unambiguously enforced through a required parent.

Core areas: Platform/Clinic lifecycle; Identity/users/sessions; RBAC; Patients/medical profile/dynamic profile; measurements; workflow/queue/history; visits/sessions; clinical orders/files; follow-ups; audit/configuration.

Required constraints include unique Clinic.Code, `(ClinicId, PatientNumber)`, `(ClinicId, Phone)`, UserRole pair, RolePermission pair, `(ClinicId, WorkflowStatus.Code)`, and workflow From/To pair. Use FK constraints and indexes on tenant/search keys. Use `rowversion`/optimistic concurrency for operational records such as QueueEntry/Visit where implementation needs lost-update protection.

Persist UTC. Never rely only on EF query filters for security: services/queries must be designed tenant-aware and tests must prove isolation.
