import logo from "../assets/logo.jpg"
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Footer = () => {

  useEffect(() => {
    // Create the animation and store the ScrollTrigger instance
    const animation = gsap.fromTo(
      "#footer",
      { yPercent: -50,  },
      {
        yPercent: 0,
        xPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#footer",
          start: "top center",
          end: "top top",
          scrub: true,
          //markers: true,
        },
      }
    );
  
    // Cleanup function to kill only this ScrollTrigger instance
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
    };
  }, []);
  
  return (
    <>
      <footer id="footer" className="bg-[#18181a] text-[#f9f6e8] relative flex flex-col justify-around -z-1 min-h-[93svh]">
        <div className="flex flex-col md:flex-row justify-around p-4 border-b border-zinc-700 mb-10">
          <div className="flex justify-between items-center font-bold text-3xl py-4">
            Yaswanth Pulavarthi
          </div>
          <div className="flex space-x-2 max-w-full">
            <a className="flex items-center space-x-1" href="https://www.linkedin.com/in/yaswanth-pulavarthi-447796195/"  target="_blank">
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a className="flex items-center space-x-1" href="https://github.com/yesh21/" target="_blank">
              <i className="fab fa-github"></i>
              <span>Github</span>
            </a>
            <a className="flex items-center space-x-1" href="#">
              <i className="fab fa-twitter"></i>
              <span>(X) Twitter</span>
            </a>
          </div>
        </div>

        <main className="flex flex-col md:flex-row justify-center md:justify-evenly items-center w-full">
          <nav className="flex flex-col space-y-6 text-3xl font-medium tracking-wide items-center">
            <a className="hover:underline" href="https://github.com/yesh21/">
              Projects
            </a>
            <a className="hover:underline" href="#">
              About
            </a>
            <div className="mt-auto w-28">
              <img
                alt="image"
                className="w-28 h-28 object-contain rounded-full"
                src={logo}
              />
            </div>
          </nav>
          <section className="flex flex-col justify-around md:h-96 p-8 text-base leading-relaxed tracking-wide">
            <div className="max-w-xl">
              <p className="mb-6">Do you have any project ideas in your mind?</p>
              <p className="mb-6">
                Let’s connect.
                <a className="underline" href="mailto:example@domain.com">
                  yaswanth@gmail.com
                </a>
              </p>
            </div>
            <form className="max-w-xl flex flex-col space-y-4">
              <label className="flex items-center space-x-2 text-xs font-semibold tracking-widest">
                <div className="w-3 h-3 rounded-full bg-[#f9f6e8]"></div>
                <span>STAY IN TOUCH</span>
              </label>
              <div className="flex items-center border-b border-[#f9f6e8]">
                <input
                  className="bg-transparent flex-grow text-[#f9f6e8] placeholder-[#f9f6e8] text-base font-normal outline-none py-1"
                  placeholder="Email address"
                  type="email"
                />
                <button
                  aria-label="Submit email"
                  className="text-[#f9f6e8] text-2xl pl-4"
                  type="submit"
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </section>
        </main>
        <div className="py-2 text-center">
          <p className="text-gray-400 text-xs">
            © Copyright 2025 Make in India. All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
