interface BrandLogoProps {
  className?: string;
  size?: number;
}

export default function BrandLogo({ className = "", size = 22 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Precision modern geometric comparator symbol */}
      <rect
        x="2.5"
        y="2.5"
        width="8"
        height="8"
        rx="2"
        className="fill-slate-900"
      />
      <rect
        x="13.5"
        y="2.5"
        width="8"
        height="8"
        rx="2"
        className="fill-blue-600"
      />
      <rect
        x="2.5"
        y="13.5"
        width="8"
        height="8"
        rx="2"
        className="fill-blue-600"
      />
      <rect
        x="13.5"
        y="13.5"
        width="8"
        height="8"
        rx="2"
        className="fill-slate-900"
      />
      {/* Center connection dot */}
      <circle cx="12" cy="12" r="1.75" className="fill-white" />
    </svg>
  );
}
