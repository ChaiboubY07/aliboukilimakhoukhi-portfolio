function Svg({ size = 22, children }) {
  return (
    <svg
      className="ico"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* — savoir-faire list — */
export const IconCompass = (p) => (
  <Svg {...p}>
    <path d="M12 4.4 6.6 18.8" />
    <path d="M12 4.4l5.4 14.4" />
    <circle cx="12" cy="3.8" r="1.2" />
    <path d="M8.6 20.4h6.8" />
  </Svg>
);

export const IconHammer = (p) => (
  <Svg {...p}>
    <path d="M14.3 4.3 19.7 9.7 16.4 13 11 7.6z" />
    <path d="M12.9 11.5 4.8 19.6" />
  </Svg>
);

export const IconArch = (p) => (
  <Svg {...p}>
    <path d="M5.5 20.5V11a6.5 6.5 0 0 1 13 0v9.5" />
    <path d="M9.5 20.5V11a2.5 2.5 0 0 1 5 0v9.5" />
  </Svg>
);

export const IconBlocks = (p) => (
  <Svg {...p}>
    <rect x="4.2" y="13.2" width="7" height="6.5" />
    <rect x="12.8" y="13.2" width="7" height="6.5" />
    <rect x="8.5" y="5.7" width="7" height="6.5" />
  </Svg>
);

export const IconMagnifier = (p) => (
  <Svg {...p}>
    <circle cx="10.6" cy="10.6" r="6.1" />
    <path d="m15.2 15.2 4.6 4.6" />
  </Svg>
);

export const IconStar = (p) => (
  <Svg {...p}>
    <path d="M12 3.2c.7 5.1 2.9 7.3 8 8-5.1.7-7.3 2.9-8 8-.7-5.1-2.9-7.3-8-8 5.1-.7 7.3-2.9 8-8z" />
  </Svg>
);

/* — process steps — */
export const IconEye = (p) => (
  <Svg {...p}>
    <path d="M2.8 12S6.4 6.2 12 6.2 21.2 12 21.2 12 17.6 17.8 12 17.8 2.8 12 2.8 12z" />
    <circle cx="12" cy="12" r="2.7" />
  </Svg>
);

export const IconPencil = (p) => (
  <Svg {...p}>
    <path d="m4.5 19.5 1-3.8L16.2 5l2.8 2.8L8.3 18.5z" />
    <path d="m14.7 6.5 2.8 2.8" />
    <path d="m5.5 15.7 2.8 2.8" />
  </Svg>
);

export const IconFlask = (p) => (
  <Svg {...p}>
    <path d="M10 3.5v5.2L5 17a2.3 2.3 0 0 0 2 3.5h10a2.3 2.3 0 0 0 2-3.5l-5-8.3V3.5" />
    <path d="M8.4 3.5h7.2" />
    <path d="M7.6 14.4h8.8" />
  </Svg>
);

export const IconPlan = (p) => (
  <Svg {...p}>
    <rect x="4" y="4.5" width="16" height="15" />
    <path d="M4 10h16" />
    <path d="M11 10v9.5" />
  </Svg>
);

export const IconGem = (p) => (
  <Svg {...p}>
    <path d="M12 3.8 19.6 9 12 20.2 4.4 9z" />
    <path d="M4.4 9h15.2" />
    <path d="M12 3.8 9 9l3 11.2L15 9z" />
  </Svg>
);

/* — project info — */
export const IconCube = (p) => (
  <Svg {...p}>
    <path d="m12 3.2 7.8 4.4v8.8L12 20.8l-7.8-4.4V7.6z" />
    <path d="m4.2 7.6 7.8 4.4 7.8-4.4" />
    <path d="M12 12v8.8" />
  </Svg>
);

export const IconPin = (p) => (
  <Svg {...p}>
    <path d="M12 20.8s6.3-6 6.3-10.6a6.3 6.3 0 1 0-12.6 0C5.7 14.8 12 20.8 12 20.8z" />
    <circle cx="12" cy="10" r="2.4" />
  </Svg>
);
