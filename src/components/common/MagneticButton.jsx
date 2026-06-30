const MagneticButton = ({ children, className = '' }) => (
  <button className={`inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-white ${className}`}>{children}</button>
);

export default MagneticButton;
