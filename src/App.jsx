import "./App.css";
import FadingPixels from "./components/threejs/Loader";
import ScrollAnimatedModel from "./components/threejs/ScrollAnimatedModel";
import ProjectsContainer from "./components/ProjectsContainer";
import SystemInfo from "./components/BatteryIndicator";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ScrollSuggestion from "./components/ScrollSuggestion";
import Loader from "./components/Loader";
// import SwipePanels from "./components/horizontal-slide";
// import model from "./assets/models/sci-fi_computer_room.glb"
import ScrollReveal from "./components/SticksReveal";
import MatterWords from "./components/MatterJSwords";

const preloadAssets = (assetList) =>
  Promise.all(assetList.map((src) => preloadImage(src)));

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
      {isLoaded ? (
        <>
          {loaded && <FadingPixels />}
          <header class="fixed w-full z-50 backdrop-blur-xs">
            <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
              <div class="text-xl font-medium antialiased  mix-blend-difference italic">YP</div>
              <nav class="flex space-x-6">
                <a href="#about" class="text-gray-400 hover:text-blue-400">
                  About
                </a>
                <a href="#projects" class="text-gray-500 hover:text-blue-500">
                  Projects
                </a>
                <a href="#footer" class="text-gray-600 hover:text-blue-600">
                  Contact
                </a>
              </nav>
            </div>
          </header>

          <ScrollSuggestion />
          <ScrollAnimatedModel />
          <SystemInfo />
          <MatterWords/>
          <ScrollReveal />
          {/* <SwipePanels/> */}
          <ProjectsContainer />
          <Footer />
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
}

export default App;
