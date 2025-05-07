import React from 'react';
import Swiper_Slider from './Swiper-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';


const ProjectCard = ({ images, name, description, features, github_link, year }) => {
  return (
    <div className="scroll-wrapper flex h-[100vh] w-screen backdrop-blur-[45px]">
      <div className="flex flex-col min-w-[100vw] px-4 py-12 h-full min-h-screen md:flex-row border-t-2 border-r-2 border-black/60 md:justify-center md:items-center lg:items-center parallax-background">
        {/* Left image side */}
        <div className="md:w-1/2 relative">
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
          <h1 className="text-[2.5rem] uppercase leading-[1.1] font-bold max-w-[400px] splitgsap">
            {name}
          </h1>

          <a className="mt-10 flex items-center space-x-2 text-md" href={github_link} target="_blank">
            <span className=''>View project</span>
            <div
              aria-label="View project"
              className="flex items-center justify-center"
            >
              <FontAwesomeIcon className="text-2xl" icon={faSquareArrowUpRight} />
            </div>
          </a>
          <div className="mt-10 space-y-6 text-xs max-w-[400px]">
            <div>
              <div className="font-semibold uppercase tracking-widest text-black/80 splitgsap">
              description
              </div>
              <div className="text-black/40 font-semibold splitgsap">{description}</div>
            </div>
            <div>
              <div className="font-extrabold text-md uppercase tracking-widest text-black/80">
              Features
              </div>
              <div className="text-black/60 text-md">
              <ul class="flex flex-wrap gap-2 text-xs text-black-600">
              {features.map((item, i) => (
                <li key ={i} class="bg-indigo-100 px-2 py-1 rounded">{item}</li>
              ))}
              </ul>
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
