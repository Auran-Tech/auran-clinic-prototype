import React from 'react';
import Icon from '../components/Icon.js';
import { Card, Pill } from '../components/UI.js';
import { Header } from '../components/Shell.js';
export default function Audit({ t, lang, setLang, theme, setTheme, navigate }) {
    const rows = [
        ['10:42', 'Ahmed Shahine', 'RolesUpdated', 'User 104', 'c8e1-44ac'],
        ['10:18', 'Dr. Mona Salem', 'VisitStarted', 'V-009821', 'b71f-20da'],
        ['09:57', 'Mariam Ali', 'PatientCheckedIn', 'P-10421', 'aa92-802e'],
        ['09:11', 'Ahmed Shahine', 'SettingsChanged', 'Clinic AUR-DEMO', 'a99d-109f'],
    ];
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: t('سجل التدقيق', 'Audit Log'), subtitle: t('أحداث حساسة قابلة للبحث مع Correlation ID', 'Searchable sensitive events with Correlation ID'), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement(Card, null,
            React.createElement("div", { className: "toolbar" },
                React.createElement("div", { className: "search-box" },
                    React.createElement(Icon, { name: "search", size: 17 }),
                    React.createElement("input", { placeholder: t('ابحث بالمستخدم، الحدث أو Correlation ID', 'Search user, event or Correlation ID') })),
                React.createElement(Pill, null, "100 max")),
            React.createElement("div", { className: "table-wrap" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, t('الوقت', 'Time')),
                            React.createElement("th", null, t('المستخدم', 'User')),
                            React.createElement("th", null, t('الحدث', 'Event')),
                            React.createElement("th", null, t('الكيان', 'Entity')),
                            React.createElement("th", null, "Correlation ID"))),
                    React.createElement("tbody", null, rows.map(r => React.createElement("tr", { key: r[4] }, r.map((x, i) => React.createElement("td", { key: i, dir: i === 0 || i === 4 ? 'ltr' : undefined }, x)))))))));
}
