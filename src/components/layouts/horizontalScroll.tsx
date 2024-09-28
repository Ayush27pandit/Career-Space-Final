import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Button } from '@/components/ui/button'; // Shadcn Button component
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for arrows

// Function to handle scroll on wheel
function onWheelApi(apiObj: VisibilityContext, ev: React.WheelEvent): void {
  if (ev.deltaY < 0) {
    apiObj.scrollPrev();
  } else if (ev.deltaY > 0) {
    apiObj.scrollNext();
  }
}

// Features for both job seekers and job posters
const features = [
  {
    title: 'See Jobs & Apply',
    description: 'Browse job listings from around the world and exclusive jobs for your college.',
  },
  {
    title: 'AI Mock Tests',
    description: 'Take AI-driven mock tests to prepare for real-world job interviews.',
  },
  {
    title: 'Auto-generated Resume',
    description: 'Fill out your details and instantly receive a well-structured resume.',
  },
  {
    title: 'Personalized Roadmap',
    description: 'Get a customized roadmap based on your current skills and future goals.',
  },
  {
    title: 'Job Poster: Publish Jobs',
    description: 'Post jobs and reach qualified candidates for your company.',
  },
  {
    title: 'Job Poster: Create Quizzes',
    description: 'Create quizzes for job applicants and filter candidates based on quiz performance.',
  },
];

const AppFeaturesScroll: React.FC = () => {
  const apiRef = React.useRef<VisibilityContext | null>(null);

  return (
    <div className="relative p-6 bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8">Discover Our Features</h2>

      {/* Scroll Menu */}
      <ScrollMenu
        onWheel={onWheelApi}
        scrollContainerClassName="relative"
        apiRef={apiRef}
      >
        {features.map((feature, index) => (
          <div key={index}>
            <div className={`${index % 2 === 0 ? 'mb-20' : 'mt-20'}`}>
              <FeatureCard title={feature.title} description={feature.description} />
            </div>
            {index < features.length - 1 && (
              <div className="h-1 w-full bg-gray-300 my-4"></div> 
            )}
          </div>
        ))}
      </ScrollMenu>

      {/* Arrow Buttons */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <ArrowButton direction="prev" onClick={() => apiRef.current?.scrollPrev()} />
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <ArrowButton direction="next" onClick={() => apiRef.current?.scrollNext()} />
      </div>
    </div>
  );
};

// Feature Card component
const FeatureCard: React.FC<{ title: string, description: string }> = ({ title, description }) => (
  <div className="inline-block min-w-[350px] max-w-[400px] mx-6 p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600 text-lg">{description}</p>
  </div>
);

// Arrow Button component
const ArrowButton: React.FC<{ direction: 'prev' | 'next', onClick: () => void }> = ({ direction, onClick }) => (
  <Button onClick={onClick} className="bg-blue-500 text-white rounded-full p-3 shadow-lg">
    {direction === 'prev' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </Button>
);

export default AppFeaturesScroll;
