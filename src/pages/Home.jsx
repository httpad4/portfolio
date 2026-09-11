import { useState } from "react";
import { Link } from "react-router-dom";
import IconMarquee from "../components/IconMarquee";

/**
 * Home — hero + tool icons marquee.
 *
 * EDIT the constants below to change your name/title/tagline
 * and the experience shown when "> whoami" is clicked.
 */
const NAME_LINE_1 = "ARJAY S."; // first line of the name (desktop: both lines join)
const NAME_LINE_2 = "DE LOS ANGELES"; // second line on mobile
const TITLE = "Bachelor of Science in Computer Engineering";
const TAGLINE =
  "Aspiring Computer Engineer focused on programming, cloud infrastructure, and networking.";

/* Shown when "> whoami" is clicked — edit this to change your
   internship / work experience. */
const EXPERIENCE = [
  {
    role: "IT Technical Support Engineer Intern",
    points: [
      "Resolved 80+ helpdesk tickets with fast turnaround (avg. under 2 hrs response time)",
      "Deployed 15+ workstations with zero setup errors",
      "Processed 20+ Active Directory access requests with 100% accuracy",
    ],
  },
  {
    role: "Freelance Academic Consultant",
    points: [
      "Completed 50+ research papers and technical documents, 90% delivered on time",
      "Handled research, data analysis, and technical writing across multiple clients",
      "Maintained fully original, plagiarism-free output on every project",
    ],
  },
];

export default function Home() {
  // Click "> whoami" to toggle between your details and your experience
  const [showExperience, setShowExperience] = useState(false);

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-main">
          <button
            type="button"
            className={`hero-prompt hero-toggle${showExperience ? " open" : ""}`}
            onClick={() => setShowExperience((v) => !v)}
            aria-expanded={showExperience}
            aria-controls="hero-content"
          >
            <span className="hero-toggle-caret">&gt;</span>
            whoami
          </button>

          {showExperience ? (
            <div id="hero-content" className="hero-content">
              {EXPERIENCE.map((job) => (
                <div className="experience-item" key={job.role}>
                  <h3 className="experience-role">{job.role}</h3>
                  <ul className="experience-list">
                    {job.points.map((p, i) => (
                      <li className="experience-point" key={i}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div id="hero-content" className="hero-content">
              <h1 className="hero-name">
              {NAME_LINE_1}
              <br className="hero-name-break" />
              {NAME_LINE_2}
            </h1>
              <h2 className="hero-title">{TITLE}</h2>
              <p className="hero-tagline">{TAGLINE}</p>
              <Link className="hero-cta" to="/contact">
                get in touch_
              </Link>
            </div>
          )}
        </div>

        {/* Portrait */}
        <div className="hero-photo">
          <img
            className="hero-photo-img"
            src={`${import.meta.env.BASE_URL}profile.jpg`}
            alt="Arjay S. De Los Angeles"
          />
        </div>
      </section>

      {/* Tool icons marquee pinned to the bottom of the homepage */}
      <IconMarquee />
    </div>
  );
}