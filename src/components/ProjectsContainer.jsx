import ProjectCard from "./Projects";
import { useEffect } from "react";

import p1img1 from '../assets/projects/docscope/screenshot_1.png';
import p1img2 from '../assets/projects/docscope/screenshot_2.png';
import p1img3 from '../assets/projects/docscope/screenshot_3.png';
import p1img4 from '../assets/projects/docscope/screenshot_4.png';
import p1img5 from '../assets/projects/docscope/screenshot_5.png';


import p2img1 from '../assets/projects/clothing_store/screenshot_1.png';
import p2img2 from '../assets/projects/clothing_store/screenshot_2.png';
import p2img3 from '../assets/projects/clothing_store/screenshot_3.png';
import p2img4 from '../assets/projects/clothing_store/screenshot_4.png';
import p2img5 from '../assets/projects/clothing_store/screenshot_5.png';

import p3img1 from '../assets/projects/chrome_extension_llmscope/demo.gif';
import p3img2 from '../assets/projects/chrome_extension_llmscope/extension-ui.gif';


import p4img1 from '../assets/projects/movie_booking_site/screenshot_1.png';
import p4img2 from '../assets/projects/movie_booking_site/screenshot_2.png';
import p4img3 from '../assets/projects/movie_booking_site/screenshot_3.png';
import p4img4 from '../assets/projects/movie_booking_site/screenshot_4.png';
import p4img5 from '../assets/projects/movie_booking_site/screenshot_5.png';

import p5img1 from '../assets/projects/old_portfolio/screenshot_1.png';
import p5img2 from '../assets/projects/old_portfolio/screenshot_2.png';
import p5img3 from '../assets/projects/old_portfolio/screenshot_3.png';
import p5img4 from '../assets/projects/old_portfolio/screenshot_4.png';
import p5img5 from '../assets/projects/old_portfolio/screenshot_5.png';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



const project_docscope = {
  images : [p1img1, p1img2, p1img3, p1img4, p1img5],
  name: "Docscope",
  description: "A brief description of the awesome project.",
  features: ["OpenLLMs", "Langchain", "RAG", "Streamlit"],
  links: {
    github: "https://github.com/yesh21/",
    live: "https://project-live-url.com"
  },
  year : "2024"
};

const project_clothing_store = {
  images : [p2img1, p2img2, p2img3, p2img4, p2img5],
  name: "Clothing store",
  description: "A brief description of the awesome project.",
  features: ["Django", "Tailwind", "User-auth", "Payment-gateway"],
  links: {
    github: "https://github.com/yesh21/",
    live: "https://project-live-url.com"
  },
  year : "2025"
};

const project_chrome_extension_llmscope = {
  images : [p3img1, p3img2],
  name: "Chrome extension LLMscope",
  description: "A brief description of the awesome project.",
  features: ["OpenLLMs", "Langchain", "RAG", "Streamlit", "Fast-api"],
  links: {
    github: "https://github.com/yesh21/",
    live: "https://project-live-url.com"
  },
  year : "2024"
};

const project_movie_booking_site = {
  images : [p4img1, p4img2, p4img3, p4img4, p4img5],
  name: "Movie booking site",
  description: "A brief description of the awesome project.",
  features: ["Flask", "User-login", "Email-auth", "Booking"],
  links: {
    github: "https://github.com/yesh21/",
    live: "https://project-live-url.com"
  },
  year : "2020"
};

const project_old_portfolio = {
  images : [p5img1, p5img2, p5img3, p5img4, p5img5],
  name: "Old portfolio",
  description: "A brief description of the awesome project.",
  features: ["Personal-site", "Responsive", "GSAP.js"],
  links: {
    github: "https://github.com/yesh21/",
    live: "https://project-live-url.com"
  },
  year : "2022"
};


const ProjectsContainer = () => {

    useEffect(() => {
        const container = document.getElementById('parallax-container');
        if (!container) return; // Safety check

        const Stl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#parallax-container',
                    pin: true,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    ease: 'power2.in',
                    pinSpacing:false
                    }
                })
                Stl.to('.parallax-slide', {
                    marginBottom: '-100vh',
                    stagger: .5,
                }, '<')
        
                // Cleanup
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }, []);
    
      

    return (     

    <div id="parallax-container" className="flex flex-col items-center overflow-x-hidden">
        <ProjectCard {...project_docscope} />
        <ProjectCard {...project_clothing_store} />
        <ProjectCard {...project_chrome_extension_llmscope} />
        <ProjectCard {...project_movie_booking_site} />
        <ProjectCard {...project_old_portfolio} />
        </div>
);
}


export default ProjectsContainer;