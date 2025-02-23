import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface IRound {
  name: string;
  experience: string;
}

interface IExperience {
  company: string;
  year: string;
  rounds: IRound[];
}

interface IOffer {
  company: string;
  status: "Selected" | "Rejected";
  package?: string;
}

export interface IExperienceSubmission {
  id?: string;
  firstName: string;
  lastName: string;
  collegeName: string;
  graduationYear: string;
  experiences: IExperience[];
  offers: IOffer[];
}

const InterviewExperience = ({ company_id }: { company_id: string }) => {
  const [experiences, setExperiences] = useState<IExperienceSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        //console.log("Fetching experiences for company_id:", company_id);
        const response = await axios.get(
          `http://localhost:3000/experience/get-experience-by-company/${company_id}`,
          {
            withCredentials: true, // This sends cookies with the request
          }
        );

        if (Array.isArray(response.data)) {
          setExperiences(response.data);
          //console.log("Received experiences:", response.data);
        } else {
          setError("Invalid data format received from the server.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch experiences. Please try again later.");
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [company_id]);

  const handleCardClick = (id?: string) => {
    if (id) {
      navigate(`/CollegeCompanies/${id}`);
    }
  };

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 text-white"
      >
        Loading...
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-500 p-8"
      >
        {error}
      </motion.div>
    );

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
          {experiences.length > 0 ? (
            experiences.map((experience, index) => (
              <motion.div
                key={experience.id || `experience-${index}`}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="h-full transform transition-all duration-300 hover:scale-105 cursor-pointer bg-white/5 border-white/10"
                  onClick={() => handleCardClick(experience.id)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* User Info */}
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {experience.firstName} {experience.lastName}
                        </h3>
                        <p className="text-gray-400">
                          {experience.collegeName}, {experience.graduationYear}
                        </p>
                      </div>

                      {/* Latest Experience */}
                      <div>
                        <h4 className="text-lg font-medium text-white">
                          Latest Experience:
                        </h4>
                        {experience.experiences?.length > 0 &&
                          experience.experiences[0].name && (
                            <div className="ml-4 mt-2 text-gray-300">
                              <p>
                                <span className="font-medium">Company:</span>{" "}
                                {experience.experiences?.[0]?.company || "N/A"}
                              </p>
                              <p>
                                <span className="font-medium">Year:</span>{" "}
                                {experience.experiences?.[0]?.year || "N/A"}
                              </p>
                            </div>
                          )}
                      </div>

                      {/* Latest Offer */}
                      <div>
                        <h4 className="text-lg font-medium text-white">
                          Latest Offer:
                        </h4>
                        {experience.offers?.length > 0 && (
                          <div className="ml-4 mt-2 text-gray-300">
                            <p>
                              <span className="font-medium">Company:</span> {experience.offers[0].company?.name || "N/A"}
                            </p>
                            {experience.offers[0]?.package && (
                              <p>
                                <span className="font-medium">Package:</span>{" "}
                                {experience.offers[0].package} LPA
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">
                          Latest Status:
                        </h4>
                        {experience.offers?.length > 0 && (
                          <div className="ml-4 mt-2 text-gray-300">
                            <p>
                              <span className="font-medium">Company:</span>{" "}
                              {experience.offers[0].status}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-blue-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Visit Profile
                      </h3>
                      <p className="text-blue-200 mb-4">
                        Click to view detailed interview experience and more
                        insights
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-2 text-gray-400">
              No interview experiences found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewExperience;