import React from 'react';
import Swiper_Slider from './Swiper-slider';

const ProjectCard = () => {
  return (
    <div className="max-w-[1440px] h-full min-h-screen mx-auto px-4">
      <div className="flex flex-col md:flex-row border-t border-black/20 h-full justify-between">
        {/* Left image side */}
        <div className="md:w-1/2  md:h-screen relative">
        <div className='md:h-[50vh]'></div>
        <Swiper_Slider/>
          <div className="absolute bottom-2 left-2 text-white font-extrabold text-xs leading-none tracking-widest">
            TEXT
          </div>
          <div className="absolute bottom-2 right-2 text-[#3a6a4f] font-extrabold text-xs leading-none tracking-widest">
          TEXT
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-between p-6 relative">
          <div className="flex justify-between text-xs font-extrabold tracking-widest mb-2">
            {/* <div>© TEXT</div>
            <div>TEXT</div>
            <div>TEXT</div> */}
          </div>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold max-w-[400px]">
            HELLO WROLD
          </h1>
          <div className="mt-10 flex items-center space-x-2 text-md">
            <span>View project</span>
            <button
              aria-label="View project"
              className="bg-black text-white p-1 w-6 h-6 flex items-center justify-center"
            >
              <i className="fas fa-external-link-alt text-[10px]"></i>
            </button>
          </div>
          <div className="mt-10 space-y-6 text-xs max-w-[400px]">
            <div>
              <div className="font-extrabold uppercase tracking-widest text-black/80">
              Technology
              </div>
              <div className="text-black/40 font-semibold">Technology</div>
            </div>
            <div>
              <div className="font-extrabol text-md uppercase tracking-widest text-black/80">
              Technology
              </div>
              <div className="text-black/40 text-md font-semibold">
                React / Django / LLMs
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
