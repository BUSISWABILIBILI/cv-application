import "../styles/CVPreview.css";

export default function CVPreview() {
  return (
    <aside className="cv-preview">
      <div className="cv-preview-header">
        <h2>Your CV Preview</h2>
        <p>Your submitted information will appear in a CV-style layout.</p>
      </div>

      <div className="cv-preview-card">
        <h3>Preview Area</h3>
        <p>
          After we connect the state in the next step, your CV details will show
          here.
        </p>
      </div>
    </aside>
  );
}
