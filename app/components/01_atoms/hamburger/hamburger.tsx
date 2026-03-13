'use client';

interface HamburgerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Hamburger({ ...props }: HamburgerProps) {
  return (
    <button
      className="hamburger"
      aria-label="Toggle menu"
      {...props}
    >
      <div className="hamburger__inner">
        <div className="hamburger__center"></div>
      </div>
    </button>
  );
}