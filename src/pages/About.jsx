/**
 * About — short bio page.
 *
 * EDIT the `bio` strings (or the whole `paragraphs` array) to change your bio.
 */
const paragraphs = [
  "I am a Computer Engineering student with a strong interest in the space between software and infrastructure — programming, cloud computing, networking, and generative AI.",
  "I enjoy building things in C and Python, working inside Linux environments, and designing networks down to the packet level with tools like GNS3 and Cisco Packet Tracer.",
  "Right now I'm focused on growing my skills in cloud architecture on AWS and writing clean, maintainable code that solves real problems.",
];

export default function About() {
  return (
    <div className="page">
      <h1 className="page-heading">About</h1>
      <p className="page-subtitle">who is arjay?</p>

      <div className="section-block">
        {paragraphs.map((p, i) => (
          <p className="about-paragraph" key={i}>
            {p}
          </p>
        ))}
      </div>

      <div className="section-block">
        <p className="section-title">Interests</p>
        <div className="tag-row">
          {/* EDIT this list to change your interests */}
          {["Programming", "Cloud Infrastructure", "Networking", "Linux", "Generative AI"].map(
            (t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}