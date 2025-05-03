import React from 'react';
import Swiper_Slider from './Swiper-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';


const ProjectCard = ({ images, name, features, links, year }) => {
  return (
    <div className="max-w-[1440px] w-full h-screen mx-auto px-4 parallax-slide backdrop-blur-[45px]">
      <div className="flex flex-col md:flex-row border-t-2 border-black/60 min-h-screen justify-center md:items-center lg:items-center parallax-background">
        {/* Left image side */}
        <div className="md:w-1/2  md:h-full relative">
        {/* <div className='md:h-[50vh] h-[25vh] sm:h-[25vh]'></div> */}
        <Swiper_Slider images={images}/>
          <div className="absolute bottom-2 left-2 text-white font-extrabold text-xs leading-none tracking-widest">
          {year}
          </div>
          <div className="absolute bottom-2 right-2 text-[#3a6a4f] font-extrabold text-xs leading-none tracking-widest">
          {year}
          </div>
        </div>
        <div className="md:w-1/2">
        <div className="flex flex-col justify-center h-full p-6 relative">

          <h1 className="text-[2.5rem] uppercase leading-[1.1] font-bold max-w-[400px]">
            {name}
          </h1>
          <div className="mt-10 flex items-center space-x-2 text-md">
            <span>View project</span>
            <button
              aria-label="View project"
              className="flex items-center justify-center"
            >
              <FontAwesomeIcon className="text-2xl" icon={faSquareArrowUpRight} />
            </button>
          </div>
          <div className="mt-10 space-y-6 text-xs max-w-[400px]">
            <div>
              <div className="font-semibold uppercase tracking-widest text-black/80">
              DESCRIPTION
              </div>
              <div className="text-black/40 font-semibold">Description</div>
            </div>
            <div>
              <div className="font-extrabold text-md uppercase tracking-widest text-black/80">
              Features
              </div>
              <div className="text-black/60 text-md font-semibold">
              {features.map((items) => (
                items + "  "
              ))}

              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
