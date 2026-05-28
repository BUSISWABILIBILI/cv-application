import { useState } from "react";
import "../styles/GeneralInfo.css";

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
      <h2>General Information</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={generalInfo.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={generalInfo.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={generalInfo.phone}
            onChange={handleChange}
          />

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

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
