import React from 'react';
import Icon from '../components/Icon.js';
import { Button, Card, Pill } from '../components/UI.js';
import { Header } from '../components/Shell.js';
export default function UXStates({ t, lang, setLang, theme, setTheme, navigate, notify }) {
    const states = [
        ['Loading', 'dashboard', t('يحافظ Skeleton على نفس توزيع المحتوى ويمنع تكرار الإجراء.', 'Skeleton preserves layout and duplicate actions are disabled.'), 'blue'],
        ['Empty', 'file', t('شرح واضح + الإجراء التالي المناسب للسياق.', 'Clear explanation plus the relevant next action.'), 'default'],
        ['Error', 'alert', t('يحافظ على السياق ويعرض Retry وCorrelation ID عند الحاجة.', 'Preserves context and shows Retry plus Correlation ID when useful.'), 'bad'],
        ['Forbidden', 'lock', t('يوضح عدم وجود صلاحية بدون كشف بيانات محمية.', 'Explains missing access without revealing protected data.'), 'warn'],
        ['Disabled', 'info', t('يوضح سبب عدم إمكانية تنفيذ الإجراء.', 'Explains why an action is unavailable.'), 'default'],
        ['Offline / Retry', 'refresh', t('يحافظ على النص الطبي غير المحفوظ ويوفر Retry صريح.', 'Preserves unsaved clinical text and provides explicit retry.'), 'warn'],
    ];
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: t('حالات UX المرجعية', 'UX State Reference'), subtitle: "Loading · Empty · Error · Forbidden · Disabled · Offline", lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement("div", { className: "state-grid" }, states.map(([title, icon, desc, tone]) => React.createElement(Card, { className: "state-card pad-20", key: title },
            React.createElement("div", { className: "state-card-top" },
                React.createElement("div", { className: "empty-icon" },
                    React.createElement(Icon, { name: icon, size: 24 })),
                React.createElement(Pill, { tone: tone }, title)),
            React.createElement("h3", { dir: "ltr" }, title),
            React.createElement("p", null, desc),
            React.createElement(Button, { variant: "ghost", onClick: () => notify(`${title} demo`) }, t('تجربة الحالة', 'Try state'))))));
}
