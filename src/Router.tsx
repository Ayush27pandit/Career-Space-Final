import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";


import JobPostForm from "./components/layouts/JobPostForm";
import JobSearch from "./components/layouts/JobSearch";
import JobSearchForm from "./components/layouts/JobSearchForm";
import ResumeMaker from "./components/layouts/resumeMaker";
import Quiz from "./components/layouts/quiz";
import QuizCreator from "./components/layouts/QuizCreator";
import QuizTaker from "./components/layouts/QuizTaker";
import EmailContentGenerator from "./components/layouts/EmailGeneration";
import SkillGapIdentifier from "./components/layouts/SkillGenerator";
import AIQuizGenerator from "./components/layouts/AIquiz";
import Posts from "./components/layouts/Posts";
import VoiceflowWidget from "./components/layouts/VoiceFlow";
import JobSeekerDashboard from "./components/layouts/JobseekerDash";
import Application from "./components/layouts/Application";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
    },
    {
      path: "/jobsearch",
      element: <JobSearch />,
    },
    {
      path: "/jobpostform",
      element: <JobPostForm />,
    },
    {
      path: "/jobsearchform",
      element: <JobSearchForm />,
    },
    {
      path:'/resume',
      element:<ResumeMaker />
    },
    {
      path:'/quizcreate',
      element:<QuizCreator />
    },
    {
      path:'/quiztaker',
      element:<QuizTaker />
    },
    {
      path:'/emailgenerate',
      element:<EmailContentGenerator />
    },
    {
      path:'/skillgenerate',
      element:<SkillGapIdentifier />
    },
    {
      path:'/aigenerate',
      element:<AIQuizGenerator />
    },
    {
      path:'/posts',
      element:<Posts />
    },
    {
      path: "/voiceflow",
      element: <VoiceflowWidget />,
    },
    {
      path:'/jobseekDashboard',
      element:<JobSeekerDashboard />
    },
    {
      path:'/jobApplicants',
      element:<Application />
    }
    
  ],
  {
    basename: global.basename,
  }
);
