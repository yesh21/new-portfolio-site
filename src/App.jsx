import "./App.css";
import FadingPixels from "./components/threejs/Loader";
import ScrollAnimatedModel from "./components/threejs/ScrollAnimatedModel";
import ProjectCard from "./components/Projects";
import SystemInfo from "./components/BatteryIndicator";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ScrollSuggestion from "./components/ScrollSuggestion"

function App() {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(false), 500);
    return () => clearTimeout(timer); // Cleanup in case Parent unmounts early
  }, []);

  return (
    <>
      {isLoaded ? <></> : 
      <>
        <FadingPixels />
        <ScrollSuggestion/>
        <ScrollAnimatedModel />
        <SystemInfo />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <Footer />
      </>
      }

    </>
  );
}

export default App;
