import { useState } from "react";

export default function ExperienceInfo({
  experienceInfo,
  setExperienceInfo,
  createExperienceEntry,
}) {
  const [editingIds, setEditingIds] = useState(
    () => new Set(experienceInfo.map((experience) => experience.id)),
  );

  function handleChange(id, e) {
    const { name, value } = e.target;

    setExperienceInfo((currentExperience) =>
      currentExperience.map((experience) =>
        experience.id === id ? { ...experience, [name]: value } : experience,
      ),
    );
  }

  function handleSubmit(id, e) {
    e.preventDefault();

    setEditingIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.delete(id);
      return nextIds;
    });
  }

  function handleEdit(id) {
    setEditingIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.add(id);
      return nextIds;
    });
  }

  function handleAdd() {
    const experience = createExperienceEntry();

    setExperienceInfo((currentExperience) => [
      ...currentExperience,
      experience,
    ]);
    setEditingIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.add(experience.id);
      return nextIds;
    });
  }

  function handleRemove(id) {
    setExperienceInfo((currentExperience) => {
      if (currentExperience.length === 1) {
        return currentExperience;
      }

      return currentExperience.filter((experience) => experience.id !== id);
    });

    setEditingIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.delete(id);
      return nextIds;
    });
  }

  return (
    <div className="experience-section">
      <div className="section-heading">
        <div>
          <span>05</span>
          <h2>Practical Experience</h2>
        </div>
        <button
          className="add-entry-button"
          type="button"
          onClick={handleAdd}
        >
          + Add
        </button>
      </div>

      <div className="entry-list">
        {experienceInfo.map((experience, index) => {
          const isEditing = editingIds.has(experience.id);
          const canRemove = experienceInfo.length > 1;

          return (
            <div className="entry-group" key={experience.id}>
              <div className="entry-group-header">
                <p>Experience {index + 1}</p>
                {canRemove && (
                  <button
                    className="danger-button"
                    type="button"
                    onClick={() => handleRemove(experience.id)}
                  >
                    Remove
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={(e) => handleSubmit(experience.id, e)}>
                  <label>
                    Company name
                    <input
                      type="text"
                      name="company"
                      placeholder="Acme Studio"
                      value={experience.company}
                      onChange={(e) => handleChange(experience.id, e)}
                    />
                  </label>

                  <label>
                    Position title
                    <input
                      type="text"
                      name="position"
                      placeholder="Frontend Developer"
                      value={experience.position}
                      onChange={(e) => handleChange(experience.id, e)}
                    />
                  </label>

                  <label>
                    Key responsibilities
                    <textarea
                      name="responsibilities"
                      placeholder={"Write each responsibility on a new line"}
                      value={experience.responsibilities}
                      onChange={(e) => handleChange(experience.id, e)}
                    />
                  </label>

                  <div className="date-row">
                    <label>
                      Start date
                      <input
                        type="text"
                        name="startDate"
                        placeholder="Jan 2023"
                        value={experience.startDate}
                        onChange={(e) => handleChange(experience.id, e)}
                      />
                    </label>

                    <label>
                      End date
                      <input
                        type="text"
                        name="endDate"
                        placeholder="Present"
                        value={experience.endDate}
                        onChange={(e) => handleChange(experience.id, e)}
                      />
                    </label>
                  </div>

                  <button type="submit">Submit</button>
                </form>
              ) : (
                <div className="experience-preview">
                  <p>
                    <strong>Company:</strong> {experience.company}
                  </p>
                  <p>
                    <strong>Position:</strong> {experience.position}
                  </p>
                  <p>
                    <strong>Responsibilities:</strong>{" "}
                    {experience.responsibilities}
                  </p>
                  <p>
                    <strong>From:</strong> {experience.startDate}
                  </p>
                  <p>
                    <strong>Until:</strong> {experience.endDate}
                  </p>

                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => handleEdit(experience.id)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
