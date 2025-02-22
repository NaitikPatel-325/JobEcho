import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "Student Form", description: "Easily submit your placement details and track progress. Get notified on application updates and maintain a digital record of your journey.", image: "/path-to-image1.png" },
  { title: "Company Insights", description: "Analyze hiring trends, salaries, and interview processes to make informed career decisions. Gain deep insights into company cultures and work environments.", image: "/path-to-image2.png" },
  { title: "Chatbot Support", description: "Instant answers to placement queries with AI-powered assistance, available 24/7. Get guidance on resumes, interview tips, and career growth.", image: "/path-to-image3.png" },
  { title: "Ratings & Reviews", description: "Rate and review companies based on placement experiences, helping future job seekers. Share detailed feedback on interview processes and work-life balance.", image: "/path-to-image4.png" },
];

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, index }) => {
  return (
    <div className={`relative flex w-full max-w-4xl items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="bg-white shadow-xl rounded-xl p-6 w-96 md:w-96 text-left relative z-10 flex flex-col items-center md:items-start"
      >
        <h4 className="text-2xl font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 mt-2 text-sm md:text-base text-center md:text-left">{description}</p>
      </motion.div>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full z-0" />
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col overflow-hidden overflow-x-hidden">
      <nav className="w-full flex justify-between items-center py-4 px-12 bg-white shadow-md fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-bold text-purple-600">JobEcho</h1>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-purple-600">Home</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Student Form</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Company Insights</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Interview Experiences</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">About</a>
        </div>
      </nav>

      <div className="flex-1 flex flex-col justify-center items-center text-center bg-white px-4 w-full pt-56 pb-24">
        <h2 className="text-5xl font-bold leading-tight text-gray-900 max-w-full">
          Simplify Your <span className="text-purple-600">Placement Journey</span>
        </h2>
        <p className="text-lg text-gray-500 mt-4 max-w-3xl">
          Track your applications, analyze hiring trends, and get real-time placement insights—all in one place.
        </p>
        <div className="mt-6 flex justify-center w-full max-w-lg">
          <button className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-md text-lg hover:bg-purple-700 active:opacity-75 transition" onClick={() => navigate("/Home")}>
            Get Started →
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-3">Free to Use</p>
      </div>

      <h2 className="text-4xl font-bold text-gray-900 mt-12 text-center">Features</h2>
      <div className="relative w-full flex flex-col items-center py-16 gap-12">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300" />
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
