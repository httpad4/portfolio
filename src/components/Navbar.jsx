import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Navbar — top navigation bar.
 * Desktop: row of links. Mobile: hamburger that opens a drawer
 * which slides in from the right.
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
  const closeMenu = () => setOpen(false);

  // While the drawer is open: lock page scroll and close on Escape
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="navbar">
      <nav className="navbar-shell">
        {/* Brand / logo — edit your name or handle */}
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-brand-caret">&gt;</span>
          ada.net
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
          aria-controls="mobile-menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Backdrop shown behind the open drawer (mobile only) */}
      <div
        className={`mobile-backdrop${open ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer — slides in from the right */}
      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-menu-head">
          <button
            type="button"
            className="mobile-close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <span className="mobile-close-line" />
            <span className="mobile-close-line" />
          </button>
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `mobile-link${isActive ? " active" : ""}`
                }
                onClick={closeMenu}
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