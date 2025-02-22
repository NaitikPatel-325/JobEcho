import { useState } from "react";
import { Search, GraduationCap, Star } from "lucide-react";
import { motion } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSearchParams, useNavigate } from "react-router-dom";
import CompanyExperience from "./CompanyExperience";
import InterviewExperience from "./InterviewExperience"; // Assuming you have this component

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

export default function CollegeCompanies() {
  const [selectedCollege, setSelectedCollege] = useState(colleges[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the selected company ID from query params
  const companyId = searchParams.get("company_id");

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-center">
        <motion.div className="flex items-center justify-center mb-1" whileHover={{ scale: 1.05 }}>
          <GraduationCap className="w-6 h-6 text-white/80 mr-2" />
          <h1 className="text-2xl font-bold text-white">College Explorer</h1>
        </motion.div>
        <motion.p className="text-sm text-gray-400">Discover your perfect educational journey</motion.p>
      </motion.div>

      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-120px)] rounded-xl border border-white/10 shadow-2xl bg-gray-900/50 backdrop-blur-xl">
        <ResizablePanel defaultSize={35} minSize={30} className="p-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-3 relative">
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </motion.div>

          <div className="space-y-2 overflow-y-auto h-[calc(100vh-220px)] custom-scrollbar">
            {filteredColleges.map((college, index) => (
              <motion.div key={college.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                <motion.button
                  onClick={() => setSelectedCollege(college)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedCollege.id === college.id ? "bg-white/10 border-2 border-white/20" : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{college.name}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-300">{college.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{college.location}</p>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-white/10 hover:bg-white/20 transition-colors" />

        <ResizablePanel defaultSize={65} className="p-4">
          {companyId ? (
            <InterviewExperience companyId={companyId} />
          ) : (
            <CompanyExperience
              selectedCollege={selectedCollege}
              onCompanySelect={(id) => setSearchParams({ company_id: id })}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import InterviewExperience from "./InterviewExperience";

export interface College {
  id: string;
  name: string;
  location: string;
  rating: number;
}

export interface Experience {
  id: string;
  firstName: string;
  lastName: string;
  college: string;
  graduationYear: number;
  latestExperience: string;
  latestOffer: string;
}

export default function CollegeCompanies() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/getallCollages"); 
        if (!response.ok) throw new Error("Failed to fetch colleges");
        const data = await response.json();
        const formattedColleges = data.map((college: any) => ({
          id: college._id,
          name: college.collegeName,
          location: college.location,
          rating: Math.random() * 2 + 3, // Assigning a random rating between 3.0 to 5.0
        }));
        console.log(formattedColleges);
        setColleges(formattedColleges);
        setSelectedCollege(formattedColleges[0] || null);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExperienceSelect = (experience: Experience) => {
    setSelectedExperience(experience);
    const collegeMatch = colleges.find((c) => c.name === experience.college);
    if (collegeMatch) {
      setSelectedCollege(collegeMatch);
    }
  };

  return (
    <div className="h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        <motion.div
          className="flex items-center justify-center mb-1"
          whileHover={{ scale: 1.05 }}
        >
          <GraduationCap className="w-6 h-6 text-white/80 mr-2" />
          <h1 className="text-2xl font-bold text-white">College Explorer</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-400"
        >
          Discover your perfect educational journey
        </motion.p>
      </motion.div>

      <ResizablePanelGroup
        direction="horizontal"
        className="h-[calc(100vh-120px)] rounded-xl border border-white/10 shadow-2xl bg-gray-900/50 backdrop-blur-xl"
      >
        <ResizablePanel defaultSize={35} minSize={30} className="p-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3 relative"
          >
            <input
              type="text"
              placeholder={selectedExperience ? "Search experiences..." : "Search colleges..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </motion.div>

          <div className="space-y-2 overflow-y-auto h-[calc(100vh-220px)] custom-scrollbar">
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.button
                  onClick={() => {
                    setSelectedCollege(college);
                    if (selectedExperience?.college !== college.name) {
                      setSelectedExperience(null);
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedCollege?.id === college.id
                      ? "bg-white/10 border-2 border-white/20"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">
                      {selectedExperience && selectedExperience.college === college.name
                        ? `${selectedExperience.firstName}'s Experience`
                        : college.name}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-300">
                        {college.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{college.location}</p>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-white/10 hover:bg-white/20 transition-colors" />

        <ResizablePanel defaultSize={65} className="p-4">
          {selectedCollege && (
            <InterviewExperience
              selectedCollege={selectedCollege}
              onExperienceSelect={handleExperienceSelect}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}