/**
 * Skills — grouped skill list.
 *
 * EDIT the `categories` array below to change your skills.
 */
const categories = [
  {
    title: "Programming & Web",
    skills: ["C", "Python", "HTML", "CSS", "MySQL"],
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS (EC2, S3)", "Active Directory", "Linux", "Git"],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "VS Code",
      "VirtualBox",
      "GitHub",
      "Cisco Packet Tracer",
      "GNS3",
    ],
  },
];

export default function Skills() {
  return (
    <div className="page">
      <h1 className="page-heading">Skills</h1>
      <p className="page-subtitle">ls ~/skills</p>

      {categories.map((cat) => (
        <div className="section-block" key={cat.title}>
          <p className="section-title">{cat.title}</p>
          <div className="tag-row">
            {cat.skills.map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}