import "./App.css";
import FadingPixels from "./components/threejs/Loader";
import InteractiveDots from "./components/threejs/InteractiveDots";
import ScrollAnimatedModel from "./components/threejs/ScrollAnimatedModel";
import ProjectCard from "./components/Projects";
import SystemInfo from "./components/BatteryIndicator";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import videoFile from "./assets/3130284-hd_1280_720_30fps.mp4";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer); // Cleanup in case Parent unmounts early
  }, []);

  return (
    <>
      {showLoader && <FadingPixels />}
      <ScrollAnimatedModel />
      <SystemInfo />
      <video id="video" src={videoFile} muted loop autoPlay playsInline
        style={{ display: "none" }}
      ></video>
      {/* <InteractiveDots/> */}
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <Footer />
    </>
  );
}

export default App;
