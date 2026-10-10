# Business Rules
BR-001 Every clinic-owned operation is scoped to the authenticated clinic; caller-supplied `ClinicId` never grants access.  
BR-002 Platform identities and Clinic identities are separate actor classes and cannot cross protected API boundaries.  
BR-003 Provisioning must not leave a clinic without its initial protected administrator when any step fails.  
BR-004 Suspending a clinic prevents clinic authentication/use and revokes active sessions; reactivation requires fresh authentication.  
BR-005 Static system roles cannot be renamed/deleted and their built-in permission definitions are read-only in V1.  
BR-006 A clinic user may have multiple roles; effective permissions are the union.  
BR-007 Super User bypasses normal clinic RBAC but never tenant isolation.  
BR-008 The last active Super User is protected from disable/removal paths that would leave zero active Super Users.  
BR-009 Same `ClinicId + Phone` for patients is a hard duplicate conflict. Similar name/phone matches are advisory.  
BR-010 Patient number format is `PREFIX-YEAR-SEQUENCE`; sequence is system-generated and unique per clinic/year.  
BR-011 Specialty-specific fields must be configuration/dynamic records, not new Patient columns.  
BR-012 Measurements append history; editing configuration never rewrites historical readings.  
BR-013 Queue transitions are allowed only when configured; From != To; duplicate transitions are forbidden.  
BR-014 Every queue movement creates history.  
BR-015 Check-in and queue state creation are transactional.  
BR-016 Only one VisitSession may be active for a Visit.  
BR-017 Visit operational status and documentation status are independent.  
BR-018 Clinical autocomplete is productivity assistance only and must not become medical recommendation logic.  
BR-019 Follow-up is not appointment scheduling.  
BR-020 Customer-specific `if clinic == X` code is forbidden; use configuration.  
BR-021 Large file binaries are not stored directly in SQL Server.  
BR-022 All timestamps are stored UTC.
