import "../styles/CVPreview.css";

export default function CVPreview({
  generalInfo,
  summaryInfo,
  skillsInfo,
  educationInfo,
  experienceInfo,
}) {
  const skillItems = skillsInfo.skills
    .split(/[\n,]/)
    .map((skill) => skill.trim())
    .filter(Boolean);

  function handlePrint() {
    window.print();
  }

  return (
    <aside className="cv-preview">
      <div className="preview-heading">
        <div>
          <p>Live Preview</p>
          <span>A4 document view</span>
        </div>
        <button type="button" onClick={handlePrint}>
          Print CV
        </button>
      </div>

      <div className="cv-document">
        <header className="cv-document-header">
          <h2>{generalInfo.name || "Your Name"}</h2>
          <p>
            <span>{generalInfo.email || "email@example.com"}</span>
            <span>{generalInfo.phone || "Phone Number"}</span>
          </p>
        </header>

        <section>
          <h3>Professional Summary</h3>
          <p>
            {summaryInfo.summary ||
              "A concise summary of your experience, strengths, and career focus."}
          </p>
        </section>

        <section>
          <h3>Skills</h3>
          <ul className="cv-skills">
            {(skillItems.length > 0
              ? skillItems
              : ["Core skill", "Technical skill", "Professional skill"]
            ).map((skill, index) => (
              <li key={`${skill}-${index}`}>{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Education</h3>
          {educationInfo.map((education, index) => (
            <div className="cv-entry" key={education.id}>
              <div>
                <p>
                  <strong>{education.school || `School Name ${index + 1}`}</strong>
                </p>
                <p>{education.studyTitle || "Title of Study"}</p>
              </div>
              <p className="cv-date">
                {education.studyDate || "Date of Study"}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h3>Experience</h3>
          {experienceInfo.map((experience, index) => (
            <div className="cv-preview-entry" key={experience.id}>
              <div className="cv-entry">
                <div>
                  <p>
                    <strong>
                      {experience.company || `Company Name ${index + 1}`}
                    </strong>
                  </p>
                  <p>{experience.position || "Position Title"}</p>
                </div>
                <p className="cv-date">
                  {experience.startDate || "Start Date"} -{" "}
                  {experience.endDate || "End Date"}
                </p>
              </div>
              <p>{experience.responsibilities || "Main responsibilities"}</p>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
}
