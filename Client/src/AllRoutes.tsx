import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import InterviewExperiences from "./pages/InterviewExperience";
import CompanyAnalysis from "./components/CompanyAnalysis";

const Home = lazy(() => import("./pages/Home"));
const Landing = lazy(() => import("./pages/Landing"));
const Collages = lazy(() => import("./pages/Collages"));
const NotFound = lazy(() => import("./pages/NotFound"));

const UserDetails = lazy(() => import("./components/UserDetails"));

const ExperienceForm = lazy(() => import("./components/ExperienceForm"));

const NewExperienceForm = lazy(() => import("./components/NewExperienceForm"));


const CollegeCompanies = lazy(() => import("./pages/CollegeCompanies"));
const Chat = lazy(() => import("./ws/Chat"));



export default function AllRoutes() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
          {/* <Loader /> */}
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/user-experience-form" element={<ExperienceForm />} />
        <Route path="/InterviewExperience" element={<InterviewExperiences company_id="" />} />
        <Route path="/user-experience-form-1" element={<NewExperienceForm />} />
        <Route path="/CollegeCompanies" element={<CollegeCompanies />} />
        <Route path="/chat" element={ <Chat/> }/>
        <Route path="/companyanalysis" element={<CompanyAnalysis/>}/>



        {/* <Route path="/comments" element={<Navbar />} /> */}

        {/* <Route path="/comments/videos/" element={<VideoSearch />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/Collage" element={<Collages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
