import "../styles/CVPreview.css";

export default function CVPreview({
  generalInfo,
  educationInfo,
  experienceInfo,
}) {
  return (
    <aside className="cv-preview">
      <div className="preview-heading">
        <p>Live Preview</p>
        <span>A4 document view</span>
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
