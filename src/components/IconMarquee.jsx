import { FaAws } from "react-icons/fa";
import { SiCisco, SiGit, SiUbuntu, SiVirtualbox } from "react-icons/si";

/**
 * Custom inline SVG for GNS3 (no library icon exists).
 * A simple network-topology glyph (nodes + links).
 */
function Gns3Icon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="5" r="2.6" />
      <line x1="6.2" y1="6.8" x2="10" y2="10.4" />
      <circle cx="20" cy="5" r="2.6" />
      <line x1="17.8" y1="6.8" x2="14" y2="10.4" />
      <circle cx="4" cy="19" r="2.6" />
      <line x1="6.2" y1="17.2" x2="10" y2="13.6" />
      <circle cx="20" cy="19" r="2.6" />
      <line x1="17.8" y1="17.2" x2="14" y2="13.6" />
    </svg>
  );
}

/**
 * IconMarquee — infinite, right-to-left auto-scrolling row of tool icons.
 * Pauses on hover (desktop). Respects reduced-motion preferences.
 *
 * EDIT the `tools` array below to add/remove tools.
 */
const tools = [
  { label: "VirtualBox", icon: <SiVirtualbox /> },
  { label: "AWS", icon: <FaAws /> },
  { label: "Ubuntu", icon: <SiUbuntu /> },
  { label: "GNS3", icon: <Gns3Icon /> },
  { label: "Cisco Packet Tracer", icon: <SiCisco /> },
  { label: "Git", icon: <SiGit /> },
];

export default function IconMarquee() {
  // Duplicate the list so the -50% translate loops seamlessly
  const items = [...tools, ...tools];

  return (
    <div
      className="icon-marquee"
      role="img"
      aria-label={`Tools I use: ${tools.map((t) => t.label).join(", ")}`}
    >
      <div className="icon-marquee-track">
        {items.map((tool, i) => (
          <div
            className="marquee-item"
            key={`${tool.label}-${i}`}
            // hide the duplicate copy from screen readers
            aria-hidden={i >= tools.length}
          >
            <span className="marquee-icon">{tool.icon}</span>
            <span className="marquee-label">{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}