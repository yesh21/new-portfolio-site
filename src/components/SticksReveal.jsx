import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const ScrollReveal = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".reveal-section",
        start: "top top",
        end: "+=1000",
        scrub: true,
        pin: true,
        //markers: true,
        onEnter: () => {
          document.body.style.backgroundColor = "#18181a"; // Dark gray/black
          document.body.style.color = "#ffffff";            // Light gray/white text
        },
          onLeave: () => {
            document.body.style.backgroundColor = "#f7f5e8"; // Light cream
            document.body.style.color = "#000000";  //"#4a4a4a";           // Dark gray text for readability
          },
          onEnterBack: () => {
            document.body.style.backgroundColor = "#d4f1be"; // Light green
            document.body.style.color = "#2f4f2f";            // Dark green text
          },
          onLeaveBack: () => {
            document.body.style.backgroundColor = "#cce7ff";            // Soft light blue
            document.body.style.color = "#000"; //"#003366";            // Dark blue text
            document.body.style.backgroundColor = "#18181a"; // Dark gray/black
            document.body.style.color = "#ffffff";            // Light gray/white text
  
          },
                  
      },
    });
    const randomDelay = [0.6, 0.7, 0.9, 0.5 ,0.6, 0]

    // Animate each cover in sequence using their shared class
    gsap.utils.toArray(".cover").forEach((cover, i) => {
      tl.fromTo(
        cover,
        {  y: "0", },
        {
          y: "-100%",
          ease: "power2.inOut",
          duration: 1,
        },
        randomDelay[i]
      );
    });
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="reveal-section relative h-screen overflow-hidden">
      <div className="absolute inset-0 flex w-full h-screen items-center justify-center">
        <div className="md:w-1/2">
          <div class="ml-12 mx-auto text-2xl flex flex-wrap gap-2">
            <span class="text-gray-400">&lt;</span>
            <span class="text-sky-700">div</span>
            <span class="text-blue-400">className</span>
            <span class="">=</span>
            <span class="text-orange-400">"Name"</span>
            <span class="text-gray-400">&gt;</span>
          </div>
          <h1 className="ml-12 text-3xl text-center border-l">Yaswanth here</h1>
          <div class="ml-12 text-2xl flex flex-wrap gap-2">
            <span class="text-gray-400">&lt;</span>
            <span class="text-sky-700">/div</span>
            <span class="text-gray-400 border-r animate-pulse">&gt;</span>
          </div>
        </div>
      </div>

        <div
          className={`cover absolute top-0 h-full w-1/6 text-5xl text-white text-center bg-[#18181a] border border-[#f7f5e8] z-10 left-0 flex items-center justify-center`}
        >S</div>
                <div
          className={`cover absolute top-0 h-full w-1/6 text-5xl text-white text-center bg-[#18181a] border border-[#f7f5e8] z-10 left-1/6 flex items-center justify-center`}
        >C</div>
                <div
          className={`cover absolute top-0 h-full w-1/6 text-5xl text-white text-center bg-[#18181a] border border-[#f7f5e8] z-10 left-2/6 flex items-center justify-center`}
        >R</div>
                <div
          className={`cover absolute top-0 h-full w-1/6 text-5xl text-white text-center bg-[#18181a] border border-[#f7f5e8] z-10 left-3/6 flex items-center justify-center`}
        >O</div>
                <div
          className={`cover absolute top-0 h-full w-1/6 text-5xl text-white text-center bg-[#18181a] border border-[#f7f5e8] z-10 left-4/6 flex items-center justify-center`}
        >L</div>
                <div
          className={`cover absolute top-0 h-full w-1/6 text-5xl text-white text-center bg-[#18181a] border border-[#f7f5e8] z-10 left-5/6 flex items-center justify-center`}
        >L</div>
    </div>
  );
};

export default ScrollReveal;
