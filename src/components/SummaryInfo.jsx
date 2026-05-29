import { useState } from "react";

export default function SummaryInfo({ summaryInfo, setSummaryInfo }) {
  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;

    setSummaryInfo({
      ...summaryInfo,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  return (
    <div className="summary-section">
      <div className="section-heading">
        <div>
          <span>02</span>
          <h2>Professional Summary</h2>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Summary
            <textarea
              name="summary"
              placeholder="Write a concise overview of your experience, strengths, and career focus."
              value={summaryInfo.summary}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="summary-preview">
          <p>
            <strong>Summary:</strong> {summaryInfo.summary}
          </p>

          <button
            className="secondary-button"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
