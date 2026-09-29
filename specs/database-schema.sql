-- AURAN Clinic V1 canonical logical schema inventory.
-- IMPORTANT: current EF Core migrations in auran-clinic-backend are authoritative executable DDL.
-- Agent rule: extend via EF migrations; never replace migration history with this file.

-- Platform: PlatformUsers, PlatformRefreshTokens.
-- Tenant root: Clinics, ClinicSettings, CodeCounters.
-- Identity/business auth: AspNetUsers (current Identity schema as migrated), Users, RefreshTokens.
-- Authorization: Permissions, PermissionTranslations, Roles, RolePermissions, UserRoles.
-- Patients: Patients, PatientConditions, PatientAllergies, PatientMedications, PatientAttachments.
-- Dynamic profile: PatientProfileSections, PatientProfileFields, PatientProfileFieldOptions, PatientProfileValues.
-- Measurements: ClinicalFields, ClinicalFieldOptions, ClinicalMeasurements.
-- Workflow: WorkflowStatuses, WorkflowTransitions, QueueEntries, QueueStatusHistory.
-- Visits: Visits, VisitSessions.
-- Orders: ClinicalOrderSectionDefinitions, ClinicalOrders, ClinicalOrderSections, ClinicalOrderItems, ClinicalOrderAttachments.
-- Follow-up: FollowUps.
-- Files: Files.
-- Audit: AuditLogs.

-- Core required constraints/invariants:
-- Clinics.Code UNIQUE.
-- Patients: UNIQUE(ClinicId,PatientNumber), UNIQUE(ClinicId,Phone).
-- WorkflowStatuses: UNIQUE(ClinicId,Code).
-- WorkflowTransitions: UNIQUE(ClinicId,FromStatusId,ToStatusId), From != To.
-- UserRoles and RolePermissions prevent duplicate assignments.
-- Current migrations enforce composite tenant foreign keys across auth/patient/workflow/visit/audit references.
-- Visit persistence invariant: only one active session per Visit.
-- CodeCounters provide concurrency-safe generated business codes/numbers; do not use MAX()+1.
-- Refresh token hashes are stored; raw refresh token is never persisted.
-- All domain timestamps are UTC; DateOnly used for date-only clinical/demographic values where modeled.

-- Patient core shape from InitialCreate:
-- Id uniqueidentifier PK; PatientNumber nvarchar(64); FullName nvarchar(256); Phone nvarchar(64);
-- Gender nullable; DateOfBirth date nullable; Notes nullable; ClinicId + audit fields.

-- Visit core shape from InitialCreate:
-- Id; PatientId; DoctorId; Status nvarchar(32); DocumentationStatus nvarchar(32);
-- EntryAtUtc; CompletedAtUtc?; ExitAtUtc?; ChiefComplaint?; Examination?; Diagnosis?; Notes?;
-- TreatmentPlan?; FollowUpText?; ClinicId + audit fields.

-- Typed dynamic values use TextValue, NumberValue decimal(18,2), BooleanValue, DateValue,
-- FileId (profile), JsonValue where multi-value representation is needed.

-- File core shape: OriginalName, StoredName, ContentType, Size, StorageProvider, StorageKey,
-- UploadedAtUtc, UploadedByUserId, ClinicId + audit fields. SQL stores metadata, not large binary content.

-- When implementing an unfinished module:
-- 1) inspect latest AuranClinicDbContextModelSnapshot and migrations;
-- 2) add/modify entity configuration with tenant-safe FK/index/check constraints;
-- 3) generate migration;
-- 4) add migration/model/integration tests;
-- 5) update this inventory if the logical contract changes.
