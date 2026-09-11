import { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Navbar — top navigation bar.
 * Desktop: row of links. Mobile: hamburger menu that toggles open.
 *
 * EDIT the `links` array below to add/remove navigation items.
 */
const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu after clicking a link
  const handleNav = () => setOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar-shell">
        {/* Brand / logo — edit your name or handle */}
        <NavLink to="/" className="navbar-brand" onClick={handleNav}>
          <span className="navbar-brand-caret">&gt;</span>
          arjay.net
        </NavLink>

        {/* Desktop links */}
        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `navbar-link${isActive ? " active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger toggle (mobile only) */}
        <button
          className={`hamburger${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `mobile-link${isActive ? " active" : ""}`
                }
                onClick={handleNav}
              >
                <span className="mobile-link-prefix">./</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}