import { useState } from "react";

export default function EducationInfo({
  educationInfo,
  setEducationInfo,
  createEducationEntry,
}) {
  const [editingIds, setEditingIds] = useState(
    () => new Set(educationInfo.map((education) => education.id)),
  );

  function handleChange(id, e) {
    const { name, value } = e.target;

    setEducationInfo((currentEducation) =>
      currentEducation.map((education) =>
        education.id === id ? { ...education, [name]: value } : education,
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
    const education = createEducationEntry();

    setEducationInfo((currentEducation) => [...currentEducation, education]);
    setEditingIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.add(education.id);
      return nextIds;
    });
  }

  function handleRemove(id) {
    setEducationInfo((currentEducation) => {
      if (currentEducation.length === 1) {
        return currentEducation;
      }

      return currentEducation.filter((education) => education.id !== id);
    });

    setEditingIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.delete(id);
      return nextIds;
    });
  }

  return (
    <div className="education-section">
      <div className="section-heading">
        <div>
          <span>05</span>
          <h2>Educational Experience</h2>
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
        {educationInfo.map((education, index) => {
          const isEditing = editingIds.has(education.id);
          const canRemove = educationInfo.length > 1;

          return (
            <div className="entry-group" key={education.id}>
              <div className="entry-group-header">
                <p>Education {index + 1}</p>
                {canRemove && (
                  <button
                    className="danger-button"
                    type="button"
                    onClick={() => handleRemove(education.id)}
                  >
                    Remove
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={(e) => handleSubmit(education.id, e)}>
                  <label>
                    School name
                    <input
                      type="text"
                      name="school"
                      placeholder="University of Cape Town"
                      value={education.school}
                      onChange={(e) => handleChange(education.id, e)}
                    />
                  </label>

                  <label>
                    Title of study
                    <input
                      type="text"
                      name="studyTitle"
                      placeholder="BSc Computer Science"
                      value={education.studyTitle}
                      onChange={(e) => handleChange(education.id, e)}
                    />
                  </label>

                  <label>
                    Date of study
                    <input
                      type="text"
                      name="studyDate"
                      placeholder="2021 - 2024"
                      value={education.studyDate}
                      onChange={(e) => handleChange(education.id, e)}
                    />
                  </label>

                  <button type="submit">Submit</button>
                </form>
              ) : (
                <div className="education-preview">
                  <p>
                    <strong>School:</strong> {education.school}
                  </p>
                  <p>
                    <strong>Study:</strong> {education.studyTitle}
                  </p>
                  <p>
                    <strong>Date:</strong> {education.studyDate}
                  </p>

                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => handleEdit(education.id)}
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
