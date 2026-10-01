import React, { useState } from 'react';
import { Button, Card, Pill, StatCard } from '../components/UI.js';
import { Header } from '../components/Shell.js';
export function PlatformClinics({ t, lang, setLang, theme, setTheme, navigate, notify }) {
    const rows = [['AURAN Demo Clinic', 'AUR-DEMO', 'Active', 'ahmed@clinic.com', '28 Sep 2026'], ['Nile Care Clinic', 'NILE-01', 'Active', 'admin@nile.com', '24 Sep 2026'], ['Nova Medical', 'NOVA-02', 'Suspended', 'root@nova.com', '18 Sep 2026']];
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: t('العيادات', 'Clinics'), subtitle: t('Provisioning والتفعيل والإيقاف من طبقة المنصة', 'Provisioning, activation and suspension from the platform layer'), action: React.createElement(Button, { onClick: () => notify(t('تم فتح Provision Clinic', 'Provision Clinic opened')) }, t('إنشاء عيادة', 'Provision clinic')), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement("div", { className: "stats-grid" },
            React.createElement(StatCard, { label: t('إجمالي العيادات', 'Total clinics'), value: "42", meta: t('40 نشطة', '40 active') }),
            React.createElement(StatCard, { label: t('نشطة', 'Active'), value: "40", meta: "95%", tone: "green" }),
            React.createElement(StatCard, { label: t('موقوفة', 'Suspended'), value: "2", meta: t('تحتاج مراجعة', 'needs review'), tone: "orange" }),
            React.createElement(StatCard, { label: t('اليوم', 'Provisioned today'), value: "3", meta: "24h", tone: "indigo" })),
        React.createElement(Card, { className: "top-gap" },
            React.createElement("div", { className: "table-wrap" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Clinic"),
                            React.createElement("th", null, "Code"),
                            React.createElement("th", null, "Status"),
                            React.createElement("th", null, "Super User"),
                            React.createElement("th", null, "Created"),
                            React.createElement("th", null))),
                    React.createElement("tbody", null, rows.map(r => React.createElement("tr", { key: r[1] },
                        React.createElement("td", null,
                            React.createElement("strong", null, r[0])),
                        React.createElement("td", { dir: "ltr" }, r[1]),
                        React.createElement("td", null,
                            React.createElement(Pill, { tone: r[2] === 'Active' ? 'ok' : 'bad' }, r[2])),
                        React.createElement("td", { dir: "ltr" }, r[3]),
                        React.createElement("td", { dir: "ltr" }, r[4]),
                        React.createElement("td", null,
                            React.createElement(Button, { variant: "ghost", onClick: () => navigate('platformClinic') }, "Manage")))))))));
}
export function PlatformClinic({ t, lang, setLang, theme, setTheme, navigate, notify }) {
    const [suspended, setSuspended] = useState(false);
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: "AURAN Demo Clinic", subtitle: "Clinic AUR-DEMO", action: React.createElement(Button, { variant: suspended ? 'primary' : 'danger', onClick: () => { setSuspended(v => !v); notify(suspended ? 'Clinic reactivated' : 'Clinic suspended'); } }, suspended ? t('إعادة التفعيل', 'Reactivate') : t('إيقاف العيادة', 'Suspend clinic')), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement("div", { className: "platform-details-grid" },
            React.createElement(Card, { className: "pad-20" },
                React.createElement("h3", null, t('تفاصيل Provisioning', 'Provisioning details')),
                React.createElement("div", { className: "definition-grid" }, [['Status', suspended ? 'Suspended' : 'Active'], ['Initial Super User', 'ahmed@clinic.com'], ['Initial Admin', 'admin@clinic.com'], ['Timezone', 'Africa/Cairo'], ['Created', '28 Sep 2026 · 14:22'], ['Last Status Change', '—']].map(([a, b]) => React.createElement("div", { className: "definition", key: a },
                    React.createElement("span", null, a),
                    React.createElement("strong", { dir: "ltr" }, b))))),
            React.createElement(Card, { className: "pad-20 platform-boundary" },
                React.createElement("h3", null, "Security Boundary"),
                React.createElement("p", null, "Platform token cannot access Clinic APIs. Clinic token cannot access Platform APIs."),
                React.createElement("p", null, t('إيقاف العيادة يلغي الجلسات الحالية. إعادة التفعيل لا تعيد الجلسات القديمة.', 'Suspension invalidates current sessions. Reactivation does not resurrect old sessions.')),
                React.createElement(Button, { variant: "ghost", onClick: () => navigate('platformAudit') }, "Platform Audit"))));
}
export function PlatformAudit({ t, lang, setLang, theme, setTheme, navigate }) {
    return React.createElement("div", { className: "page-enter" },
        React.createElement(Header, { title: "Platform Audit", subtitle: "Provisioning · Status · Platform security", lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement(Card, { className: "pad-20" }, ['ClinicCreated · AUR-DEMO · platform.admin', 'ClinicStatusChanged · NOVA-02 · Active → Suspended', 'PlatformLoginSucceeded · platform.admin', 'InitialSuperUserCreated · NILE-01'].map((x, i) => React.createElement("div", { className: "compact-row", key: x },
            React.createElement("span", { dir: "ltr" }, x),
            React.createElement("time", { dir: "ltr" },
                "01 Oct · ",
                10 - i,
                ":2",
                i)))));
}
