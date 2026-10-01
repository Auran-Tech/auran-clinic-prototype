export const patients = [
    { id: 'P-10421', ar: 'أحمد مصطفى', en: 'Ahmed Mostafa', phone: '010 8821 4410', age: 42, conditionAr: 'ضغط مرتفع', conditionEn: 'Hypertension', last: '30 Sep 2026' },
    { id: 'P-10388', ar: 'سارة عادل', en: 'Sara Adel', phone: '011 2234 1102', age: 31, conditionAr: 'متابعة', conditionEn: 'Follow-up', last: '29 Sep 2026' },
    { id: 'P-10402', ar: 'يوسف حسن', en: 'Youssef Hassan', phone: '012 9055 2321', age: 55, conditionAr: 'سكري', conditionEn: 'Diabetes', last: '27 Sep 2026' },
    { id: 'P-10377', ar: 'نور كمال', en: 'Nour Kamal', phone: '010 4412 8880', age: 27, conditionAr: 'عام', conditionEn: 'General', last: '26 Sep 2026' },
    { id: 'P-10350', ar: 'محمد رضا', en: 'Mohamed Reda', phone: '011 3400 7192', age: 48, conditionAr: 'متابعة', conditionEn: 'Follow-up', last: '24 Sep 2026' },
];
export const queueSeed = [
    { id: 'Q-1001', patientId: 'P-10421', ar: 'أحمد مصطفى', en: 'Ahmed Mostafa', stage: 'waiting', wait: 22, priority: 'high', visitType: 'General', doctor: 'Dr. Mona Salem' },
    { id: 'Q-1002', patientId: 'P-10388', ar: 'سارة عادل', en: 'Sara Adel', stage: 'ready', wait: 8, priority: 'normal', visitType: 'Follow-up', doctor: 'Dr. Heba Fouad', room: 'Room 2' },
    { id: 'Q-1003', patientId: 'P-10402', ar: 'يوسف حسن', en: 'Youssef Hassan', stage: 'waiting', wait: 11, priority: 'normal', visitType: 'Diabetes follow-up', doctor: 'Dr. Karim Yassin' },
    { id: 'Q-1004', patientId: 'P-10377', ar: 'نور كمال', en: 'Nour Kamal', stage: 'visit', wait: 0, priority: 'normal', visitType: 'General', doctor: 'Dr. Karim Yassin', room: 'Room 1' },
    { id: 'Q-1005', patientId: 'P-10350', ar: 'محمد رضا', en: 'Mohamed Reda', stage: 'checked', wait: 3, priority: 'normal', visitType: 'Follow-up', doctor: 'Dr. Mona Salem' },
    { id: 'Q-1006', patientId: 'P-10312', ar: 'هدى علي', en: 'Hoda Ali', stage: 'completed', wait: 0, priority: 'normal', visitType: 'General', doctor: 'Dr. Heba Fouad', room: 'Room 3' },
    { id: 'Q-1007', patientId: 'P-10311', ar: 'ليلى حسن', en: 'Laila Hassan', stage: 'ready', wait: 6, priority: 'normal', visitType: 'Follow-up', doctor: 'Dr. Mona Salem', room: 'Room 3' },
];
export const rolesSeed = [
    { name: 'Super User', users: 1, protected: true, description: 'Protected clinic owner with full administration.' },
    { name: 'Administrator', users: 2, description: 'Clinic operations, configuration, users and reporting.' },
    { name: 'Doctor', users: 8, description: 'Clinical workspace, patient record and follow-up workflows.' },
    { name: 'Reception', users: 5, description: 'Patients, check-in and queue operations.' },
];
export const permissionGroups = {
    Patients: [['Patient_View','View patients and basic record'],['Patient_Create','Register a new patient'],['Patient_Edit_Basic','Edit demographic/contact fields'],['MedicalProfile_View','View medical profile'],['MedicalProfile_Edit','Edit medical profile'],['Measurements_View','View patient measurements'],['Measurements_Create','Create patient measurements']],
    Queue: [['Queue_View','View live queue'],['Queue_CheckIn','Check a patient into clinic flow'],['Queue_Move','Move a patient between workflow states'],['Queue_Exit','Exit patient from clinic flow']],
    Visits: [['Visit_View','View visits'],['Visit_Start','Start a new visit'],['Visit_Edit','Edit visit documentation'],['Visit_Complete','Complete a visit'],['Visit_Reopen','Reopen completed visit when allowed']],
    Orders: [['Orders_View','View clinical orders'],['Orders_Manage','Create/edit clinical orders'],['Prescriptions_View','View prescriptions'],['Prescriptions_Manage','Create/edit prescriptions'],['Files_View','View file metadata and attachments'],['Files_Upload','Upload files']],
    FollowUps: [['FollowUp_View','View follow-ups'],['FollowUp_Manage','Create/edit follow-ups'],['FollowUp_Complete','Mark follow-ups completed']],
    Reports: [['Reports_View','Open operational reports'],['Reports_Export','Export reports to PDF/Excel'],['Reports_Audit_View','View audit-oriented reports']],
    Users: [['Users_View','View clinic users'],['Users_Manage','Create and update users'],['Users_Manage_Status','Activate/deactivate users'],['Users_Manage_Roles','Assign roles to users']],
    RBAC: [['RBAC_View','View roles and permissions'],['RBAC_Manage','Change role permission assignments'],['RBAC_Create_Role','Create custom role'],['RBAC_Delete_Role','Delete custom role when safe']],
    Settings: [['Settings_View','View clinic settings'],['Settings_Manage','Edit clinic settings'],['Workflow_Manage','Edit queue workflow'],['MedicalFields_Manage','Manage dynamic medical fields'],['MeasurementTypes_Manage','Manage measurement definitions'],['Counters_View','View counter definitions'],['Audit_View','View clinic audit log']],
};
export const reportDefinitions = [
    { id: 'patients', name: 'Patients', description: 'Patient creation, demographics and status.' },
    { id: 'visits', name: 'Visits', description: 'Visits by doctor, status and documentation state.' },
    { id: 'queue', name: 'Queue Performance', description: 'Wait times and queue throughput.' },
    { id: 'doctor', name: 'Doctor Activity', description: 'Visit activity by clinician.' },
    { id: 'docs', name: 'Pending Documentation', description: 'Incomplete visit documentation.' },
    { id: 'followups', name: 'Follow-ups', description: 'Due, overdue and completed follow-ups.' },
    { id: 'measurements', name: 'Measurements', description: 'Measurement activity and types.' },
    { id: 'audit', name: 'Audit Log', description: 'Administrative and sensitive events.' },
];
export const workflowSeed = [
    { id: 'checked', name: 'Checked In', color: 'blue', system: true },
    { id: 'waiting', name: 'Waiting', color: 'amber' },
    { id: 'ready', name: 'Ready', color: 'indigo' },
    { id: 'visit', name: 'In Visit', color: 'violet', system: true },
    { id: 'completed', name: 'Completed', color: 'green', system: true },
    { id: 'exited', name: 'Exited', color: 'slate', system: true },
];
export const transitionSeed = [
    { from: 'Checked In', to: 'Waiting', permission: 'Queue_Move', enabled: true },
    { from: 'Waiting', to: 'Ready', permission: 'Queue_Move', enabled: true },
    { from: 'Ready', to: 'In Visit', permission: 'Visit_Start', enabled: true },
    { from: 'In Visit', to: 'Completed', permission: 'Visit_Complete', enabled: true },
    { from: 'Completed', to: 'Exited', permission: 'Queue_Exit', enabled: true },
];
export const medicalFieldsSeed = [
    { id: 'allergy', name: 'Allergies', type: 'Text', required: true, active: true },
    { id: 'chronic', name: 'Chronic Diseases', type: 'JSON', required: false, active: true },
    { id: 'blood', name: 'Blood Type', type: 'Text', required: false, active: true },
    { id: 'surgery', name: 'Surgical History', type: 'Text', required: false, active: true },
    { id: 'family', name: 'Family History', type: 'Text', required: false, active: true },
];
export const measurementTypesSeed = [
    { code: 'BP', name: 'Blood Pressure', unit: 'mmHg', valueType: 'Composite', active: true },
    { code: 'PULSE', name: 'Pulse', unit: 'bpm', valueType: 'Number', active: true },
    { code: 'WEIGHT', name: 'Weight', unit: 'kg', valueType: 'Number', active: true },
    { code: 'GLUCOSE', name: 'Glucose', unit: 'mg/dL', valueType: 'Number', active: true },
    { code: 'TEMP', name: 'Temperature', unit: '°C', valueType: 'Number', active: true },
    { code: 'SPO2', name: 'SpO2', unit: '%', valueType: 'Number', active: true },
];
export const countersSeed = [
    { name: 'Patient Number', prefix: 'P-', padding: 5, next: 10422 },
    { name: 'Visit Number', prefix: 'V-', padding: 6, next: 9822 },
    { name: 'Order Number', prefix: 'O-', padding: 6, next: 4110 },
    { name: 'File Number', prefix: 'F-', padding: 6, next: 901 },
];
