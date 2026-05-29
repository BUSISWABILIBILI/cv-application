import { useState } from "react";

export default function EducationInfo({ educationInfo, setEducationInfo }) {
  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;

    setEducationInfo({
      ...educationInfo,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  return (
    <div className="education-section">
      <div className="section-heading">
        <div>
          <span>02</span>
          <h2>Educational Experience</h2>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            School name
            <input
              type="text"
              name="school"
              placeholder="University of Cape Town"
              value={educationInfo.school}
              onChange={handleChange}
            />
          </label>

          <label>
            Title of study
            <input
              type="text"
              name="studyTitle"
              placeholder="BSc Computer Science"
              value={educationInfo.studyTitle}
              onChange={handleChange}
            />
          </label>

          <label>
            Date of study
            <input
              type="text"
              name="studyDate"
              placeholder="2021 - 2024"
              value={educationInfo.studyDate}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="education-preview">
          <p>
            <strong>School:</strong> {educationInfo.school}
          </p>
          <p>
            <strong>Study:</strong> {educationInfo.studyTitle}
          </p>
          <p>
            <strong>Date:</strong> {educationInfo.studyDate}
          </p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
