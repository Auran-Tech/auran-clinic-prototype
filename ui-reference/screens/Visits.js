import React from 'react';
import { Button, Card, Pill, StatCard } from '../components/UI.js';
import { Header } from '../components/Shell.js';
export default function Visits({ t, lang, setLang, theme, setTheme, navigate }) {
    const ar = lang === 'ar';
    const rows = [
        ['V-009821', ar ? 'أحمد مصطفى' : 'Ahmed Mostafa', ar ? 'د. منى سالم' : 'Dr. Mona Salem', 'Active', 'Draft', '10:18'],
        ['V-009820', ar ? 'نور كمال' : 'Nour Kamal', ar ? 'د. كريم ياسين' : 'Dr. Karim Yassin', 'Active', 'Complete', '10:02'],
        ['V-009818', ar ? 'سارة عادل' : 'Sara Adel', ar ? 'د. هبة فؤاد' : 'Dr. Heba Fouad', 'Completed', 'Pending', '09:40'],
        ['V-009817', ar ? 'يوسف حسن' : 'Youssef Hassan', ar ? 'د. منى سالم' : 'Dr. Mona Salem', 'Completed', 'Complete', '09:15'],
    ];
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: t('الزيارات', 'Visits'), subtitle: t('الزيارات النشطة والمكتملة وحالة التوثيق', 'Active and completed visits with documentation state'), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement("div", { className: "stats-grid" },
            React.createElement(StatCard, { label: t('نشطة', 'Active'), value: "6", meta: t('الآن', 'now'), tone: "indigo" }),
            React.createElement(StatCard, { label: t('مكتملة اليوم', 'Completed today'), value: "31", meta: t('حتى الآن', 'so far'), tone: "green" }),
            React.createElement(StatCard, { label: t('توثيق معلق', 'Pending docs'), value: "4", meta: t('يحتاج إكمال', 'needs completion'), tone: "orange" }),
            React.createElement(StatCard, { label: t('متوسط المدة', 'Avg duration'), value: "18m", meta: t('آخر 7 أيام', 'last 7 days') })),
        React.createElement(Card, { className: "top-gap" },
            React.createElement("div", { className: "toolbar" },
                React.createElement("div", { className: "segmented" },
                    React.createElement("button", { className: "active" }, t('الكل', 'All')),
                    React.createElement("button", null, t('نشطة', 'Active')),
                    React.createElement("button", null, t('مكتملة', 'Completed')),
                    React.createElement("button", null, t('توثيق معلق', 'Pending docs')))),
            React.createElement("div", { className: "table-wrap" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, t('الزيارة', 'Visit')),
                            React.createElement("th", null, t('المريض', 'Patient')),
                            React.createElement("th", null, t('الطبيب', 'Doctor')),
                            React.createElement("th", null, t('الحالة', 'Status')),
                            React.createElement("th", null, t('التوثيق', 'Documentation')),
                            React.createElement("th", null, t('بدأت', 'Started')),
                            React.createElement("th", null))),
                    React.createElement("tbody", null, rows.map(r => React.createElement("tr", { key: r[0] },
                        React.createElement("td", { dir: "ltr" },
                            React.createElement("strong", null, r[0])),
                        React.createElement("td", null, r[1]),
                        React.createElement("td", null, r[2]),
                        React.createElement("td", null,
                            React.createElement(Pill, { tone: r[3] === 'Active' ? 'blue' : 'ok' }, r[3])),
                        React.createElement("td", null,
                            React.createElement(Pill, { tone: r[4] === 'Complete' ? 'ok' : r[4] === 'Pending' ? 'bad' : 'warn' }, r[4])),
                        React.createElement("td", { dir: "ltr" }, r[5]),
                        React.createElement("td", null,
                            React.createElement(Button, { variant: "ghost", onClick: () => navigate('clinical') }, t('فتح مساحة الزيارة', 'Open workspace'))))))))));
}
