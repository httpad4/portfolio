/**
 * Projects — placeholder project grid.
 *
 * EDIT the `projects` array below.
 * Each project: { title, description, tags[], link? (optional) }
 */
const projects = [
  {
    title: "NetForge",
    link: "https://netforge-web-n3a6.onrender.com",
    description:
      "Interactive learning platform for computer networking (IP addressing, subnetting, protocols, routing, OSI model, and more). Features 9 modules with 50+ lessons and quizzes, JWT cookie auth with bcrypt hashing, per-user progress tracking, gamification (streaks and badges), a printable certificate, and an admin panel.",
    tags: [
      "Node.js",
      "Express",
      "SQLite",
      "JWT",
      "bcrypt",
      "JavaScript",
      "CSS",
    ],
  },
  {
    title: "Linux Web Server Deployment on AWS EC2",
    description:
      "Provisioned an Ubuntu EC2 instance with a security group for public HTTP access, configured Nginx to serve a static site, and deployed the project from GitHub via SSH/SCP.",
    tags: ["EC2", "Nginx", "SSH", "GitHub"],
  },
  {
    title: "CloudExplorer – Cloud Computing Learning Platform",
    description:
      "A responsive multi-page educational web app demonstrating cloud concepts and service models, with interactive HTML Canvas network and elastic scaling simulations plus a built-in quiz system.",
    tags: ["HTML", "JavaScript", "CSS"],
  },
  {
    title: "network-lab-sim",
    description:
      "A simulated multi-subnet network topology in GNS3 and Cisco Packet Tracer for practicing routing, switching, and subnetting.",
    tags: ["GNS3", "Packet Tracer", "Networking"],
  },
];

export default function Projects() {
  return (
    <div className="page">
      <h1 className="page-heading">Projects</h1>
      <p className="page-subtitle">ls ~/projects</p>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <h3 className="project-title">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="project-desc">{project.description}</p>
            <div className="project-row">
              <p className="section-title">stack</p>
              <div className="tag-row">
                {project.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}