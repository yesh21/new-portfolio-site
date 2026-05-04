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
import roomModelGLB from "./assets/models/sci-fi_computer_room.glb?url";
import ScrollReveal from "./components/SticksReveal";
import MatterWords from "./components/MatterJSwords";
import Header from "./components/Header";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const preloadAssets = (assetList) =>
  Promise.all(assetList.map((src) => preloadImage(src)));

//assets = []

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [preLoadedModel, setPreLoadedModel] = useState(null);

  useEffect(() => {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager);

    loader.load(roomModelGLB, (gltf) => {
      setPreLoadedModel(gltf);
    }, undefined, (error) => {
      console.error("Error pre-loading GLB:", error);
      setIsLoaded(true); // Show site anyway on error
    });

    manager.onLoad = () => {
      setIsLoaded(true);
    };
  }, []);

  return (
    <>
      {isLoaded ? (
        <>
          {loaded && <FadingPixels />}
          <Header />
          <ScrollSuggestion />
          <ScrollAnimatedModel model={preLoadedModel} />
          <SystemInfo />
          <MatterWords />
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
