import React, { useMemo, useState } from 'react';
import Icon from '../components/Icon.js';
import { Button, Card, Pill, StatCard } from '../components/UI.js';
import { Header } from '../components/Shell.js';
import { queueSeed } from '../data.js';
const stages = [
    { key: 'checked', ar: 'تم الوصول', en: 'Checked in', tone: 'blue', descAr: 'تم تسجيل الوصول ولم يدخل الانتظار بعد', descEn: 'Checked in, not waiting yet' },
    { key: 'waiting', ar: 'في الانتظار', en: 'Waiting', tone: 'amber', descAr: 'بانتظار التجهيز', descEn: 'Waiting to be prepared' },
    { key: 'ready', ar: 'جاهز', en: 'Ready', tone: 'indigo', descAr: 'جاهز لبدء الزيارة', descEn: 'Ready to start visit' },
    { key: 'visit', ar: 'مع الطبيب', en: 'In visit', tone: 'violet', descAr: 'زيارة نشطة', descEn: 'Active visit' },
    { key: 'completed', ar: 'مكتمل', en: 'Completed', tone: 'green', descAr: 'الزيارة انتهت', descEn: 'Visit completed' },
];
export default function LiveQueue({ t, lang, setLang, theme, setTheme, navigate, notify }) {
    const ar = lang === 'ar';
    const [queue, setQueue] = useState(queueSeed);
    const [dragId, setDragId] = useState(null);
    const [over, setOver] = useState(null);
    const [view, setView] = useState('board');
    const [query, setQuery] = useState('');
    const [auto, setAuto] = useState(true);
    const filtered = useMemo(() => queue.filter(x => `${x.id} ${x.patientId} ${x.ar} ${x.en} ${x.doctor}`.toLowerCase().includes(query.toLowerCase())), [queue, query]);
    const longest = Math.max(...queue.map(x => x.wait || 0));
    const move = (id, stage) => {
        setQueue(q => q.map(x => x.id === id ? { ...x, stage } : x));
        setOver(null);
        setDragId(null);
        notify(t('تم نقل المريض في مسار العمل', 'Patient moved in workflow'));
    };
    const quickNext = item => {
        const order = ['checked', 'waiting', 'ready', 'visit', 'completed'];
        const idx = order.indexOf(item.stage);
        if (idx < order.length - 1)
            move(item.id, order[idx + 1]);
        if (item.stage === 'ready')
            navigate('clinical');
    };
    return React.createElement("div", { className: "page-enter queue-page" },
        React.createElement(Header, { title: t('قائمة الانتظار الحية', 'Live Queue'), subtitle: t('لوحة تشغيل لحظية مع Drag & Drop وإجراءات واضحة لكل مريض', 'Real-time operations board with drag & drop and explicit patient actions'), action: React.createElement(Button, { icon: "plus", onClick: () => notify(t('تم فتح تسجيل الوصول', 'Check-in form opened')) }, t('تسجيل وصول', 'Check in patient')), lang: lang, setLang: setLang, theme: theme, setTheme: setTheme, navigate: navigate, t: t }),
        React.createElement("div", { className: "queue-kpis" },
            React.createElement(StatCard, { label: t('داخل المسار', 'In flow'), value: queue.filter(x => x.stage !== 'completed').length, meta: t('مرضى حالياً', 'patients now') }),
            React.createElement(StatCard, { label: t('في الانتظار', 'Waiting'), value: queue.filter(x => x.stage === 'waiting').length, meta: `${t('أطول انتظار', 'Longest')} ${longest}m`, tone: "orange" }),
            React.createElement(StatCard, { label: t('جاهز', 'Ready'), value: queue.filter(x => x.stage === 'ready').length, meta: t('يمكن بدء الزيارة', 'can start visit'), tone: "indigo" }),
            React.createElement(StatCard, { label: t('مع الطبيب', 'In visit'), value: queue.filter(x => x.stage === 'visit').length, meta: t('زيارات نشطة', 'active visits'), tone: "green" })),
        React.createElement(Card, { className: "queue-controlbar top-gap" },
            React.createElement("div", { className: "search-box" },
                React.createElement(Icon, { name: "search", size: 17 }),
                React.createElement("input", { value: query, onChange: e => setQuery(e.target.value), placeholder: t('ابحث بالمريض، رقم الملف أو الطبيب', 'Search patient, patient # or doctor') })),
            React.createElement("div", { className: "queue-filter-pills" },
                React.createElement("button", { className: "filter-chip active" }, t('الكل', 'All')),
                React.createElement("button", { className: "filter-chip" }, t('أولوية عالية', 'High priority')),
                React.createElement("button", { className: "filter-chip" }, t('أكثر من 15 دقيقة', '> 15 min'))),
            React.createElement("div", { className: "control-spacer" }),
            React.createElement("div", { className: "auto-refresh" },
                React.createElement("span", { className: auto ? 'live-dot' : '' }),
                React.createElement("button", { onClick: () => setAuto(v => !v) }, auto ? t('تحديث تلقائي', 'Auto refresh') : t('متوقف', 'Paused')),
                React.createElement("span", null, "10s")),
            React.createElement("div", { className: "segmented" },
                React.createElement("button", { className: view === 'board' ? 'active' : '', onClick: () => setView('board') },
                    React.createElement(Icon, { name: "board", size: 15 }),
                    t('لوحة', 'Board')),
                React.createElement("button", { className: view === 'list' ? 'active' : '', onClick: () => setView('list') },
                    React.createElement(Icon, { name: "list", size: 15 }),
                    t('قائمة', 'List')))),
        view === 'board' ? React.createElement("div", { className: "queue-board-wrap" },
            React.createElement("div", { className: "queue-board" }, stages.map(stage => { const items = filtered.filter(x => x.stage === stage.key); const avg = items.length ? Math.round(items.reduce((s, x) => s + (x.wait || 0), 0) / items.length) : 0; return React.createElement("section", { key: stage.key, className: `queue-lane ${over === stage.key ? 'drop-active' : ''}`, onDragOver: e => { e.preventDefault(); setOver(stage.key); }, onDragLeave: e => { if (!e.currentTarget.contains(e.relatedTarget))
                    setOver(null); }, onDrop: () => dragId && move(dragId, stage.key) },
                React.createElement("div", { className: "lane-head" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "lane-title" },
                            React.createElement("span", { className: `status-dot ${stage.tone}` }),
                            React.createElement("strong", null, ar ? stage.ar : stage.en),
                            React.createElement(Pill, null, items.length)),
                        React.createElement("p", null, ar ? stage.descAr : stage.descEn)),
                    avg > 0 && React.createElement("span", { className: "lane-time" },
                        React.createElement(Icon, { name: "clock", size: 14 }),
                        avg,
                        "m")),
                React.createElement("div", { className: "lane-dropzone" },
                    items.map(item => React.createElement("article", { draggable: true, onDragStart: () => setDragId(item.id), onDragEnd: () => { setDragId(null); setOver(null); }, className: `queue-card ${dragId === item.id ? 'is-dragging' : ''}`, key: item.id },
                        React.createElement("div", { className: "queue-card-top" },
                            React.createElement("span", { className: "drag-handle" },
                                React.createElement(Icon, { name: "drag", size: 16 })),
                            React.createElement("div", { className: "mini-avatar" }, (ar ? item.ar : item.en).split(' ').map(x => x[0]).slice(0, 2).join('')),
                            React.createElement("div", { className: "queue-name" },
                                React.createElement("strong", null, ar ? item.ar : item.en),
                                React.createElement("span", { dir: "ltr" }, item.patientId, " · ", item.id)),
                            item.priority === 'high' && React.createElement(Pill, { tone: "bad" }, t('عاجل', 'High'))),
                        React.createElement("div", { className: "queue-meta-grid" },
                            React.createElement("div", null,
                                React.createElement("span", null, t('الانتظار', 'Wait')),
                                React.createElement("strong", { className: item.wait >= 15 ? 'danger-text' : '' }, item.wait ? `${item.wait}m` : '—')),
                            React.createElement("div", null,
                                React.createElement("span", null, t('النوع', 'Type')),
                                React.createElement("strong", null, item.visitType))),
                        React.createElement("div", { className: "queue-doctor" },
                            React.createElement("span", null, t('الطبيب', 'Doctor')),
                            React.createElement("strong", null, item.doctor),
                            item.room && React.createElement(Pill, { tone: "blue" }, item.room)),
                        React.createElement("div", { className: "queue-actions" },
                            item.stage !== 'completed' && React.createElement(Button, { variant: item.stage === 'ready' ? 'primary' : 'secondary', onClick: () => quickNext(item) }, item.stage === 'checked' ? t('إدخال للانتظار', 'Send to waiting') : item.stage === 'waiting' ? t('تجهيز', 'Mark ready') : item.stage === 'ready' ? t('بدء الزيارة', 'Start visit') : t('إكمال', 'Complete')),
                            item.stage === 'visit' && React.createElement(Button, { variant: "ghost", onClick: () => navigate('clinical') }, t('فتح', 'Open')),
                            item.stage === 'completed' && React.createElement(Button, { variant: "ghost", onClick: () => navigate('patientProfile') }, t('فتح الملف', 'Open record'))))),
                    items.length === 0 && React.createElement("div", { className: "lane-empty" }, React.createElement("span", null, t('اسحب المريض هنا', 'Drop patient here'))))); }))) : React.createElement(Card, { className: "top-gap" },
            React.createElement("div", { className: "table-wrap" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, t('المريض', 'Patient')),
                            React.createElement("th", null, t('الحالة', 'Stage')),
                            React.createElement("th", null, t('الانتظار', 'Wait')),
                            React.createElement("th", null, t('الطبيب', 'Doctor')),
                            React.createElement("th", null, t('الغرفة', 'Room')),
                            React.createElement("th", null))),
                    React.createElement("tbody", null, filtered.map(item => React.createElement("tr", { key: item.id },
                        React.createElement("td", null,
                            React.createElement("strong", null, ar ? item.ar : item.en),
                            React.createElement("div", { className: "cell-sub", dir: "ltr" }, item.patientId)),
                        React.createElement("td", null, React.createElement(Pill, null, ar ? stages.find(s => s.key === item.stage).ar : stages.find(s => s.key === item.stage).en)),
                        React.createElement("td", { dir: "ltr" }, item.wait ? `${item.wait}m` : '—'),
                        React.createElement("td", null, item.doctor),
                        React.createElement("td", null, item.room || '—'),
                        React.createElement("td", null, React.createElement(Button, { variant: "ghost", onClick: () => item.stage === 'visit' ? navigate('clinical') : navigate('patientProfile') }, t('فتح', 'Open'))))))))),
        React.createElement("div", { className: "queue-hint" },
            React.createElement(Icon, { name: "info", size: 16 }),
            React.createElement("span", null, t('السحب يغيّر الحالة فقط داخل الانتقالات المسموحة في Workflow. في التنفيذ الفعلي يجب التحقق من Queue_Move / Visit_Start / Visit_Complete.', 'Dragging changes state only through allowed workflow transitions. Implementation must enforce Queue_Move / Visit_Start / Visit_Complete permissions.'))));
}
