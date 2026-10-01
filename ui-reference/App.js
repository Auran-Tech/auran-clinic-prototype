import React, { useEffect, useMemo, useState } from 'react';
import { ClinicShell, PlatformShell } from './components/Shell.js';
import Icon from './components/Icon.js';
import Dashboard from './screens/Dashboard.js';
import Patients from './screens/Patients.js';
import PatientProfile from './screens/PatientProfile.js';
import Visits from './screens/Visits.js';
import LiveQueue from './screens/LiveQueue.js';
import ClinicalWorkspace from './screens/ClinicalWorkspace.js';
import FollowUps from './screens/FollowUps.js';
import Reports from './screens/Reports.js';
import Employees from './screens/Employees.js';
import RolesPermissions from './screens/RolesPermissions.js';
import Settings from './screens/Settings.js';
import Audit from './screens/Audit.js';
import UXStates from './screens/UXStates.js';
import ProfileSettings from './screens/ProfileSettings.js';
import Login from './screens/Login.js';
import { PlatformAudit, PlatformClinic, PlatformClinics } from './screens/Platform.js';
const validScreens = new Set([
    'login', 'dashboard', 'patients', 'patientProfile', 'visits', 'queue', 'clinical', 'followups', 'reports', 'employees', 'roles', 'settings', 'audit', 'states', 'profileSettings', 'platformLogin', 'platformClinics', 'platformClinic', 'platformAudit'
]);
function initialScreen() {
    const h = window.location.hash.replace('#/', '').replace('#', '');
    return validScreens.has(h) ? h : 'dashboard';
}
export default function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('auran-theme') || 'dark');
    const [lang, setLang] = useState(() => localStorage.getItem('auran-lang') || 'ar');
    const [screen, setScreen] = useState(initialScreen);
    const [toast, setToast] = useState('');
    const ar = lang === 'ar';
    const t = useMemo(() => (a, e) => ar ? a : e, [ar]);
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('auran-theme', theme);
    }, [theme]);
    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = ar ? 'rtl' : 'ltr';
        localStorage.setItem('auran-lang', lang);
    }, [lang, ar]);
    useEffect(() => {
        const handler = () => setScreen(initialScreen());
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);
    const navigate = next => {
        if (!validScreens.has(next))
            return;
        window.location.hash = `/${next}`;
        setScreen(next);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const notify = message => {
        setToast(message);
        window.clearTimeout(window.__auranToast);
        window.__auranToast = window.setTimeout(() => setToast(''), 2200);
    };
    const common = { t, lang, setLang, theme, setTheme, navigate, notify };
    let content;
    switch (screen) {
        case 'login':
            content = React.createElement(Login, { ...common });
            break;
        case 'platformLogin':
            content = React.createElement(Login, { ...common, platform: true });
            break;
        case 'dashboard':
            content = React.createElement(Dashboard, { ...common });
            break;
        case 'patients':
            content = React.createElement(Patients, { ...common });
            break;
        case 'patientProfile':
            content = React.createElement(PatientProfile, { ...common });
            break;
        case 'visits':
            content = React.createElement(Visits, { ...common });
            break;
        case 'queue':
            content = React.createElement(LiveQueue, { ...common });
            break;
        case 'clinical':
            content = React.createElement(ClinicalWorkspace, { ...common });
            break;
        case 'followups':
            content = React.createElement(FollowUps, { ...common });
            break;
        case 'reports':
            content = React.createElement(Reports, { ...common });
            break;
        case 'employees':
            content = React.createElement(Employees, { ...common });
            break;
        case 'roles':
            content = React.createElement(RolesPermissions, { ...common });
            break;
        case 'settings':
            content = React.createElement(Settings, { ...common });
            break;
        case 'audit':
            content = React.createElement(Audit, { ...common });
            break;
        case 'states':
            content = React.createElement(UXStates, { ...common });
            break;
        case 'profileSettings':
            content = React.createElement(ProfileSettings, { ...common });
            break;
        case 'platformClinics':
            content = React.createElement(PlatformClinics, { ...common });
            break;
        case 'platformClinic':
            content = React.createElement(PlatformClinic, { ...common });
            break;
        case 'platformAudit':
            content = React.createElement(PlatformAudit, { ...common });
            break;
        default: content = React.createElement(Dashboard, { ...common });
    }
    const login = screen === 'login' || screen === 'platformLogin';
    const platform = screen.startsWith('platform') && !login;
    return React.createElement("div", { className: `app-root ${theme}` },
        login ? content : platform ? React.createElement(PlatformShell, { screen: screen, navigate: navigate }, content) : React.createElement(ClinicShell, { screen: screen, navigate: navigate, lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, t: t }, content),
        !login && !platform && React.createElement("button", { className: "ux-fab", onClick: () => navigate('states') },
            React.createElement(Icon, { name: "info", size: 15 }),
            "UX"),
        toast && React.createElement("div", { className: "toast" },
            React.createElement(Icon, { name: "check", size: 16 }),
            React.createElement("span", null, toast)));
}
