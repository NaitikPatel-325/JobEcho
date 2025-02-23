import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addCompany, setCollege, setCompanies } from "@/redux/slices/appSlice";

export interface CollegeCompany {
  id: string;
  name: string;
  company: string;
}

interface CompanyExperienceProps {
  selectedCollege: {
    name: string; id: string 
};
}

const CompanyExperience = ({ selectedCollege }: CompanyExperienceProps) => {
  const [filteredColleges, setFilteredColleges] = useState<CollegeCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [CompaniesForCollege, setCompaniesForCollege] = useState<string[]>([]);

  console.log(selectedCollege);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!selectedCollege) return;

      setLoading(true);
      setError(null);

      console.log(selectedCollege);

      try {
        const response = await fetch(
          `https://jobecho-iex4.onrender.com/user/getCollegesandcompany/${selectedCollege}`, {
            method: "GET", 
            credentials: "include" // Allows cookies to be sent with the request
        }
        );

        
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        const data: CollegeCompany[] = await response.json();
        console.log("Inside Company Exp : ",data);

        
        const companiesForCollege =  data.map(company => company.name);
        setCompaniesForCollege(companiesForCollege);

        dispatch(setCollege(""));
        dispatch(setCompanies([]));

        setFilteredColleges(data);
      } catch (err) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [dispatch, selectedCollege]);

  const handleCardClick = (company: any) => {
    console.log(company._id);
    dispatch(setCollege(company._id));
  
    CompaniesForCollege.forEach((companyName) => {
      dispatch(addCompany(companyName));
    });
  
    navigate(`/CollegeCompanies?id=${company._id}`);
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

        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {!loading && !error && filteredColleges.length > 0 ? (
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
                  onClick={() => handleCardClick(college)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {college.name}
                        </h3>
                        <p className="text-gray-400">{college.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            !loading &&
            !error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center col-span-2 text-gray-400"
              >
                No interview experiences found for {selectedCollege?.name || "this company"}.
              </motion.p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyExperience;