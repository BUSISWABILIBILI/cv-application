import { useState } from "react";

export default function SkillsInfo({ skillsInfo, setSkillsInfo }) {
  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;

    setSkillsInfo({
      ...skillsInfo,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  return (
    <div className="skills-section">
      <div className="section-heading">
        <div>
          <span>03</span>
          <h2>Skills</h2>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Skills
            <textarea
              name="skills"
              placeholder="React, JavaScript, CSS, Git, Testing"
              value={skillsInfo.skills}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="skills-preview">
          <p>
            <strong>Skills:</strong> {skillsInfo.skills}
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
