# Functional Requirements
FR-001 Platform Admin can authenticate and refresh/logout sessions.  
FR-002 An empty installation can bootstrap the first Platform Admin only through explicit secure configuration.  
FR-003 Platform Admin can provision a clinic and its first protected clinic administrator/Super User atomically.  
FR-004 Platform Admin can list/read/update clinic metadata and suspend/reactivate clinics.  
FR-005 Suspension invalidates affected clinic sessions; reactivation does not resurrect old sessions.  
FR-006 Platform and Clinic actors are rejected from each other's protected API boundaries.  
FR-007 Clinic users authenticate and receive current clinic/user/permission context.  
FR-008 Clinic users can hold multiple static roles; permissions are unioned.  
FR-009 The last active Super User cannot be disabled through normal administration.  
FR-010 Staff search patients before registration; exact same clinic+phone is a conflict.  
FR-011 Patient numbers are generated from clinic prefix + year + sequence and are unique per clinic.  
FR-012 Clinics configure dynamic profile fields, clinical measurement fields, workflow and order sections.  
FR-013 Check-in creates the operational Visit/Queue state transactionally.  
FR-014 Queue transitions must be configured and every movement is historized.  
FR-015 A Visit can contain multiple non-overlapping active doctor sessions; only one active session per Visit.  
FR-016 Operational completion does not require documentation completion.  
FR-017 Measurements are append-only historical readings.  
FR-018 Clinical orders support configured structured/text/image/file sections.  
FR-019 Follow-ups are recommendations, not appointment bookings.  
FR-020 Reports follow select → filter → preview → PDF/Excel export.  
FR-021 Important clinical/administrative/configuration actions are audited.  
FR-022 Clinic settings control identity, branding, locale/timezone, welcome content and document defaults.  
FR-023 Dashboard is informational and does not bypass module permissions.  
FR-024 Files are stored through a storage abstraction; SQL stores metadata/storage keys, not large binaries.
