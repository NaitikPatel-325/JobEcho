import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { console } from "inspector";

export interface CollegeCompany {
  id: string;
  name: string;
  company: string;
}

const colleges: CollegeCompany[] = [
  {
    id: "1",
    name: "Dharmsinh Desai University",
    company: "MasterCard"
  },
  {
    id: "2",
    name: "Dharmsinh Desai University",
    company: "Infosys"
  },
  {
    id: "3",
    name: "DAIICT",
    company: "Google"
  },
  {
    id: "4",
    name: "LD University",
    company: "Microsoft"
  },
  {
    id: "5",
    name: "IIT Bombay",
    company: "Apple"
  }
];

interface CompanyExperienceProps {
  selectedCollege: { name: string };
}

const CompanyExperience = ({ selectedCollege }: CompanyExperienceProps) => {
  const [filteredColleges, setFilteredColleges] = useState<CollegeCompany[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCollege?.name) {
      const filtered = colleges.filter((college) => college.name === selectedCollege.name);
      setFilteredColleges(filtered);
    } else {
      setFilteredColleges(colleges);
    }
  }, [selectedCollege]);

  const handleCardClick = (id: string) => {
    //console.log(id);
    navigate(`/CollegeCompanies?id=${id}`);

  };

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar">
      <div className="space-y-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-6"
        >
          Interview Experiences
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college, index) => (
              <motion.div 
                key={college.id} 
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="h-full transform transition-all duration-300 hover:scale-105 cursor-pointer bg-white/5 border-white/10"
                  onClick={() => handleCardClick(college.id)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {college.name}
                        </h3>
                        <p className="text-gray-400">
                          {college.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <div className="absolute inset-0 bg-blue-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                      <h3 className="text-xl font-semibold mb-2 text-white">Visit Profile</h3>
                      <p className="text-blue-200 mb-4">
                        Click to view detailed interview experience and more insights
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center col-span-2 text-gray-400"
            >
              No interview experiences found for {selectedCollege?.name || 'this company'}.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyExperience;
