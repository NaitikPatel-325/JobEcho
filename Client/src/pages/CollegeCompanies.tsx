import { useEffect, useRef, useState } from "react";
import { Search, GraduationCap, Star, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSearchParams } from "react-router-dom";
import CompanyExperience from "./CompanyExperience";
import InterviewExperience from "./InterviewExperience";
import Sunburst from 'sunburst-chart';
import SunburstChart from "./sunburst";

export interface College {
  id: string;
  name: string;
  location: string;
  rating: number;
}

const colleges: College[] = [
  { id: "1", name: "Dharmsinh Desai University", location: "Nadiad, Gujarat", rating: 4.5 },
  { id: "2", name: "Nirma University", location: "Ahmedabad, Gujarat", rating: 4.3 },
  { id: "3", name: "DAIICT", location: "Gandhinagar, Gujarat", rating: 4.7 },
  { id: "4", name: "LD University", location: "Ahmedabad, Gujarat", rating: 4.2 },
  { id: "5", name: "IIT Bombay", location: "Mumbai, Maharashtra", rating: 4.9 }
];

const sampleData = {
  name: "root",
  children: [
    {
      name: "Engineering",
      children: [
        { name: "Computer Science", value: 30 },
        { name: "Mechanical", value: 20 },
        { name: "Civil", value: 15 },
      ],
    },
    {
      name: "Management",
      children: [
        { name: "MBA", children: [{ name: "MBATech", value:12},{ name: "MTech", value:21} ] },
        { name: "BBA", value: 10 },
      ],
    },
    {
      name: "Science",
      children: [
        { name: "Physics", value: 18 },
        { name: "Mathematics", value: 22 },
      ],
    },
  ],
};


export default function CollegeCompanies() {
  const [selectedCollege, setSelectedCollege] = useState(colleges[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const companyId = searchParams.get("id");

  const sunburstRef = useRef(null);

  useEffect(() => {
    if (sunburstRef.current) {
      Sunburst()
        .data(sampleData)
        .width(400)
        .height(400)
        .color((d) => (d.children ? "#3498db" : "#e74c3c"))
        .size("value")
        .label("name")(sunburstRef.current);
    }
  });

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
    
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <motion.div 
            className="flex items-center justify-center mb-2" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mr-3"
            >
              <GraduationCap className="w-7 h-7 text-white/90" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              College Explorer
            </h1>
          </motion.div>
          <motion.p 
            className="text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover your perfect educational journey
          </motion.p>
        </motion.div>

        <ResizablePanelGroup 
          direction="horizontal" 
          className="min-h-[calc(100vh-160px)] rounded-2xl border border-white/20 shadow-2xl bg-gray-900/50 backdrop-blur-xl"
        >
          <ResizablePanel defaultSize={35} minSize={30} className="p-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="mb-4"
            >
              <motion.div
                animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                />
                <motion.div
                  animate={isSearchFocused ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Search className="absolute right-4 top-3 h-4 w-4 text-gray-400" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-260px)] pr-2 custom-scrollbar"
            >
              <AnimatePresence mode="wait">
                {filteredColleges.map((college) => (
                  <motion.div
                    key={college.id}
                    variants={itemVariants}
                    layout
                    className="relative"
                  >
                    <motion.button
                      onClick={() => setSelectedCollege(college)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        selectedCollege.id === college.id 
                          ? "bg-white/10 border-2 border-white/20" 
                          : "bg-white/5 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{college.name}</span>
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={selectedCollege.id === college.id ? 
                              { scale: [1, 1.2, 1], rotate: [0, 360] } : {}}
                            transition={{ duration: 0.5 }}
                            className="flex items-center"
                          >
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1.5 text-sm text-gray-300">{college.rating}</span>
                          </motion.div>
                          <motion.div
                            animate={selectedCollege.id === college.id ? 
                              { x: [0, 5, 0], opacity: 1 } : { opacity: 0 }}
                          >
                            <ChevronRight className="w-4 h-4 text-blue-400" />
                          </motion.div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1.5">{college.location}</p>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </ResizablePanel>

          <ResizableHandle>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-white/20 hover:bg-white/30 transition-colors h-full w-1.5 rounded-full"
            />
          </ResizableHandle>

          <ResizablePanel defaultSize={65} className="p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={companyId || selectedCollege.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {companyId ? (
                  <InterviewExperience companyId={companyId} />
                ) : (
                  <CompanyExperience
                    selectedCollege={selectedCollege}
                    onCompanySelect={(id) => setSearchParams({ company_id: id })}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </ResizablePanelGroup>
        <SunburstChart/>
      </div>
    </div>
    </>
  );
}