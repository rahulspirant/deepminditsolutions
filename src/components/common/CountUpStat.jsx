const CountUpStat = ({ value, label }) => (
  <div>
    <p className="text-4xl font-semibold text-slate-900">{value}</p>
    <p className="text-sm text-slate-500">{label}</p>
  </div>
);

export default CountUpStat;
