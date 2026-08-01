type IconProps = {
  name:
    | "arrow"
    | "bolt"
    | "building"
    | "cable"
    | "check"
    | "chevron"
    | "clock"
    | "drain"
    | "drop"
    | "light"
    | "location"
    | "menu"
    | "paint"
    | "phone"
    | "pipe"
    | "shield"
    | "tiles"
    | "tools"
    | "whatsapp"
    | "wrench";
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function Icon({ name, size = 22, strokeWidth = 1.8, className }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "phone":
      return <svg {...common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" /></svg>;
    case "whatsapp":
      return <svg {...common} viewBox="0 0 32 32"><path d="M27 15.7A11 11 0 0 1 10.7 25l-5.4 1.7 1.8-5.2A11 11 0 1 1 27 15.7Z" /><path d="M11.2 10.4c.3-.5.6-.5 1-.5h.7c.2 0 .4.1.5.5l1 2.4c.1.3.1.5-.1.8l-.8 1c-.2.2-.2.4 0 .7.8 1.4 1.9 2.5 3.4 3.3.3.2.5.1.7-.1l1-1.2c.2-.3.5-.3.8-.2l2.4 1.1c.3.2.5.3.5.5 0 .2-.1 1.4-.7 2.1-.6.8-1.6 1.2-2.6 1.2-1.3 0-3-.6-5.1-1.8a13.6 13.6 0 0 1-5.3-5.7c-.5-1-.5-1.9-.2-2.7.2-.5.5-1 .8-1.4Z" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case "chevron":
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "location":
      return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "bolt":
      return <svg {...common}><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" /></svg>;
    case "drop":
      return <svg {...common}><path d="M12 2S5 9 5 15a7 7 0 0 0 14 0c0-6-7-13-7-13Z" /><path d="M9 16a3 3 0 0 0 3 3" /></svg>;
    case "tools":
      return <svg {...common}><path d="m14 7 3-3 3 3-3 3" /><path d="m4 20 9-9" /><path d="m3 3 5 2 2 5-2 2-5-5V3Z" /><path d="m14 14 6 6" /></svg>;
    case "wrench":
      return <svg {...common}><path d="M14 6a5 5 0 0 0-7 6L2 17l5 5 5-5a5 5 0 0 0 6-7l-3 3-3-1-1-3 3-3Z" /></svg>;
    case "cable":
      return <svg {...common}><path d="M7 2v6M11 2v6" /><path d="M5 8h8v2a4 4 0 0 1-4 4v0a4 4 0 0 0-4 4v4" /><path d="M17 14h4v4h-4z" /></svg>;
    case "pipe":
      return <svg {...common}><path d="M4 3v7a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v3" /><path d="M2 3h4M18 21h4" /><path d="M8 11v6M16 11v6" /></svg>;
    case "drain":
      return <svg {...common}><path d="M4 6h16M7 10h10M9 14h6M11 18h2" /><path d="M5 3h14" /></svg>;
    case "tiles":
      return <svg {...common}><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" /></svg>;
    case "building":
      return <svg {...common}><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-5h6v5M8 10h1M12 10h1M16 10h1M8 13h1M16 13h1" /></svg>;
    case "paint":
      return <svg {...common}><path d="M14 4h5v5h-5z" /><path d="m14 9-9 9a2 2 0 0 0 3 3l9-9" /><path d="m5 12 7 7" /></svg>;
    case "light":
      return <svg {...common}><path d="M9 18h6M10 22h4" /><path d="M8.5 14.5A7 7 0 1 1 15.5 14.5C14.5 15.3 14 16 14 18h-4c0-2-.5-2.7-1.5-3.5Z" /><path d="M12 2V1M4 10H2M22 10h-2M5 3l1.5 1.5M19 3l-1.5 1.5" /></svg>;
  }
}
