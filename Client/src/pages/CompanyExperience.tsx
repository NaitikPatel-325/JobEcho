import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
  import { useState } from "react";
  import { Search, User2, Star } from "lucide-react";
  import { motion } from "framer-motion";
  import InterviewExperience from "./InterviewExperience";
  import { useNavigate } from "react-router-dom";
  
  export interface Person {
    id: string;
    firstName: string;
    location: string;
    rating: number;
  }
  
  const people: Person[] = [
    {
      id: "1",
      firstName: "John",
      location: "Software Engineer",
      rating: 4.5
    },
    {
      id: "2",
      firstName: "Emma",
      location: "Product Manager",
      rating: 4.3
    },
    {
      id: "3",
      firstName: "Michael",
      location: "Data Scientist",
      rating: 4.7
    },
    {
      id: "4",
      firstName: "Sarah",
      location: "UX Designer",
      rating: 4.2
    },
    {
      id: "5",
      firstName: "David",
      location: "Full Stack Developer",
      rating: 4.9
    }
  ];
  
  export default function CompanyExperience() {
    const [selectedPerson, setSelectedPerson] = useState(people[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  
    const filteredPeople = people.filter((person) =>
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleCompanySelect = (companyName: string) => {
      navigate(`/company/${encodeURIComponent(companyName)}`);
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
            <User2 className="w-6 h-6 text-white/80 mr-2" />
            <h1 className="text-2xl font-bold text-white">Experience Explorer</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-400"
          >
            Discover interview experiences from professionals
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
                placeholder="Search people..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </motion.div>
  
            <div className="space-y-2 overflow-y-auto h-[calc(100vh-220px)] custom-scrollbar">
              {filteredPeople.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => setSelectedPerson(person)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedPerson.id === person.id
                        ? "bg-white/10 border-2 border-white/20"
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">{person.firstName}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-300">
                          {person.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{person.location}</p>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </ResizablePanel>
  
          <ResizableHandle className="bg-white/10 hover:bg-white/20 transition-colors" />
  
          <ResizablePanel defaultSize={65} className="p-4">
            <InterviewExperience onCompanySelect={handleCompanySelect} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }