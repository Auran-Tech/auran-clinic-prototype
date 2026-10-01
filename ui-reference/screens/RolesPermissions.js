import React, { useMemo, useState } from 'react';
import Icon from '../components/Icon.js';
import { Button, Card, Field, Modal, Pill, Toggle } from '../components/UI.js';
import { Header } from '../components/Shell.js';
import { permissionGroups, rolesSeed } from '../data.js';
export default function RolesPermissions({ t, lang, setLang, theme, setTheme, navigate, notify }) {
    const [roles, setRoles] = useState(rolesSeed);
    const [selectedRole, setSelectedRole] = useState('Doctor');
    const [group, setGroup] = useState('Patients');
    const [query, setQuery] = useState('');
    const [dirty, setDirty] = useState(0);
    const [newRole, setNewRole] = useState(false);
    const [enabled, setEnabled] = useState(() => new Set(['Patient_View', 'MedicalProfile_View', 'Measurements_View', 'Queue_View', 'Visit_View', 'Visit_Start', 'Visit_Edit', 'FollowUp_View', 'Reports_View', 'Files_View']));
    const perms = useMemo(() => permissionGroups[group].filter(([key, desc]) => `${key} ${desc}`.toLowerCase().includes(query.toLowerCase())), [group, query]);
    const toggle = key => { if (selectedRole === 'Super User')
        return; setEnabled(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; }); setDirty(v => v + 1); };
    const role = roles.find(r => r.name === selectedRole);
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: t('الأدوار والصلاحيات', 'Roles & Permissions'), subtitle: t('اختَر الدور ثم مجموعة الصلاحيات. الصلاحيات داخل المجموعة تظهر في عمود واحد واضح.', 'Choose a role, then a permission group. Permissions inside the group are shown as one clear vertical column.'), action: React.createElement(Button, { icon: "plus", onClick: () => setNewRole(true) }, t('دور جديد', 'New role')), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement("div", { className: "roles-layout" },
            React.createElement(Card, { className: "roles-panel pad-16" },
                React.createElement("div", { className: "section-title" },
                    React.createElement("div", null,
                        React.createElement("h3", null, t('الأدوار', 'Roles')),
                        React.createElement("p", null, t('اختر دوراً للإدارة', 'Select a role to manage'))),
                    React.createElement(Pill, null, roles.length)),
                roles.map(r => React.createElement("button", { className: `role-card ${selectedRole === r.name ? 'active' : ''}`, key: r.name, onClick: () => { setSelectedRole(r.name); setDirty(0); } },
                    React.createElement("div", null,
                        React.createElement("strong", null, r.name),
                        r.protected && React.createElement(Pill, { tone: "warn" }, "Protected")),
                    React.createElement("span", null, r.description),
                    React.createElement("small", null,
                        r.users,
                        " ",
                        t('مستخدم', 'users'))))),
            React.createElement("div", { className: "role-workspace" },
                React.createElement(Card, { className: "pad-20 role-head-card" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "role-title-line" },
                            React.createElement("h2", null, selectedRole),
                            role?.protected && React.createElement(Pill, { tone: "warn" }, t('دور محمي', 'Protected role'))),
                        React.createElement("p", null, role?.description)),
                    React.createElement("div", { className: "role-head-actions" },
                        dirty > 0 && React.createElement(Pill, { tone: "warn" },
                            dirty,
                            " ",
                            t('تغييرات', 'changes')),
                        React.createElement(Button, { variant: "ghost", icon: "edit", disabled: selectedRole === 'Super User' }, t('تعديل الدور', 'Edit role')),
                        React.createElement(Button, { disabled: dirty === 0 || selectedRole === 'Super User', onClick: () => { setDirty(0); notify(t('تم حفظ الصلاحيات', 'Permissions saved')); } }, t('حفظ التغييرات', 'Save changes')))),
                React.createElement(Card, { className: "pad-20 top-gap permission-card" },
                    React.createElement("div", { className: "permission-toolbar" },
                        React.createElement("div", { className: "search-box" },
                            React.createElement(Icon, { name: "search", size: 16 }),
                            React.createElement("input", { value: query, onChange: e => setQuery(e.target.value), placeholder: t('ابحث في الصلاحيات', 'Search permissions') })),
                        React.createElement("span", null,
                            Object.values(permissionGroups).flat().length,
                            " ",
                            t('صلاحية', 'permissions'))),
                    React.createElement("div", { className: "permission-groups" }, Object.keys(permissionGroups).map(g => React.createElement("button", { className: group === g ? 'active' : '', key: g, onClick: () => setGroup(g) },
                        g,
                        React.createElement("span", null, permissionGroups[g].length)))),
                    React.createElement("div", { className: "permission-column" },
                        React.createElement("div", { className: "permission-column-head" },
                            React.createElement("div", null,
                                React.createElement("h3", null, group),
                                React.createElement("p", null, t('الصلاحيات في عمود واحد لسهولة المسح والمراجعة حتى مع 50+ صلاحية.', 'One-column layout stays scannable even with 50+ permissions.'))),
                            React.createElement(Button, { variant: "ghost", onClick: () => { if (selectedRole !== 'Super User') {
                                    const keys = permissionGroups[group].map(x => x[0]);
                                    setEnabled(prev => new Set([...prev, ...keys]));
                                    setDirty(v => v + keys.length);
                                } } }, t('تفعيل المجموعة', 'Enable group'))),
                        perms.map(([key, desc]) => React.createElement("div", { className: "permission-row", key: key },
                            React.createElement("div", { className: "permission-copy" },
                                React.createElement("strong", { dir: "ltr" }, key),
                                React.createElement("span", null, desc)),
                            React.createElement("div", { className: "permission-state" },
                                selectedRole === 'Super User' && React.createElement(Pill, { tone: "warn" }, "Inherited"),
                                React.createElement(Toggle, { checked: selectedRole === 'Super User' || enabled.has(key), disabled: selectedRole === 'Super User', onChange: () => toggle(key), label: key })))),
                        perms.length === 0 && React.createElement("div", { className: "empty-inline" }, t('لا توجد نتائج', 'No results')))))),
        React.createElement(Modal, { open: newRole, onClose: () => setNewRole(false), title: t('إنشاء دور جديد', 'Create new role'), description: t('أنشئ الدور أولاً ثم عيّن صلاحياته من الصفحة.', 'Create the role first, then assign permissions on this page.'), footer: React.createElement(React.Fragment, null,
                React.createElement(Button, { variant: "ghost", onClick: () => setNewRole(false) }, t('إلغاء', 'Cancel')),
                React.createElement(Button, { onClick: () => { const name = 'Custom Role ' + (roles.length - 3); setRoles(r => [...r, { name, users: 0, description: 'Custom clinic role' }]); setSelectedRole(name); setNewRole(false); notify(t('تم إنشاء الدور', 'Role created')); } }, t('إنشاء الدور', 'Create role'))) },
            React.createElement(Field, { label: t('اسم الدور', 'Role name') },
                React.createElement("input", null)),
            React.createElement(Field, { label: t('الوصف', 'Description') },
                React.createElement("textarea", { rows: "3" }))));
}
