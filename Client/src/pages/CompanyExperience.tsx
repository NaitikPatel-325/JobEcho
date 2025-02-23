import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addCompany, setCollege, setCompanies, updateCompanies } from "@/redux/slices/appSlice";

export interface CollegeCompany {
  id: string;
  name: string;
  company: string;
}

interface CompanyExperienceProps {
  selectedCollege: { id: string };
}

const CompanyExperience = ({ selectedCollege }: CompanyExperienceProps) => {
  const [filteredColleges, setFilteredColleges] = useState<CollegeCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [CompaniesForCollege, setCompaniesForCollege] = useState<string[]>([]);
  const [collegecompanyavg, setCollegecompanyavg] = useState<number | null>(null);
  const [cids, setCids] = useState<string[]>([]);
  const [cnames, setCname] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!selectedCollege) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/user/getCollegesandcompany/${selectedCollege}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        const data: CollegeCompany[] = await response.json();
        console.log("Inside Company Exp : ", data);

        const companyIds = data.map(company => company._id);
        const companyNames = data.map(company => company.name);

        setCids(companyIds);
        setCname(companyNames);
        
        const companiesForCollege = data.map(company => company.name);
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

  const handleCardClick = (company: CollegeCompany) => {
    console.log("Selected Company ID:", company._id);

    dispatch(setCollege(company._id));
    dispatch(addCompany({ companyName: company.name, companyId: company._id }));
    dispatch(setCompanies({companyNames: cnames, companyIds: cids}));

    navigate(`/CollegeCompanies?id=${company._id}`);
  };

  return (
    <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white text-center mb-8"
        >
          Interview Experiences
        </motion.h2>

        {loading && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 text-lg"
          >
            Loading...
          </motion.p>
        )}
        
        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-400 text-lg"
          >
            {error}
          </motion.p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {!loading && !error && filteredColleges.length > 0
            ? filteredColleges.map((college, index) => (
                <motion.div
                  key={college.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="h-full transform transition-all duration-300 hover:scale-105 cursor-pointer bg-white/5 border-white/10 hover:bg-white/10"
                    onClick={() => handleCardClick(college)}
                  >
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-2">
                            {college.name}
                          </h3>
                          <p className="text-gray-400 text-lg">{college.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            : !loading && !error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center col-span-full text-gray-400 text-lg"
                >
                  No interview experiences found for{" "}
                  {selectedCollege?.name || "this company"}.
                </motion.p>
              )}
        </div>
      </div>
    </div>
  );
};

export default CompanyExperience;