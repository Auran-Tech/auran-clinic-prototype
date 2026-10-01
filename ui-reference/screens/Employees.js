import React, { useMemo, useState } from 'react';
import Icon from '../components/Icon.js';
import { Button, Card, Field, Modal, Pill } from '../components/UI.js';
import { Header } from '../components/Shell.js';
import { rolesSeed } from '../data.js';
function MultiRoleSelect({ t, selected, setSelected }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const roles = useMemo(() => rolesSeed.map(r => r.name).filter(r => r.toLowerCase().includes(query.toLowerCase())), [query]);
    const toggle = r => setSelected(v => v.includes(r) ? v.filter(x => x !== r) : [...v, r]);
    return React.createElement("div", { className: "multi-select" },
        React.createElement("button", { type: "button", className: "multi-select-trigger", onClick: () => setOpen(v => !v) },
            React.createElement("div", { className: "multi-tags" }, selected.length ? selected.map(r => React.createElement("span", { key: r },
                r,
                React.createElement("button", { type: "button", onClick: e => { e.stopPropagation(); toggle(r); } }, "×"))) : React.createElement("em", null, t('اختر دوراً أو أكثر', 'Select one or more roles'))),
            React.createElement(Pill, null, selected.length),
            React.createElement(Icon, { name: "chevron", size: 14 })),
        open && React.createElement("div", { className: "multi-select-popover" },
            React.createElement("div", { className: "search-box compact" },
                React.createElement(Icon, { name: "search", size: 15 }),
                React.createElement("input", { value: query, onChange: e => setQuery(e.target.value), placeholder: t('ابحث عن دور', 'Search roles') })),
            React.createElement("div", { className: "multi-options" }, roles.map(r => React.createElement("button", { type: "button", key: r, onClick: () => toggle(r) },
                React.createElement("span", { className: `check-box ${selected.includes(r) ? 'checked' : ''}` }, selected.includes(r) && React.createElement(Icon, { name: "check", size: 13 })),
                React.createElement("div", null,
                    React.createElement("strong", null, r),
                    React.createElement("small", null, rolesSeed.find(x => x.name === r)?.description)),
                r === 'Super User' && React.createElement(Pill, { tone: "warn" }, "Protected")))),
            React.createElement("div", { className: "multi-help" }, t('يمكن للمستخدم امتلاك أكثر من دور. الصلاحيات تأتي من مجموع الأدوار.', 'A user may have multiple roles. Effective permissions are the union of assigned roles.')),
            React.createElement("div", { className: "multi-footer" },
                React.createElement(Button, { variant: "ghost", onClick: () => { setSelected([]); } }, t('مسح', 'Clear')),
                React.createElement(Button, { onClick: () => setOpen(false) }, t('تم', 'Done')))));
}
export default function Employees({ t, lang, setLang, theme, setTheme, navigate, notify }) {
    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState(['Doctor']);
    const [editing, setEditing] = useState(null);
    const ar = lang === 'ar';
    const users = [
        { name: ar ? 'أحمد شاهين' : 'Ahmed Shahine', email: 'ahmed@auran.clinic', roles: ['Super User'], status: 'Active', last: '01 Oct · 10:12' },
        { name: ar ? 'د. منى سالم' : 'Dr. Mona Salem', email: 'mona@auran.clinic', roles: ['Doctor'], status: 'Active', last: '01 Oct · 09:48' },
        { name: ar ? 'مريم علي' : 'Mariam Ali', email: 'mariam@auran.clinic', roles: ['Reception', 'Administrator'], status: 'Active', last: '01 Oct · 08:55' },
        { name: ar ? 'عمر حسن' : 'Omar Hassan', email: 'omar@auran.clinic', roles: ['Administrator'], status: 'Disabled', last: '29 Sep · 15:20' },
    ];
    const edit = user => { setEditing(user); setRoles(user.roles); setOpen(true); };
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: t('الموظفون', 'Employees'), subtitle: t('إدارة المستخدمين وحالتهم وأدوارهم', 'Manage users, status and role assignments'), action: React.createElement(Button, { icon: "plus", onClick: () => { setEditing(null); setRoles([]); setOpen(true); } }, t('مستخدم جديد', 'New user')), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement(Card, null,
            React.createElement("div", { className: "toolbar" },
                React.createElement("div", { className: "search-box" },
                    React.createElement(Icon, { name: "search", size: 17 }),
                    React.createElement("input", { placeholder: t('ابحث بالاسم أو البريد', 'Search name or email') })),
                React.createElement("div", { className: "segmented" },
                    React.createElement("button", { className: "active" }, t('الكل', 'All')),
                    React.createElement("button", null, t('نشط', 'Active')),
                    React.createElement("button", null, t('موقوف', 'Disabled')))),
            React.createElement("div", { className: "table-wrap" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, t('المستخدم', 'User')),
                            React.createElement("th", null, t('الأدوار', 'Roles')),
                            React.createElement("th", null, t('الحالة', 'Status')),
                            React.createElement("th", null, t('آخر دخول', 'Last login')),
                            React.createElement("th", null))),
                    React.createElement("tbody", null, users.map(u => React.createElement("tr", { key: u.email },
                        React.createElement("td", null,
                            React.createElement("div", { className: "person-cell" },
                                React.createElement("div", { className: "mini-avatar" }, u.name.split(' ').map(x => x[0]).slice(0, 2).join('')),
                                React.createElement("div", null,
                                    React.createElement("strong", null, u.name),
                                    React.createElement("span", null, u.email)))),
                        React.createElement("td", null,
                            React.createElement("div", { className: "pill-wrap" }, u.roles.map(r => React.createElement(Pill, { key: r }, r)))),
                        React.createElement("td", null,
                            React.createElement(Pill, { tone: u.status === 'Active' ? 'ok' : 'bad' }, u.status)),
                        React.createElement("td", { dir: "ltr" }, u.last),
                        React.createElement("td", null,
                            React.createElement(Button, { variant: "ghost", icon: "edit", onClick: () => edit(u) }, t('تعديل', 'Edit'))))))))),
        React.createElement("div", { className: "security-note" },
            React.createElement(Icon, { name: "lock" }),
            React.createElement("div", null,
                React.createElement("strong", null, t('حماية Super User', 'Super User protection')),
                React.createElement("span", null, t('لا يمكن تعطيل آخر Super User نشط. تغيير الدور أو الحالة يلغي الجلسات المتأثرة.', 'The last active Super User cannot be disabled. Role/status changes invalidate affected sessions.')))),
        React.createElement(Modal, { wide: true, open: open, onClose: () => setOpen(false), title: editing ? t('تحديث المستخدم', 'Update user') : t('إنشاء مستخدم', 'Create user'), description: t('البيانات الأساسية والأدوار تُحفظ في عملية واحدة.', 'Basic information and role assignments are saved together.'), footer: React.createElement(React.Fragment, null,
                React.createElement(Button, { variant: "ghost", onClick: () => setOpen(false) }, t('إلغاء', 'Cancel')),
                React.createElement(Button, { onClick: () => { setOpen(false); notify(t('تم حفظ المستخدم', 'User saved')); } }, t('حفظ المستخدم', 'Save user'))) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(Field, { label: t('الاسم', 'Name') },
                    React.createElement("input", { defaultValue: editing?.name || '' })),
                React.createElement(Field, { label: t('البريد الإلكتروني', 'Email') },
                    React.createElement("input", { defaultValue: editing?.email || '', dir: "ltr" })),
                React.createElement(Field, { label: t('الحالة', 'Status') },
                    React.createElement("select", { defaultValue: editing?.status || 'Active' },
                        React.createElement("option", null, "Active"),
                        React.createElement("option", null, "Disabled"))),
                React.createElement("div", { className: "field full" },
                    React.createElement("span", { className: "field-label" }, t('الأدوار', 'Roles')),
                    React.createElement(MultiRoleSelect, { t: t, selected: roles, setSelected: setRoles })))));
}
