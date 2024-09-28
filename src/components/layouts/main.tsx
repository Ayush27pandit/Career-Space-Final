import React from 'react'
import { useNavigate } from 'react-router-dom';


const Main = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/jobpostform'); // Replace '/new-page' with your desired route
  };

  return (
    <div className='h-[65vh] w-full flex items-center justify-between flex-col gap-20 text-white mb-32 pt-20 z-10 ' >
      <div className='flex flex-col items-center justify-center leading-6 z-10'>
      <h1 className='font-Roboto text-8xl font-semibold text-center'>Find Jobs Easily</h1>
      <p className='font-poppins text-[10px] w-[50vw] text-center hidden md:block'>At Carrier Sphere, we connect talented individuals with top employers across industries. Whether you're seeking your dream job or looking to make your next career move, we provide a seamless and personalized job search experience.

        Explore thousands of job opportunities, tailored recommendations, and helpful career resources to land the perfect role. Start your journey with us and take the next step towards achieving your professional goals!
      </p>
      </div>

      <div className='flex items-center justify-between gap-20 z-10'>
      <button onClick={handleClick} className='text-white bg-blue-500 rounded-md py-3 px-6'>Find Job</button>
      <button onClick={handleClick} className='text-white bg-[#5863F8] rounded-md py-3 px-6'>Post Job</button>
      </div>
    </div>
  )
}

export default Main