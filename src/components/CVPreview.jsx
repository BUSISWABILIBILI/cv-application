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
          <div className="cv-entry">
            <div>
              <p>
                <strong>{educationInfo.school || "School Name"}</strong>
              </p>
              <p>{educationInfo.studyTitle || "Title of Study"}</p>
            </div>
            <p className="cv-date">{educationInfo.studyDate || "Date of Study"}</p>
          </div>
        </section>

        <section>
          <h3>Experience</h3>
          <div className="cv-entry">
            <div>
              <p>
                <strong>{experienceInfo.company || "Company Name"}</strong>
              </p>
              <p>{experienceInfo.position || "Position Title"}</p>
            </div>
            <p className="cv-date">
              {experienceInfo.startDate || "Start Date"} -{" "}
              {experienceInfo.endDate || "End Date"}
            </p>
          </div>
          <p>{experienceInfo.responsibilities || "Main responsibilities"}</p>
        </section>
      </div>
    </aside>
  );
}
