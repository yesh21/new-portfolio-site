import './App.css'
import FadingPixels from './components/threejs/Loader'
import InteractiveDots from './components/threejs/InteractiveDots'
import ScrollAnimatedModel from './components/threejs/ScrollAnimatedModel'
import ProjectCard from './components/Projects'

function App() {

  return (
    <>
    <canvas className='w-full h-screen fixed z-111' id="retrocomputer-canvas"></canvas>
    <canvas className='w-full h-screen fixed z-111' id="loader-canvas"></canvas>
    <ScrollAnimatedModel/>
      <FadingPixels/>
      {/* <InteractiveDots/> */}
      <ProjectCard/>
      <ProjectCard/>
      <ProjectCard/>
      <ProjectCard/>
      <ProjectCard/>
      <ProjectCard/>

    </>
  )
}

export default App
