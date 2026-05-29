import { useState } from "react";
import "./App.css";
import GeneralInfo from "./components/GeneralInfo";
import EducationInfo from "./components/EducationInfo";
import ExperienceInfo from "./components/ExperienceInfo";
import CVPreview from "./components/CVPreview";

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [educationInfo, setEducationInfo] = useState({
    school: "",
    studyTitle: "",
    studyDate: "",
  });

  const [experienceInfo, setExperienceInfo] = useState({
    company: "",
    position: "",
    responsibilities: "",
    startDate: "",
    endDate: "",
  });

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">CV builder</p>
          <h1>Build a clean professional CV</h1>
        </div>
        <p>
          Fill in the editor and review the live document preview as you work.
        </p>
      </header>

      <div className="cv-layout">
        <section className="form-column">
          <div className="column-header">
            <p>Editor</p>
            <span>Update each section, then submit it to lock the details.</span>
          </div>

          <GeneralInfo
            generalInfo={generalInfo}
            setGeneralInfo={setGeneralInfo}
          />

          <EducationInfo
            educationInfo={educationInfo}
            setEducationInfo={setEducationInfo}
          />

          <ExperienceInfo
            experienceInfo={experienceInfo}
            setExperienceInfo={setExperienceInfo}
          />
        </section>

        <CVPreview
          generalInfo={generalInfo}
          educationInfo={educationInfo}
          experienceInfo={experienceInfo}
        />
      </div>
    </main>
  );
}

export default App;
