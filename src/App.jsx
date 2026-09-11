import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

/** GitHub profile — edit if needed. */
const GITHUB = "https://github.com/httpad4";

/** LinkedIn profile — edit if needed. */
const LINKEDIN = "https://www.linkedin.com/in/arjay-de-los-angeles-2ba1793b7";

/** Tools used to build this site (shown in the footer). */
const STACK = ["HTML", "CSS", "JavaScript", "React", "Vite"];

/**
 * App — layout shell + all routes.
 * (Router is configured in main.jsx with HashRouter so the site
 *  works on GitHub Pages without server rewrites.)
 */
export default function App() {
  /** Smooth-scroll back to the top of the page. */
  const backToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <Navbar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

          {/* Anything else → home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p className="footer-copyright">© {new Date().getFullYear()} Made by ARJAY DA</p>

        <p className="footer-tools">
          Built with {STACK.join(", ")}
        </p>

        <div className="footer-links">
          <a
            className="footer-link"
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="footer-pipe">|</span>
          <a
            className="footer-link"
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span className="footer-pipe">|</span>
          <a className="footer-link" href="#top" onClick={backToTop}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}