import { useState } from "react";

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
      <div className="section-heading">
        <div>
          <span>03</span>
          <h2>Practical Experience</h2>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Company name
            <input
              type="text"
              name="company"
              placeholder="Acme Studio"
              value={experienceInfo.company}
              onChange={handleChange}
            />
          </label>

          <label>
            Position title
            <input
              type="text"
              name="position"
              placeholder="Frontend Developer"
              value={experienceInfo.position}
              onChange={handleChange}
            />
          </label>

          <label>
            Main responsibilities
            <textarea
              name="responsibilities"
              placeholder="Describe the role, impact, and tools used"
              value={experienceInfo.responsibilities}
              onChange={handleChange}
            />
          </label>

          <div className="date-row">
            <label>
              Start date
              <input
                type="text"
                name="startDate"
                placeholder="Jan 2023"
                value={experienceInfo.startDate}
                onChange={handleChange}
              />
            </label>

            <label>
              End date
              <input
                type="text"
                name="endDate"
                placeholder="Present"
                value={experienceInfo.endDate}
                onChange={handleChange}
              />
            </label>
          </div>

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
