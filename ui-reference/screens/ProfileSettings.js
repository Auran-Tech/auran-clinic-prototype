import React, { useState } from 'react';
import { Button, Card, Field, Toggle } from '../components/UI.js';
import { Header } from '../components/Shell.js';
export default function ProfileSettings({ t, lang, setLang, theme, setTheme, navigate, notify }) {
    const [emailNotifications, setEmailNotifications] = useState(true);
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: t('إعدادات الملف الشخصي', 'Profile Settings'), subtitle: t('التفضيلات الشخصية للحساب الحالي', 'Personal preferences for the current account'), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement("div", { className: "settings-two-col" },
            React.createElement(Card, { className: "pad-20" },
                React.createElement("h3", null, t('بيانات الحساب', 'Account details')),
                React.createElement("div", { className: "form-stack" },
                    React.createElement(Field, { label: t('الاسم', 'Name') },
                        React.createElement("input", { defaultValue: "Ahmed Shahine" })),
                    React.createElement(Field, { label: t('البريد الإلكتروني', 'Email') },
                        React.createElement("input", { dir: "ltr", defaultValue: "ahmed@auran.clinic" })),
                    React.createElement(Field, { label: t('الدور الحالي', 'Current role') },
                        React.createElement("input", { defaultValue: "Super User", disabled: true })),
                    React.createElement(Button, { onClick: () => notify(t('تم حفظ الملف الشخصي', 'Profile saved')) }, t('حفظ', 'Save')))),
            React.createElement(Card, { className: "pad-20" },
                React.createElement("h3", null, t('التفضيلات', 'Preferences')),
                React.createElement("div", { className: "form-stack" },
                    React.createElement(Field, { label: t('اللغة', 'Language') },
                        React.createElement("select", { value: lang, onChange: e => setLang(e.target.value) },
                            React.createElement("option", { value: "ar" }, "العربية — RTL"),
                            React.createElement("option", { value: "en" }, "English — LTR"))),
                    React.createElement("div", { className: "setting-switch-row" },
                        React.createElement("div", null,
                            React.createElement("strong", null, t('الوضع الداكن', 'Dark mode')),
                            React.createElement("span", null, t('تفضيل شخصي لهذه الجلسة المرجعية.', 'Personal preference for this reference session.'))),
                        React.createElement(Toggle, { checked: theme === 'dark', onChange: v => setTheme(v ? 'dark' : 'light') })),
                    React.createElement("div", { className: "setting-switch-row" },
                        React.createElement("div", null,
                            React.createElement("strong", null, t('تنبيهات البريد', 'Email notifications')),
                            React.createElement("span", null, t('تنبيهات تشغيلية غير طبية.', 'Non-clinical operational notifications.'))),
                        React.createElement(Toggle, { checked: emailNotifications, onChange: setEmailNotifications }))))));
}
