import { useEffect, useState } from "react";
import { Search, GraduationCap, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import CompanyExperience from "./CompanyExperience";
import InterviewExperience from "./InterviewExperience";
import SunburstChart from "./sunburst";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

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


  const companyId = searchParams.get("id");

  const companiesforcollege = useSelector(
    (state: RootState) => state.appSlice.college.companies
  );
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("Inside View  : ",API_BASE_URL);
  console.log("Inside college : ",companyId);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/getallCollages`, {
          method: "GET", 
          credentials: "include" // Allows cookies to be sent with the request
      });
      

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
      } catch (err) {
        setError("Error fetching colleges. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchColleges();
  }, []);
  

  const filteredColleges = colleges.filter((college) =>
    college?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-slate-950/90 via-slate-900/90 to-slate-950/90 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:py-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div className="flex items-center justify-center mb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mr-3 rounded-full bg-slate-800/80 p-2 shadow-[0_0_25px_rgba(56,189,248,0.35)]"
              >
                <GraduationCap className="w-7 h-7 text-sky-400" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
                College Explorer
              </h1>
            </motion.div>
            <motion.p
              className="text-sm text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover placement insights and interview experiences across colleges
            </motion.p>
          </motion.div>

          {/* Main content */}
          <div className="mt-8 grid w-full gap-6 lg:grid-cols-[minmax(260px,320px),minmax(0,1fr)] items-start">
            {/* Left sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="h-[calc(100vh-200px)] rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl p-4 flex flex-col space-y-4"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">
                  Browse
                </p>
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
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400/60 transition-all duration-200"
                  />
                  <motion.div animate={isSearchFocused ? { x: [0, 5, 0] } : {}}>
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </motion.div>
                </motion.div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <motion.div className="space-y-2.5 overflow-y-auto pr-1 custom-scrollbar flex-1">
                <AnimatePresence mode="wait">
                  {companiesforcollege.length > 0 ? (
                    companiesforcollege.map((company) => (
                      <motion.div key={company} className="relative" layout>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full text-left p-3.5 rounded-xl transition-all duration-200 bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between"
                        >
                          <span className="font-medium text-sm text-white">
                            {company}
                          </span>
                        </motion.button>
                      </motion.div>
                    ))
                  ) : (
                    filteredColleges
                      .filter(
                        (college) => !companiesforcollege.includes(college.name)
                      )
                      .map((college) => (
                        <motion.div key={college.id} className="relative" layout>
                          <motion.button
                            onClick={() => setSelectedCollege(college)}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.97 }}
                            className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 flex flex-col gap-1 ${
                              selectedCollege?.id === college.id
                                ? "bg-sky-500/15 border border-sky-400/70 shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                                : "bg-white/5 hover:bg-white/10 border border-white/10"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm text-white">
                                {college.name}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-[11px] text-slate-400">
                                  {college.location}
                                </span>
                                <motion.div
                                  animate={
                                    selectedCollege?.id === college.id
                                      ? { x: [0, 4, 0], opacity: 1 }
                                      : { opacity: 0.4 }
                                  }
                                >
                                  <ChevronRight className="w-4 h-4 text-sky-400" />
                                </motion.div>
                              </div>
                            </div>
                          </motion.button>
                        </motion.div>
                      ))
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Right content */}
            <div className="flex flex-col h-[calc(100vh-200px)] space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={searchParams.get("id") || selectedCollege?.id || "default"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-slate-900/85 border border-white/10 shadow-2xl backdrop-blur-xl p-4 sm:p-5 lg:p-6 flex-1 min-h-[260px]"
                >
                  {searchParams.get("id") ? (
                    <InterviewExperience company_id={searchParams.get("id") || ""} />
                  ) : (
                    selectedCollege && (
                      <CompanyExperience selectedCollege={selectedCollege} />
                    )
                  )}
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl bg-slate-900/85 border border-white/10 shadow-2xl backdrop-blur-xl p-4 sm:p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Overview
                    </p>
                    <h2 className="text-sm sm:text-base font-semibold text-white">
                      Company & College Placement Snapshot
                    </h2>
                  </div>
                </div>
                <div className="w-full overflow-hidden">
                  <SunburstChart />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}