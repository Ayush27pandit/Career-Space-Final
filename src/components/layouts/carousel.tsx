import React from 'react';
import {
  Carousel as CustomCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '../ui/button';


const JobCarousel = () => {
  return (
    <div className='h-[30vh] w-full flex flex-col items-center justify-center font-Roboto text-white text-5xl font-semibold py-10'>
      Top Rated Jobs
      <div>
        <div className='my-8 w-[100vw] md:px-40 px-20'>
        <CustomCarousel>
          <CarouselContent>
            <CarouselItem className="md:mx-5 flex item-center justify-evenly flex-col md:basis-1/2 lg:basis-1/3 h-[20vh] w-[35vw] border-2 rounded-md hover:bg-">
              <p className='text-md text-center'>Software Developer</p>
              <Button className='self-center'>Apply now</Button>
            </CarouselItem>
            <CarouselItem className="mx-5 flex item-center justify-evenly flex-col md:basis-1/2 lg:basis-1/3 h-[20vh] w-[35vw] border-2 rounded-md">
              <p className='text-md text-center'>Data Analyst</p>
              <Button className='self-center'>Apply now</Button>
            </CarouselItem>
            <CarouselItem className="mx-5 flex item-center justify-evenly flex-col md:basis-1/2 lg:basis-1/3 h-[20vh] w-[35vw] border-2 rounded-md">
              <p className='text-md text-center'>Devops</p>
              <Button className='self-center'>Apply now</Button>
            </CarouselItem>
            <CarouselItem className="mx-5 flex item-center justify-evenly flex-col md:basis-1/2 lg:basis-1/3 h-[20vh] w-[35vw] border-2 rounded-md">
              <p className='text-md text-center'>Graphic Designer</p>
              <Button className='self-center'>Apply now</Button>
            </CarouselItem>
            <CarouselItem className="mx-5 flex item-center justify-evenly flex-col md:basis-1/2 lg:basis-1/3 h-[20vh] w-[35vw] border-2 rounded-md">
              <p className='text-md text-center'>UI/UX</p>
              <Button className='self-center'>Apply now</Button>
            </CarouselItem>
            <CarouselItem className=" mx-5 flex item-center justify-evenly flex-col md:basis-1/2 lg:basis-1/3 h-[20vh] w-[35vw] border-2 rounded-md">
              <p className='text-md text-center'>Product Manager</p>
              <Button className='self-center'>Apply now</Button>
            </CarouselItem>
            
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </CustomCarousel>
        </div>
      </div>
    </div>
  );
}

export default JobCarousel;

