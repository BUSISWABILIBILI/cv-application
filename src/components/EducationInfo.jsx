import { useState } from "react";
import "../styles/EducationInfo.css";

export default function EducationInfo() {
  const [isEditing, setIsEditing] = useState(true);

  const [educationInfo, setEducationInfo] = useState({
    school: "",
    studyTitle: "",
    studyDate: "",
  });

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
      <h2>Educational Experience</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="school"
            placeholder="School Name"
            value={educationInfo.school}
            onChange={handleChange}
          />

          <input
            type="text"
            name="studyTitle"
            placeholder="Title of Study"
            value={educationInfo.studyTitle}
            onChange={handleChange}
          />

          <input
            type="text"
            name="studyDate"
            placeholder="Date of Study"
            value={educationInfo.studyDate}
            onChange={handleChange}
          />

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
