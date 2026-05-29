import { useEffect, useState } from "react";
import "./App.css";
import GeneralInfo from "./components/GeneralInfo";
import SummaryInfo from "./components/SummaryInfo";
import SkillsInfo from "./components/SkillsInfo";
import ProjectsInfo from "./components/ProjectsInfo";
import EducationInfo from "./components/EducationInfo";
import ExperienceInfo from "./components/ExperienceInfo";
import CVPreview from "./components/CVPreview";

const STORAGE_KEY = "cv-application-data";

function createId(prefix) {
  const randomId =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}-${randomId}`;
}

function createGeneralInfo() {
  return {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  };
}

function createSummaryInfo() {
  return {
    summary: "",
  };
}

function createSkillsInfo() {
  return {
    skills: "",
  };
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

function createProjectEntry() {
  return {
    id: createId("project"),
    name: "",
    technologies: "",
    link: "",
    description: "",
  };
}

function normalizeEducationInfo(educationInfo) {
  if (!Array.isArray(educationInfo) || educationInfo.length === 0) {
    return [createEducationEntry()];
  }

  return educationInfo.map((education) => ({
    ...createEducationEntry(),
    ...education,
    id: education.id || createId("education"),
  }));
}

function normalizeProjectInfo(projectInfo) {
  if (!Array.isArray(projectInfo) || projectInfo.length === 0) {
    return [createProjectEntry()];
  }

  return projectInfo.map((project) => ({
    ...createProjectEntry(),
    ...project,
    id: project.id || createId("project"),
  }));
}

function normalizeExperienceInfo(experienceInfo) {
  if (!Array.isArray(experienceInfo) || experienceInfo.length === 0) {
    return [createExperienceEntry()];
  }

  return experienceInfo.map((experience) => ({
    ...createExperienceEntry(),
    ...experience,
    id: experience.id || createId("experience"),
  }));
}

function createInitialCVData() {
  return {
    generalInfo: createGeneralInfo(),
    summaryInfo: createSummaryInfo(),
    skillsInfo: createSkillsInfo(),
    projectInfo: [createProjectEntry()],
    educationInfo: [createEducationEntry()],
    experienceInfo: [createExperienceEntry()],
  };
}

function loadSavedCVData() {
  if (typeof window === "undefined") {
    return createInitialCVData();
  }

  try {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return createInitialCVData();
    }

    const parsedData = JSON.parse(savedData);

    return {
      generalInfo: {
        ...createGeneralInfo(),
        ...parsedData.generalInfo,
      },
      summaryInfo: {
        ...createSummaryInfo(),
        ...parsedData.summaryInfo,
      },
      skillsInfo: {
        ...createSkillsInfo(),
        ...parsedData.skillsInfo,
      },
      projectInfo: normalizeProjectInfo(parsedData.projectInfo),
      educationInfo: normalizeEducationInfo(parsedData.educationInfo),
      experienceInfo: normalizeExperienceInfo(parsedData.experienceInfo),
    };
  } catch {
    return createInitialCVData();
  }
}

function App() {
  const [initialCVData] = useState(loadSavedCVData);
  const [resetVersion, setResetVersion] = useState(0);
  const [generalInfo, setGeneralInfo] = useState(initialCVData.generalInfo);

  const [summaryInfo, setSummaryInfo] = useState(initialCVData.summaryInfo);

  const [skillsInfo, setSkillsInfo] = useState(initialCVData.skillsInfo);

  const [projectInfo, setProjectInfo] = useState(initialCVData.projectInfo);

  const [educationInfo, setEducationInfo] = useState(
    initialCVData.educationInfo,
  );

  const [experienceInfo, setExperienceInfo] = useState(
    initialCVData.experienceInfo,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const cvData = {
      generalInfo,
      summaryInfo,
      skillsInfo,
      projectInfo,
      educationInfo,
      experienceInfo,
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch {
      // Ignore storage failures so the editor still works in restricted browsers.
    }
  }, [
    generalInfo,
    summaryInfo,
    skillsInfo,
    projectInfo,
    educationInfo,
    experienceInfo,
  ]);

  function handleClearSavedData() {
    const emptyCVData = createInitialCVData();

    setGeneralInfo(emptyCVData.generalInfo);
    setSummaryInfo(emptyCVData.summaryInfo);
    setSkillsInfo(emptyCVData.skillsInfo);
    setProjectInfo(emptyCVData.projectInfo);
    setEducationInfo(emptyCVData.educationInfo);
    setExperienceInfo(emptyCVData.experienceInfo);
    setResetVersion((currentVersion) => currentVersion + 1);

    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage failures so reset still clears the in-memory form state.
      }
    }
  }

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
            <div>
              <p>Editor</p>
              <span>
                Update each section, then submit it to lock the details.
              </span>
            </div>
            <button type="button" onClick={handleClearSavedData}>
              Clear
            </button>
          </div>

          <GeneralInfo
            key={`general-${resetVersion}`}
            generalInfo={generalInfo}
            setGeneralInfo={setGeneralInfo}
          />

          <SummaryInfo
            key={`summary-${resetVersion}`}
            summaryInfo={summaryInfo}
            setSummaryInfo={setSummaryInfo}
          />

          <SkillsInfo
            key={`skills-${resetVersion}`}
            skillsInfo={skillsInfo}
            setSkillsInfo={setSkillsInfo}
          />

          <ProjectsInfo
            key={`projects-${resetVersion}`}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            createProjectEntry={createProjectEntry}
          />

          <EducationInfo
            key={`education-${resetVersion}`}
            educationInfo={educationInfo}
            setEducationInfo={setEducationInfo}
            createEducationEntry={createEducationEntry}
          />

          <ExperienceInfo
            key={`experience-${resetVersion}`}
            experienceInfo={experienceInfo}
            setExperienceInfo={setExperienceInfo}
            createExperienceEntry={createExperienceEntry}
          />
        </section>

        <CVPreview
          generalInfo={generalInfo}
          summaryInfo={summaryInfo}
          skillsInfo={skillsInfo}
          projectInfo={projectInfo}
          educationInfo={educationInfo}
          experienceInfo={experienceInfo}
        />
      </div>
    </main>
  );
}

export default App;
