import React from 'react';
import Icon from './Icon.js';
export function Card({ children, className = '', interactive = false }) {
    return React.createElement("section", { className: `card ${interactive ? 'card-interactive' : ''} ${className}` }, children);
}
export function Button({ children, icon, variant = 'primary', className = '', ...props }) {
    return React.createElement("button", { className: `btn btn-${variant} ${className}`, ...props },
        icon && React.createElement(Icon, { name: icon, size: 17 }),
        React.createElement("span", null, children));
}
export function Pill({ children, tone = 'default', className = '' }) {
    return React.createElement("span", { className: `pill pill-${tone} ${className}` }, children);
}
export function StatCard({ label, value, meta, tone = 'blue', onClick }) {
    return React.createElement("button", { className: "stat-card", onClick: onClick },
        React.createElement("div", { className: "stat-head" },
            React.createElement("div", null,
                React.createElement("span", { className: "stat-label" }, label),
                React.createElement("strong", { dir: "ltr" }, value)),
            React.createElement("div", { className: `stat-orb tone-${tone}` })),
        React.createElement("span", { className: "stat-meta" }, meta));
}
export function Field({ label, hint, children }) {
    return React.createElement("label", { className: "field" },
        React.createElement("span", { className: "field-label" }, label),
        children,
        hint && React.createElement("span", { className: "field-hint" }, hint));
}
export function EmptyState({ icon = 'info', title, description, action }) {
    return React.createElement("div", { className: "empty-state" },
        React.createElement("div", { className: "empty-icon" },
            React.createElement(Icon, { name: icon, size: 28 })),
        React.createElement("h3", null, title),
        React.createElement("p", null, description),
        action);
}
export function Modal({ open, onClose, title, description, children, footer, wide = false }) {
    if (!open)
        return null;
    return React.createElement("div", { className: "modal-backdrop", onMouseDown: onClose },
        React.createElement("div", { className: `modal-panel ${wide ? 'modal-wide' : ''}`, onMouseDown: e => e.stopPropagation() },
            React.createElement("div", { className: "modal-header" },
                React.createElement("div", null,
                    React.createElement("h3", null, title),
                    description && React.createElement("p", null, description)),
                React.createElement("button", { className: "icon-btn", onClick: onClose },
                    React.createElement(Icon, { name: "close" }))),
            React.createElement("div", { className: "modal-body" }, children),
            footer && React.createElement("div", { className: "modal-footer" }, footer)));
}
export function SectionTitle({ title, description, actions }) {
    return React.createElement("div", { className: "section-title" },
        React.createElement("div", null,
            React.createElement("h3", null, title),
            description && React.createElement("p", null, description)),
        actions && React.createElement("div", { className: "section-actions" }, actions));
}
export function Toggle({ checked, onChange, disabled, label }) {
    return React.createElement("button", { type: "button", "aria-pressed": checked, disabled: disabled, className: `toggle ${checked ? 'is-on' : ''}`, onClick: () => !disabled && onChange?.(!checked) },
        React.createElement("span", { className: "toggle-knob" }),
        React.createElement("span", { className: "sr-only" }, label));
}
