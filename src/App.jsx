import { useState } from "react";
import "./App.css";
import GeneralInfo from "./components/GeneralInfo";
import SummaryInfo from "./components/SummaryInfo";
import SkillsInfo from "./components/SkillsInfo";
import EducationInfo from "./components/EducationInfo";
import ExperienceInfo from "./components/ExperienceInfo";
import CVPreview from "./components/CVPreview";

function createId(prefix) {
  const randomId =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}-${randomId}`;
}

function createEducationEntry() {
  return {
    id: createId("education"),
    school: "",
    studyTitle: "",
    studyDate: "",
  };
}

function createExperienceEntry() {
  return {
    id: createId("experience"),
    company: "",
    position: "",
    responsibilities: "",
    startDate: "",
    endDate: "",
  };
}

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [summaryInfo, setSummaryInfo] = useState({
    summary: "",
  });

  const [skillsInfo, setSkillsInfo] = useState({
    skills: "",
  });

  const [educationInfo, setEducationInfo] = useState(() => [
    createEducationEntry(),
  ]);

  const [experienceInfo, setExperienceInfo] = useState(() => [
    createExperienceEntry(),
  ]);

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

          <SummaryInfo
            summaryInfo={summaryInfo}
            setSummaryInfo={setSummaryInfo}
          />

          <SkillsInfo skillsInfo={skillsInfo} setSkillsInfo={setSkillsInfo} />

          <EducationInfo
            educationInfo={educationInfo}
            setEducationInfo={setEducationInfo}
            createEducationEntry={createEducationEntry}
          />

          <ExperienceInfo
            experienceInfo={experienceInfo}
            setExperienceInfo={setExperienceInfo}
            createExperienceEntry={createExperienceEntry}
          />
        </section>

        <CVPreview
          generalInfo={generalInfo}
          summaryInfo={summaryInfo}
          skillsInfo={skillsInfo}
          educationInfo={educationInfo}
          experienceInfo={experienceInfo}
        />
      </div>
    </main>
  );
}

export default App;
