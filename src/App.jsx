import "./App.css";
import GeneralInfo from "./components/GeneralInfo";
import EducationInfo from "./components/EducationInfo";

function App() {
  return (
    <div className="app-container">
      <h1>CV Application</h1>
      <GeneralInfo />
      <EducationInfo />
    </div>
  );
}

export default App;
