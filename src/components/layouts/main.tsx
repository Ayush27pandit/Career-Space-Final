import React from "react";
import { useNavigate } from "react-router-dom";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

const Main = () => {
  const navigate = useNavigate();

  const words = [
    {
      text: "Where",
      className: "text-white",
    },
    {
      text: "Talent",
      className: "text-white",
    },
    {
      text: "Meets",
      className: "text-white",
    },
    {
      text: "Opportunities",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const handleClick = () => {
    navigate("/jobpostform"); // Replace '/new-page' with your desired route
  };

  return (
    <div className="h-[65vh] w-full flex items-center justify-between flex-col gap-20 text-white mb-32 pt-20 z-10 ">
      <div className="flex flex-col items-center justify-center leading-6 z-10 gap-3">
        <p className="text-7xl font-bold text-center text-white relative z-20">
          Welcome to CareerSphere
        </p>
        <p className="text-4xl font-semibold text-center text-white relative z-20">
          <TypewriterEffectSmooth words={words} />
        </p>

        <p className="font-poppins text-[20px] w-[50vw] text-center hidden md:block">
          At Carrier Sphere, we connect talented individuals with top employers
          across industries. Whether you're seeking your dream job or looking to
          make your next career move, we provide a seamless and personalized job
          search experience. Explore thousands of job opportunities, tailored
          recommendations, and helpful career resources to land the perfect
          role. Start your journey with us and take the next step towards
          achieving your professional goals!
        </p>
      </div>

      <div className="flex items-center justify-between gap-20 z-10">
        <button
          onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Find Job
        </button>
        <button
          onClick={handleClick} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default Main;


// import React from 'react'
// import { useNavigate } from 'react-router-dom';


// const Main = () => {

//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/jobpostform'); // Replace '/new-page' with your desired route
//   };

//   return (
//     <div className='h-[65vh] w-full flex items-center justify-between flex-col gap-20 text-white mb-32 pt-20 z-10 ' >
//       <div className='flex flex-col items-center justify-center leading-6 z-10'>
//       <h1 className='font-Roboto text-8xl font-semibold text-center'>Find Jobs Easily</h1>
//       <p className='font-poppins text-[10px] w-[50vw] text-center hidden md:block'>At Carrier Sphere, we connect talented individuals with top employers across industries. Whether you're seeking your dream job or looking to make your next career move, we provide a seamless and personalized job search experience.

//         Explore thousands of job opportunities, tailored recommendations, and helpful career resources to land the perfect role. Start your journey with us and take the next step towards achieving your professional goals!
//       </p>
//       </div>

//       <div className='flex items-center justify-between gap-20 z-10'>
//       <button onClick={handleClick} className='text-white bg-blue-500 rounded-md py-3 px-6'>Find Job</button>
//       <button onClick={handleClick} className='text-white bg-[#5863F8] rounded-md py-3 px-6'>Post Job</button>
//       </div>
//     </div>
//   )
// }

// export default Main