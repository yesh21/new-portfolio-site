import "./App.css";
import FadingPixels from "./components/threejs/Loader";
import InteractiveDots from "./components/threejs/InteractiveDots";
import ScrollAnimatedModel from "./components/threejs/ScrollAnimatedModel";
import ProjectCard from "./components/Projects";
import SystemInfo from "./components/BatteryIndicator";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ScrollSuggestion from "./components/ScrollSuggestion"

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer); // Cleanup in case Parent unmounts early
  }, []);

  return (
    <>
      {showLoader && <FadingPixels />}
      <ScrollSuggestion/>
      <ScrollAnimatedModel />
      <SystemInfo />
      {/* <InteractiveDots/> */}
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <Footer />
    </>
  );
}

export default App;
