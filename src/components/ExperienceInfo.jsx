import { useState } from "react";
import "../styles/ExperienceInfo.css";

export default function ExperienceInfo({ experienceInfo, setExperienceInfo }) {
  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;

    setExperienceInfo({
      ...experienceInfo,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  return (
    <div className="experience-section">
      <h2>Practical Experience</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={experienceInfo.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="position"
            placeholder="Position Title"
            value={experienceInfo.position}
            onChange={handleChange}
          />

          <textarea
            name="responsibilities"
            placeholder="Main Responsibilities"
            value={experienceInfo.responsibilities}
            onChange={handleChange}
          />

          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            value={experienceInfo.startDate}
            onChange={handleChange}
          />

          <input
            type="text"
            name="endDate"
            placeholder="End Date"
            value={experienceInfo.endDate}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="experience-preview">
          <p>
            <strong>Company:</strong> {experienceInfo.company}
          </p>
          <p>
            <strong>Position:</strong> {experienceInfo.position}
          </p>
          <p>
            <strong>Responsibilities:</strong> {experienceInfo.responsibilities}
          </p>
          <p>
            <strong>From:</strong> {experienceInfo.startDate}
          </p>
          <p>
            <strong>Until:</strong> {experienceInfo.endDate}
          </p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
