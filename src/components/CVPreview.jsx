import "../styles/CVPreview.css";

export default function CVPreview({
  generalInfo,
  educationInfo,
  experienceInfo,
}) {
  return (
    <aside className="cv-preview">
      <div className="cv-document">
        <header className="cv-document-header">
          <h2>{generalInfo.name || "Your Name"}</h2>
          <p>
            {generalInfo.email || "email@example.com"} |{" "}
            {generalInfo.phone || "Phone Number"}
          </p>
        </header>

        <section>
          <h3>Education</h3>
          <p>
            <strong>{educationInfo.school || "School Name"}</strong>
          </p>
          <p>{educationInfo.studyTitle || "Title of Study"}</p>
          <p>{educationInfo.studyDate || "Date of Study"}</p>
        </section>

        <section>
          <h3>Experience</h3>
          <p>
            <strong>{experienceInfo.company || "Company Name"}</strong>
          </p>
          <p>{experienceInfo.position || "Position Title"}</p>
          <p>{experienceInfo.responsibilities || "Main responsibilities"}</p>
          <p>
            {experienceInfo.startDate || "Start Date"} -{" "}
            {experienceInfo.endDate || "End Date"}
          </p>
        </section>
      </div>
    </aside>
  );
}
