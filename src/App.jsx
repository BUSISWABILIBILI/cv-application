import "./App.css";
import GeneralInfo from "./components/GeneralInfo";
import EducationInfo from "./components/EducationInfo";
import ExperienceInfo from "./components/ExperienceInfo";

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

        <aside className="tips-column">
          <h2>CV Tips</h2>
          <p>Keep your CV short, clear, and professional.</p>
          <p>Use action words when describing responsibilities.</p>
          <p>Double-check your email and phone number.</p>
        </aside>
      </div>
    </main>
  );
}

export default App;
