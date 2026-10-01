import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon.js';
import { Pill } from './UI.js';
const clinicNav = [
    ['dashboard', 'نظرة عامة', 'Dashboard', 'dashboard'],
    ['patients', 'المرضى', 'Patients', 'patients'],
    ['queue', 'قائمة الانتظار', 'Live Queue', 'queue'],
    ['visits', 'الزيارات', 'Visits', 'visits'],
    ['followups', 'المتابعات', 'Follow-ups', 'follow'],
    ['reports', 'التقارير', 'Reports', 'reports'],
    ['employees', 'الموظفون', 'Employees', 'staff'],
    ['roles', 'الأدوار والصلاحيات', 'Roles & Permissions', 'shield'],
    ['settings', 'الإعدادات والتكوين', 'Settings & Configuration', 'settings'],
    ['audit', 'سجل التدقيق', 'Audit Log', 'audit'],
];
export function ClinicLogo({ compact = false }) {
    return React.createElement("div", { className: "brand-lockup" },
        React.createElement("div", { className: "brand-mark" }, "A"),
        !compact && React.createElement("div", null,
            React.createElement("strong", null, "AURAN Clinic"),
            React.createElement("span", null, "Clinic Operating System")));
}
function Avatar({ size = 36 }) {
    return React.createElement("div", { className: "avatar", style: { width: size, height: size } },
        React.createElement("svg", { width: size * .72, height: size * .72, viewBox: "0 0 40 40" },
            React.createElement("circle", { cx: "20", cy: "14", r: "7", fill: "currentColor" }),
            React.createElement("path", { d: "M7 36c1.5-9 6-13 13-13s11.5 4 13 13", fill: "currentColor" })));
}
function UserMenu({ lang, setLang, theme, setTheme, onNavigate, t }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const h = e => { if (ref.current && !ref.current.contains(e.target))
            setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);
    return React.createElement("div", { className: "user-menu", ref: ref },
        React.createElement("button", { className: "user-trigger", onClick: () => setOpen(v => !v) },
            React.createElement(Avatar, null),
            React.createElement("div", { className: "user-trigger-copy" },
                React.createElement("strong", null, "Ahmed Shahine"),
                React.createElement("span", null, "Super User")),
            React.createElement(Icon, { name: "chevron", size: 15 })),
        open && React.createElement("div", { className: "user-popover" },
            React.createElement("div", { className: "user-summary" },
                React.createElement(Avatar, { size: 52 }),
                React.createElement("div", null,
                    React.createElement("strong", null, "Ahmed Shahine"),
                    React.createElement("span", null, "ahmed@auran.clinic"),
                    React.createElement(Pill, { tone: "blue" }, "Super User"))),
            React.createElement("button", { className: "menu-row", onClick: () => onNavigate('profileSettings') },
                React.createElement(Icon, { name: "user" }),
                React.createElement("span", null, t('إعدادات الملف الشخصي', 'Profile settings')),
                React.createElement(Icon, { name: "chevron", size: 14 })),
            React.createElement("div", { className: "menu-row static" },
                React.createElement(Icon, { name: "globe" }),
                React.createElement("span", null, t('اللغة', 'Language')),
                React.createElement("div", { className: "segmented mini" },
                    React.createElement("button", { className: lang === 'ar' ? 'active' : '', onClick: () => setLang('ar') }, "AR"),
                    React.createElement("button", { className: lang === 'en' ? 'active' : '', onClick: () => setLang('en') }, "EN"))),
            React.createElement("div", { className: "menu-row static" },
                React.createElement(Icon, { name: theme === 'dark' ? 'moon' : 'sun' }),
                React.createElement("span", null, t('الوضع الداكن', 'Dark mode')),
                React.createElement("button", { className: `toggle ${theme === 'dark' ? 'is-on' : ''}`, onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark') },
                    React.createElement("span", { className: "toggle-knob" }))),
            React.createElement("div", { className: "menu-separator" }),
            React.createElement("button", { className: "menu-row danger", onClick: () => onNavigate('login') },
                React.createElement(Icon, { name: "logout" }),
                React.createElement("span", null, t('تسجيل الخروج', 'Sign out')))));
}
export function Header({ title, subtitle, action, lang, setLang, theme, setTheme, navigate, t }) {
    return React.createElement("header", { className: "page-header" },
        React.createElement("div", { className: "page-heading" },
            React.createElement("h1", null, title),
            React.createElement("p", null, subtitle)),
        action,
        React.createElement("div", { className: "header-spacer" }),
        React.createElement("button", { className: "icon-btn notification" },
            React.createElement(Icon, { name: "bell", size: 18 }),
            React.createElement("span", null)),
        React.createElement(UserMenu, { lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, onNavigate: navigate, t: t }));
}
export function ClinicShell({ screen, navigate, lang, setLang, theme, setTheme, t, children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    return React.createElement("div", { className: "app-layout" },
        React.createElement("aside", { className: `sidebar ${mobileOpen ? 'is-open' : ''}` },
            React.createElement("div", { className: "sidebar-brand" },
                React.createElement(ClinicLogo, null),
                React.createElement("button", { className: "sidebar-close icon-btn", onClick: () => setMobileOpen(false) },
                    React.createElement(Icon, { name: "close" }))),
            React.createElement("div", { className: "nav-section-label" }, t('التشغيل السريري', 'Clinic operations')),
            React.createElement("nav", null, clinicNav.slice(0, 6).map(([id, ar, en, icon]) => React.createElement("button", { key: id, className: `nav-item ${screen === id ? 'active' : ''}`, onClick: () => { navigate(id); setMobileOpen(false); } },
                React.createElement(Icon, { name: icon }),
                React.createElement("span", null, t(ar, en))))),
            React.createElement("div", { className: "nav-section-label" }, t('الإدارة', 'Administration')),
            React.createElement("nav", null, clinicNav.slice(6).map(([id, ar, en, icon]) => React.createElement("button", { key: id, className: `nav-item ${screen === id ? 'active' : ''}`, onClick: () => { navigate(id); setMobileOpen(false); } },
                React.createElement(Icon, { name: icon }),
                React.createElement("span", null, t(ar, en))))),
            React.createElement("div", { className: "sidebar-footer" },
                React.createElement("div", { className: "system-health" },
                    React.createElement("span", { className: "health-dot" }),
                    React.createElement("div", null,
                        React.createElement("strong", null, t('النظام متصل', 'System online')),
                        React.createElement("span", null, t('آخر مزامنة الآن', 'Synced just now')))))),
        mobileOpen && React.createElement("button", { className: "sidebar-overlay", onClick: () => setMobileOpen(false) }),
        React.createElement("main", { className: "main-content" },
            React.createElement("div", { className: "mobile-topbar" },
                React.createElement("button", { className: "icon-btn", onClick: () => setMobileOpen(true) },
                    React.createElement(Icon, { name: "menu" })),
                React.createElement(ClinicLogo, { compact: true }),
                React.createElement("div", { className: "mobile-actions" },
                    React.createElement("button", { className: "icon-btn", onClick: () => setLang(lang === 'ar' ? 'en' : 'ar') },
                        React.createElement(Icon, { name: "globe" })),
                    React.createElement("button", { className: "icon-btn", onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark') },
                        React.createElement(Icon, { name: theme === 'dark' ? 'sun' : 'moon' })))),
            children));
}
export function PlatformShell({ screen, navigate, children }) {
    return React.createElement("div", { className: "app-layout platform-shell" },
        React.createElement("aside", { className: "sidebar platform-sidebar" },
            React.createElement("div", { className: "sidebar-brand" },
                React.createElement("div", { className: "platform-title" },
                    React.createElement("span", null, "AURAN PLATFORM"),
                    React.createElement("strong", null, "Control Center"))),
            React.createElement("nav", null,
                React.createElement("button", { className: `nav-item ${screen === 'platformClinics' ? 'active' : ''}`, onClick: () => navigate('platformClinics') },
                    React.createElement(Icon, { name: "platform" }),
                    React.createElement("span", null, "Clinics")),
                React.createElement("button", { className: `nav-item ${screen === 'platformAudit' ? 'active' : ''}`, onClick: () => navigate('platformAudit') },
                    React.createElement(Icon, { name: "audit" }),
                    React.createElement("span", null, "Platform Audit"))),
            React.createElement("div", { className: "sidebar-footer" },
                React.createElement("button", { className: "nav-item", onClick: () => navigate('platformLogin') },
                    React.createElement(Icon, { name: "logout" }),
                    React.createElement("span", null, "Sign out")))),
        React.createElement("main", { className: "main-content" }, children));
}
