import { useState } from "react";

export default function ProjectsInfo({
  projectInfo,
  setProjectInfo,
  createProjectEntry,
}) {
  const [editingIds, setEditingIds] = useState(
    () => new Set(projectInfo.map((project) => project.id)),
  );

  function handleChange(id, e) {
    const { name, value } = e.target;

    setProjectInfo((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id ? { ...project, [name]: value } : project,
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
    const project = createProjectEntry();

    setProjectInfo((currentProjects) => [...currentProjects, project]);
    setEditingIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.add(project.id);
      return nextIds;
    });
  }

  function handleRemove(id) {
    setProjectInfo((currentProjects) => {
      if (currentProjects.length === 1) {
        return currentProjects;
      }

      return currentProjects.filter((project) => project.id !== id);
    });

    setEditingIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.delete(id);
      return nextIds;
    });
  }

  return (
    <div className="projects-section">
      <div className="section-heading">
        <div>
          <span>04</span>
          <h2>Projects</h2>
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
        {projectInfo.map((project, index) => {
          const isEditing = editingIds.has(project.id);
          const canRemove = projectInfo.length > 1;

          return (
            <div className="entry-group" key={project.id}>
              <div className="entry-group-header">
                <p>Project {index + 1}</p>
                {canRemove && (
                  <button
                    className="danger-button"
                    type="button"
                    onClick={() => handleRemove(project.id)}
                  >
                    Remove
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={(e) => handleSubmit(project.id, e)}>
                  <label>
                    Project name
                    <input
                      type="text"
                      name="name"
                      placeholder="Portfolio Website"
                      value={project.name}
                      onChange={(e) => handleChange(project.id, e)}
                    />
                  </label>

                  <label>
                    Technologies
                    <input
                      type="text"
                      name="technologies"
                      placeholder="React, CSS, Vite"
                      value={project.technologies}
                      onChange={(e) => handleChange(project.id, e)}
                    />
                  </label>

                  <label>
                    Project link
                    <input
                      type="text"
                      name="link"
                      placeholder="https://github.com/username/project"
                      value={project.link}
                      onChange={(e) => handleChange(project.id, e)}
                    />
                  </label>

                  <label>
                    Description
                    <textarea
                      name="description"
                      placeholder="Describe what the project does and the problem it solves."
                      value={project.description}
                      onChange={(e) => handleChange(project.id, e)}
                    />
                  </label>

                  <button type="submit">Submit</button>
                </form>
              ) : (
                <div className="project-preview">
                  <p>
                    <strong>Project:</strong> {project.name}
                  </p>
                  <p>
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                  <p>
                    <strong>Link:</strong> {project.link}
                  </p>
                  <p>
                    <strong>Description:</strong> {project.description}
                  </p>

                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => handleEdit(project.id)}
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
