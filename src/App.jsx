import "./App.css";
import GeneralInfo from "./components/GeneralInfo";
import EducationInfo from "./components/EducationInfo";
import ExperienceInfo from "./components/ExperienceInfo";
import CVPreview from "./components/CVPreview";

function App() {
  return (
    <main className="app-container">
      <header className="app-header">
        <h1>CV Application</h1>
        <p>Fill in your details and generate a simple professional CV.</p>
      </header>

      <div className="cv-layout">
        <section className="form-column">
          <GeneralInfo />
          <EducationInfo />
          <ExperienceInfo />
        </section>

        <CVPreview />
      </div>
    </main>
  );
}

export default App;
