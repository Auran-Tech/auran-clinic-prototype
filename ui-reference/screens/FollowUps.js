import React from 'react';
import { Button, Card, Pill, StatCard } from '../components/UI.js';
import { Header } from '../components/Shell.js';
export default function FollowUps({ t, lang, setLang, theme, setTheme, navigate }) {
    const ar = lang === 'ar';
    const rows = [[ar ? 'أحمد مصطفى' : 'Ahmed Mostafa', ar ? 'مراجعة ضغط' : 'Blood pressure review', 'Today · 16:00', 'due'], [ar ? 'سارة عادل' : 'Sara Adel', ar ? 'مراجعة نتيجة تحليل' : 'Lab result review', 'Today · 17:30', 'due'], [ar ? 'يوسف حسن' : 'Youssef Hassan', ar ? 'متابعة سكر' : 'Diabetes follow-up', '2 days overdue', 'overdue'], [ar ? 'نور كمال' : 'Nour Kamal', ar ? 'مراجعة خطة العلاج' : 'Treatment plan review', 'Tomorrow · 11:00', 'upcoming']];
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: t('المتابعات', 'Follow-ups'), subtitle: t('المستحقة والقادمة والمتأخرة مع الإجراء التالي الواضح', 'Due, upcoming and overdue follow-ups with clear next action'), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement("div", { className: "stats-grid" },
            React.createElement(StatCard, { label: t('مستحقة اليوم', 'Due today'), value: "5", meta: t('2 قبل نهاية الدوام', '2 before end of day') }),
            React.createElement(StatCard, { label: t('قادمة', 'Upcoming'), value: "12", meta: t('خلال 7 أيام', 'next 7 days'), tone: "indigo" }),
            React.createElement(StatCard, { label: t('متأخرة', 'Overdue'), value: "3", meta: t('تحتاج تواصل', 'needs outreach'), tone: "orange" }),
            React.createElement(StatCard, { label: t('مكتملة', 'Completed'), value: "18", meta: t('هذا الأسبوع', 'this week'), tone: "green" })),
        React.createElement(Card, { className: "top-gap" },
            React.createElement("div", { className: "toolbar" },
                React.createElement("div", { className: "segmented" },
                    React.createElement("button", { className: "active" }, t('الكل', 'All')),
                    React.createElement("button", null, t('اليوم', 'Today')),
                    React.createElement("button", null, t('متأخر', 'Overdue')),
                    React.createElement("button", null, t('قادمة', 'Upcoming')))),
            React.createElement("div", { className: "follow-list" }, rows.map(([name, desc, date, status]) => React.createElement("div", { className: "follow-row", key: name },
                React.createElement("div", { className: "mini-avatar" }, name.split(' ').map(x => x[0]).slice(0, 2).join('')),
                React.createElement("div", null,
                    React.createElement("strong", null, name),
                    React.createElement("span", null, desc)),
                React.createElement(Pill, { tone: status === 'overdue' ? 'bad' : status === 'upcoming' ? 'default' : 'blue' }, date),
                React.createElement("div", { className: "follow-actions" },
                    React.createElement(Button, { variant: "ghost", onClick: () => navigate('patientProfile') }, t('فتح المريض', 'Open patient')),
                    React.createElement(Button, { variant: "secondary" }, t('إكمال المتابعة', 'Complete'))))))));
}
