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
        <h1>CV Application</h1>
        <p>Fill in your details and generate a simple professional CV.</p>
      </header>

      <div className="cv-layout">
        <section className="form-column">
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
