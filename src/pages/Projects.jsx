/**
 * Projects — placeholder project grid.
 *
 * EDIT the `projects` array below.
 * Each project: { title, description, tags[], link? (optional) }
 */
const projects = [
  {
    title: "portfolio-site",
    description:
      "This portfolio — a clean, command-prompt-inspired single page app built with React, Vite, and CSS variables for theming.",
    tags: ["React", "Vite", "CSS"],
    link: "https://github.com/httpad4",
  },
  {
    title: "aws-infra-automation",
    description:
      "Infrastructure-as-code scripts for provisioning EC2 instances, S3 buckets, and security groups on AWS using Bash and the AWS CLI.",
    tags: ["AWS", "Bash", "Linux"],
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