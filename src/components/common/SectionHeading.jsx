const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="space-y-3">
    {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>}
    <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
    {subtitle && <p className="text-slate-600">{subtitle}</p>}
  </div>
);

export default SectionHeading;
