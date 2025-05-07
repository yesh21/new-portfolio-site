import "./App.css";
import FadingPixels from "./components/threejs/Loader";
import ScrollAnimatedModel from "./components/threejs/ScrollAnimatedModel";
import ProjectsContainer from "./components/ProjectsContainer";
import SystemInfo from "./components/BatteryIndicator";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ScrollSuggestion from "./components/ScrollSuggestion"
import Loader from "./components/Loader";
// import SwipePanels from "./components/horizontal-slide";
// import model from "./assets/models/sci-fi_computer_room.glb"
import ScrollReveal from "./components/SticksReveal";

const preloadAssets = assetList =>
  Promise.all(assetList.map(src => preloadImage(src)));

//assets = []

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(true);

  // useEffect(() => {
  //   preloadAssets(assets).then(() => setLoaded(true));
  // }, [assets]);


  useEffect(() => {
 
    const timer = setTimeout(() => setIsLoaded(true), 1220);
    const timer2 = setTimeout(() => setLoaded(false), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    }; // Cleanup in case Parent unmounts early

  }, []);

  return (
    <>
      {isLoaded ? 
      <>
        {loaded && <FadingPixels/>}
        <ScrollSuggestion/>
        <ScrollAnimatedModel />
        <SystemInfo />
        <ScrollReveal />
        {/* <SwipePanels/> */}
        <ProjectsContainer />
        <Footer />
      </>
      : <><Loader /></>
      }

    </>
  );
}

export default App;
