# Permission Model
Authorization is permission-based. Roles are bundles; controller/service logic must not branch on role names.

## Initial role intent
- **Admin:** Dashboard.View, Patient.View/EditBasic, MedicalProfile.View, Queue.View/Move/Exit, Visit.View, Reports.View, Users.Manage, RBAC.View, Config.Manage, Audit.View, Settings.Manage, FollowUp.View.
- **Receptionist:** Dashboard.View, Patient.View/Create/EditBasic, Queue.View/CheckIn/Move/Exit, FollowUp.View.
- **Doctor:** Dashboard.View, Patient.View, MedicalProfile.View/Edit, Measurement.Create, Queue.View, Visit.View/Start/Edit/Session, Prescription.Create, Documentation.Complete, FollowUp.View, Reports.View.
- **Nurse:** Dashboard.View, Patient.View, MedicalProfile.View, Measurement.Create, Queue.View, Visit.View.

The executable permission catalog in the current backend is authoritative if it contains newer atomic permission names. Changes to grants are product/security changes and require tests.

## Platform permissions
Platform actions are not clinic-role permissions. They require a Platform actor/session. Platform and Clinic tokens must be rejected at the opposite boundary.

## Frontend
Hide/disable unauthorized navigation/actions for UX, but backend authorization remains mandatory.
