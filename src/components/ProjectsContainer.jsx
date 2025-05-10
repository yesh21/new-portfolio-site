import ProjectCard from "./ProjectCard";
import { useEffect } from "react";

import p1img1 from "../assets/projects/docscope/screenshot_1.png";
import p1img2 from "../assets/projects/docscope/screenshot_2.png";
import p1img3 from "../assets/projects/docscope/screenshot_3.png";
import p1img4 from "../assets/projects/docscope/screenshot_4.png";
import p1img5 from "../assets/projects/docscope/screenshot_5.png";

import p2img1 from "../assets/projects/clothing_store/screenshot_1.png";
import p2img2 from "../assets/projects/clothing_store/screenshot_2.png";
import p2img3 from "../assets/projects/clothing_store/screenshot_3.png";
import p2img4 from "../assets/projects/clothing_store/screenshot_4.png";
import p2img5 from "../assets/projects/clothing_store/screenshot_5.png";

import p3img1 from "../assets/projects/chrome_extension_llmscope/demo.gif";
import p3img2 from "../assets/projects/chrome_extension_llmscope/extension-ui.gif";

import p4img1 from "../assets/projects/movie_booking_site/screenshot_1.png";
import p4img2 from "../assets/projects/movie_booking_site/screenshot_2.png";
import p4img3 from "../assets/projects/movie_booking_site/screenshot_3.png";
import p4img4 from "../assets/projects/movie_booking_site/screenshot_4.png";
import p4img5 from "../assets/projects/movie_booking_site/screenshot_5.png";

import p5img1 from "../assets/projects/old_portfolio/screenshot_1.png";
import p5img2 from "../assets/projects/old_portfolio/screenshot_2.png";
import p5img3 from "../assets/projects/old_portfolio/screenshot_3.png";
import p5img4 from "../assets/projects/old_portfolio/screenshot_4.png";
import p5img5 from "../assets/projects/old_portfolio/screenshot_5.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // Ensure SplitText is installed and imported

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const project_docscope = {
  images: [p1img1, p1img2, p1img3, p1img4, p1img5],
  name: "Docscope",
  description: "A brief description of the awesome project.",
  features: ["OpenLLMs", "Langchain", "RAG", "Streamlit"],
  github_link: "https://github.com/yesh21/DocScope",
  year: "2024",
};

const project_clothing_store = {
  images: [p2img1, p2img2, p2img3, p2img4, p2img5],
  name: "Clothing store",
  description: "A brief description of the awesome project.",
  features: ["Django", "Tailwind", "User-auth", "Payment-gateway"],
  github_link: "https://github.com/yesh21/clothing_store_django",
  year: "2025",
};

const project_chrome_extension_llmscope = {
  images: [p3img1, p3img2],
  name: "Chrome extension LLMscope",
  description: "A brief description of the awesome project.",
  features: ["OpenLLMs", "Langchain", "RAG", "Streamlit", "Fast-api"],
  github_link: "https://github.com/yesh21/chrome_extension_llmscope",
  year: "2024",
};

const project_movie_booking_site = {
  images: [p4img1, p4img2, p4img3, p4img4, p4img5],
  name: "Movie booking site",
  description: "A brief description of the awesome project.",
  features: ["Flask", "User-login", "Email-auth", "Booking"],
  github_link: "https://github.com/yesh21/MovieBookingSystem",
  year: "2020",
};

const project_old_portfolio = {
  images: [p5img1, p5img2, p5img3, p5img4, p5img5],
  name: "Old portfolio",
  description: "A brief description of the awesome project.",
  features: ["Personal-site", "Responsive", "GSAP.js"],
  github_link: "https://github.com/yesh21/yesh21.github.io",
  year: "2022",
};

const ProjectsContainer = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".parallax-background");
    const scrollContainer = document.querySelector(".parallax-container");
    const splitTexts = [];
    const animations = [];
    const triggers = [];

    let scrollTween = null;

    if (sections.length && scrollContainer) {
      // Main horizontal scroll animation
      scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          id: "horizontalScroll",
          trigger: scrollContainer,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + 1.2 * sections.length * scrollContainer.offsetWidth,
        },
      });
      triggers.push(ScrollTrigger.getById("horizontalScroll"));

      // Animate each h2 in the panels with SplitText
      sections.forEach((panel, i) => {
        const split = new SplitText(panel.querySelectorAll(".splitgsap"), {
          type: "lines, chars",
        });
        splitTexts.push(split);

        const animation = gsap.fromTo(
          split.chars,
          { xPercent: -50 },
          {
            xPercent: 50,
            stagger: 0.04,
            duration: 0.5,
            ease: "power4",
            scrollTrigger: {
              trigger: panel,
              id: `panelTrigger-${i}`,
              containerAnimation: scrollTween,
              start: "left center",
              toggleActions: "play reverse play reverse",
            },
          }
        );
        animations.push(animation);
        triggers.push(ScrollTrigger.getById(`panelTrigger-${i}`));
      });
    }
    // console.log(ScrollTrigger.getAll())
    // Cleanup
    return () => {
      // Kill all triggers
      triggers.forEach(trigger => {
        if (trigger && typeof trigger.kill === "function") trigger.kill();
      });

      // Kill all animations
      animations.forEach(anim => {
        if (anim && typeof anim.kill === "function") anim.kill();
      });

      // Revert SplitText
      splitTexts.forEach(split => {
        if (split && typeof split.revert === "function") split.revert();
      });

      // Kill scrollTween if exists
      if (scrollTween && typeof scrollTween.kill === "function") scrollTween.kill();

      // Optionally, refresh all ScrollTriggers
      ScrollTrigger.refresh();
    };
  }, []);



  return (
    <>
      <div id="projects" className="parallax-container w-screen h-screen flex items-center justify-start overflow-hidden z-2">
        <ProjectCard {...project_docscope} />
        <ProjectCard {...project_clothing_store} />
        <ProjectCard {...project_chrome_extension_llmscope} />
        <ProjectCard {...project_movie_booking_site} />
        <ProjectCard {...project_old_portfolio} />
      </div>
    </>
  );
};

export default ProjectsContainer;
