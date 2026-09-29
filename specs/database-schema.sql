-- AURAN Clinic V1 logical starter schema.
-- EF Core migrations/current DbContext are authoritative for exact executable schema.
-- This file records required boundaries/constraints and is intentionally not a replacement for migrations.

CREATE TABLE dbo.Clinic (
    Id uniqueidentifier NOT NULL PRIMARY KEY,
    Code nvarchar(64) NOT NULL UNIQUE,
    Name nvarchar(200) NOT NULL,
    PatientNumberPrefix nvarchar(20) NOT NULL,
    Timezone nvarchar(100) NOT NULL,
    IsActive bit NOT NULL DEFAULT 1,
    CreatedAt datetime2 NOT NULL,
    UpdatedAt datetime2 NOT NULL
);

-- Clinic-owned Patient example. Other aggregates follow the canonical database/module docs.
CREATE TABLE dbo.Patient (
    Id uniqueidentifier NOT NULL PRIMARY KEY,
    ClinicId uniqueidentifier NOT NULL,
    PatientNumber nvarchar(64) NOT NULL,
    FullName nvarchar(250) NOT NULL,
    Phone nvarchar(50) NOT NULL,
    Gender nvarchar(30) NOT NULL,
    DateOfBirth date NULL,
    Notes nvarchar(max) NULL,
    CreatedAt datetime2 NOT NULL,
    UpdatedAt datetime2 NULL,
    CONSTRAINT FK_Patient_Clinic FOREIGN KEY (ClinicId) REFERENCES dbo.Clinic(Id),
    CONSTRAINT UQ_Patient_Clinic_Number UNIQUE (ClinicId, PatientNumber),
    CONSTRAINT UQ_Patient_Clinic_Phone UNIQUE (ClinicId, Phone)
);

-- Required logical tables (exact columns come from EF model/migrations):
-- PlatformAdmin/Identity & refresh sessions, ClinicUser, Role, Permission, UserRole, RolePermission,
-- PatientCondition, PatientAllergy, PatientCurrentMedication,
-- ProfileSection, ProfileField, ProfileFieldOption, PatientProfileValue(+selected options),
-- ClinicalField(+options), ClinicalMeasurement,
-- WorkflowStatus, WorkflowTransition, QueueEntry, QueueStatusHistory,
-- Visit, VisitSession, OrderSectionDefinition, ClinicalOrder, ClinicalOrderSection, ClinicalOrderItem,
-- FileRecord, PatientAttachment, ClinicalOrderAttachment, FollowUp, AuditLog.
-- Required uniqueness: UserRole(UserId,RoleCode), RolePermission(RoleCode,PermissionCode),
-- (ClinicId,WorkflowStatus.Code), WorkflowTransition(FromStatusId,ToStatusId).
-- Use UTC timestamps and tenant-aware indexes. Use rowversion for concurrency-sensitive operational records where implemented.
