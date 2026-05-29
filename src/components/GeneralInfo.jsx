import { useState } from "react";

export default function GeneralInfo({ generalInfo, setGeneralInfo }) {
  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;

    setGeneralInfo({
      ...generalInfo,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  return (
    <div className="general-section">
      <div className="section-heading">
        <div>
          <span>01</span>
          <h2>General Information</h2>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              type="text"
              name="name"
              placeholder="Jane Smith"
              value={generalInfo.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={generalInfo.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone number
            <input
              type="tel"
              name="phone"
              placeholder="+27 82 123 4567"
              value={generalInfo.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Location
            <input
              type="text"
              name="location"
              placeholder="Cape Town, South Africa"
              value={generalInfo.location}
              onChange={handleChange}
            />
          </label>

          <label>
            LinkedIn
            <input
              type="text"
              name="linkedin"
              placeholder="linkedin.com/in/janesmith"
              value={generalInfo.linkedin}
              onChange={handleChange}
            />
          </label>

          <label>
            GitHub
            <input
              type="text"
              name="github"
              placeholder="github.com/janesmith"
              value={generalInfo.github}
              onChange={handleChange}
            />
          </label>

          <label>
            Portfolio
            <input
              type="text"
              name="website"
              placeholder="janesmith.dev"
              value={generalInfo.website}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="general-preview">
          <p>
            <strong>Name:</strong> {generalInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {generalInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {generalInfo.phone}
          </p>
          <p>
            <strong>Location:</strong> {generalInfo.location}
          </p>
          <p>
            <strong>LinkedIn:</strong> {generalInfo.linkedin}
          </p>
          <p>
            <strong>GitHub:</strong> {generalInfo.github}
          </p>
          <p>
            <strong>Portfolio:</strong> {generalInfo.website}
          </p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
