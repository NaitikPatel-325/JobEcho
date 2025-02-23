import { useEffect, useState } from "react";
import { Search, GraduationCap, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSearchParams } from "react-router-dom";
import CompanyExperience from "./CompanyExperience";
import InterviewExperience from "./InterviewExperience";
import SunburstChart from "./sunburst";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "@/redux/slices/appSlice";

export interface College {
  id: string;
  name: string;
  location: string;
  rating: number;
}

export default function CollegeCompanies() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();


  const companyId = searchParams.get("id");

  const company_ids = useSelector(
    (state: RootState) => state.appSlice.college.company_id
  );

  const company_names = useSelector(
    (state: RootState) => state.appSlice.college.companies
  );

  const companiesforcollege = useSelector(
    (state: RootState) => state.appSlice.college.companies
  );

  console.log("Inside college : ", companyId);
  //console.log("Inside college : ",companyId);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/user/getallCollages",
          {
            method: "GET",
            credentials: "include", // This sends cookies with the request
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);

        if (!response.ok) throw new Error("Failed to fetch colleges");
        const data = await response.json();

        const formattedColleges = data.map((college: any) => ({
          id: college._id,
          name: college.collegeName,
          location: college.location,
          rating: college.rating || 0,
        }));


        
  
        setColleges(formattedColleges);
        if (formattedColleges.length > 0) setSelectedCollege(formattedColleges[0]);

        console.log(company_ids, company_names);
        dispatch(setCompanies({companyNames: company_names, companyIds: company_ids}))


      } catch (err) {
        setError("Error fetching colleges. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);
  }, [dispatch]);
  

  const filteredColleges = colleges.filter((college) =>
    college?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return <div className="text-white text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center p-10">{error}</div>;

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
            <motion.div className="flex items-center justify-center mb-2">
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
      <div className="min-h-screen p-2 sm:p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="w-full max-w-[98%] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <motion.div className="flex items-center justify-center mb-2">
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
              className="text-sm text-gray-300 text-center"
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
                  <motion.div animate={isSearchFocused ? { x: [0, 5, 0] } : {}}>
                    <Search className="absolute right-4 top-3 h-4 w-4 text-gray-400" />
                  </motion.div>
                </motion.div>
              </motion.div>
          <ResizablePanelGroup 
            direction="horizontal" 
            className="min-h-[calc(100vh-120px)] rounded-xl border border-white/20 shadow-2xl bg-gray-900/50 backdrop-blur-xl"
          >
            <ResizablePanel defaultSize={25} minSize={20} className="p-3">
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
                  <motion.div animate={isSearchFocused ? { x: [0, 5, 0] } : {}}>
                    <Search className="absolute right-4 top-3 h-4 w-4 text-gray-400" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-260px)] pr-2 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {companiesforcollege.length > 0
                    ? companiesforcollege.map((company) => (
                        <motion.div key={company} className="relative">
                          <motion.button
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left p-4 rounded-xl transition-all duration-200 bg-white/10 border-2 border-white/20"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-white">
                                {company}
                              </span>
                            </div>
                          </motion.button>
                        </motion.div>
                      ))
                    : filteredColleges
                        .filter(
                          (college) =>
                            !companiesforcollege.includes(college.name)
                        )
                        .map((college) => (
                          <motion.div key={college.id} className="relative">
                            <motion.button
                              onClick={() => setSelectedCollege(college)}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                                selectedCollege?.id === college.id
                                  ? "bg-white/10 border-2 border-white/20"
                                  : "bg-white/5 hover:bg-white/10 border border-white/10"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-white">
                                  {college.name}
                                </span>
                                <div className="flex items-center space-x-3">
                                  <motion.div
                                    animate={
                                      selectedCollege?.id === college.id
                                        ? { x: [0, 5, 0], opacity: 1 }
                                        : { opacity: 0 }
                                    }
                                  >
                                    <ChevronRight className="w-4 h-4 text-blue-400" />
                                  </motion.div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-400 mt-1.5">
                                {college.location}
                              </p>
                            </motion.button>
                          </motion.div>
                        ))}
                </AnimatePresence>
              </motion.div>
            </ResizablePanel>
              <motion.div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {companiesforcollege.length > 0 ? (
                    companiesforcollege.map((company) => (
                      <motion.div key={company} className="relative">
                        <motion.button
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left p-3 rounded-xl transition-all duration-200 bg-white/10 border-2 border-white/20"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-white">{company}</span>
                          </div>
                        </motion.button>
                      </motion.div>
                    ))
                  ) : (
                    filteredColleges
                      .filter((college) => !companiesforcollege.includes(college.name))
                      .map((college) => (
                        <motion.div key={college.id} className="relative">
                          <motion.button
                            onClick={() => setSelectedCollege(college)}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                              selectedCollege?.id === college.id 
                                ? "bg-white/10 border-2 border-white/20" 
                                : "bg-white/5 hover:bg-white/10 border border-white/10"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-white">{college.name}</span>
                              <div className="flex items-center space-x-3">
                                <motion.div
                                  animate={selectedCollege?.id === college.id ? 
                                    { x: [0, 5, 0], opacity: 1 } : { opacity: 0 }}
                                >
                                  <ChevronRight className="w-4 h-4 text-blue-400" />
                                </motion.div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-1.5">{college.location}</p>
                          </motion.button>
                        </motion.div>
                      ))
                  )}
                </AnimatePresence>
              </motion.div>
            </ResizablePanel>

            <ResizableHandle>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-white/20 hover:bg-white/30 transition-colors h-full w-1.5 rounded-full"
              />
            </ResizableHandle>
            <ResizableHandle>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                className="bg-white/20 hover:bg-white/30 transition-colors h-full w-1.5 rounded-full" 
              />
            </ResizableHandle>

            <ResizablePanel defaultSize={75} className="p-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={searchParams.get("id")} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }} 
                  transition={{ duration: 0.3 }} 
                  className="h-full"
                >
                  {searchParams.get("id") ? (
                    <InterviewExperience company_id={searchParams.get("id")} />
                  ) : (
                    selectedCollege && <CompanyExperience selectedCollege={selectedCollege.id} />
                  )}
                </motion.div>
              </AnimatePresence>
            </ResizablePanel>
          </ResizablePanelGroup>
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SunburstChart />
            {/* <Histogram /> */}   { /*   HISTOGRAM COMMENTED  */  }
          </div>
        </div>
      </div>
    </>
  );
}