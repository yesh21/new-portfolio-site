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
          <header class="fixed w-full z-50 backdrop-blur-sm">
            <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
              <div class="text-xl font-medium mix-blend-difference">YP</div>
              <nav class="flex space-x-6">
                <a href="#about" class="text-gray-400 hover:text-blue-600">
                  About
                </a>
                <a href="#projects" class="text-gray-500 hover:text-blue-600">
                  Projects
                </a>
                <a href="#footer" class="text-gray-600 hover:text-blue-600">
                  Contact
                </a>
              </nav>
              {/* <div className="md:hidden relative inline-block text-left group pl-10">
              <button class="md:hidden text-2xl text-gray-700" id="menu-btn">
                &#9776;
              </button>

              <div className="absolute right-0 w-48 bg-white flex flex-col border rounded shadow-lg opacity-0 invisible group-focus:visible group-focus:opacity-100 group-hover:visible group-hover:opacity-100 transition-opacity">
              <a href="#about" class="text-gray-700 hover:text-blue-600">
                  About
                </a>
                <a href="#projects" class="text-gray-700 hover:text-blue-600">
                  Projects
                </a>
                <a href="#footer" class="text-gray-700 hover:text-blue-600">
                  Contact
                </a>
              </div> */}
            {/* </div> */}
            </div>
          </header>

          <ScrollSuggestion />
          <ScrollAnimatedModel />
          <SystemInfo />
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
