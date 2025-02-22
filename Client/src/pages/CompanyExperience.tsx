// import  { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";

// interface IRound {
//   name: string;
//   experience: string;
// }

// interface IExperience {
//   company: string;
//   year: string;
//   rounds: IRound[];
// }

// interface IOffer {
//   company: string;
//   status: "Selected" | "Rejected";
//   package?: string;
// }

// // interface IComment{
// //   user: string;
// //   content: string;
// //   createdAt: Date;
// // }

// export interface IExperienceSubmission {
//   id: string;
//   firstName: string;
//   lastName: string;
//   collegeName: string;
//   graduationYear: string;
//   experiences: IExperience[];
//   offers: IOffer[];
// }

// const InterviewExperience = () => {
//   const [experiences, setExperiences] = useState<IExperienceSubmission[]>([]);
//   const [loading, setLoading] = useState(true);
//   // const [showModal, setShowModal] = useState(false);
//   // const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
//   // const [comments, setComments] = useState<IComment[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/user/InterviewExperience"
//         );
//         if (Array.isArray(response.data)) {
//           setExperiences(response.data);
//         } else {
//           setError("Invalid data format received from the server.");
//         }
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch experiences. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, []);

//   const handleCardClick = (id: string) => {
//     navigate(`/viewexperience/${id}`);
//   };

//   // const handleViewComments = async (id: string, e: React.MouseEvent) => {
//   //   e.stopPropagation(); 
//   //   setSelectedExperienceId(id);
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:3000/user/InterviewExperience/${id}/comments`
//   //     );
//   //     setComments(response.data.comments);
//   //   } catch (error) {
//   //     console.error("Error fetching comments:", error);
//   //     setComments([]);
//   //   }
//   //   setShowModal(true);
//   // };

//   // const closeModal = () => {
//   //   setShowModal(false);
//   //   setComments([]);
//   //   setSelectedExperienceId(null);
//   // };

//   if (loading) return <div className="text-center p-8">Loading...</div>;
//   if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

//   return (
//     <div className="w-full">
//       <div className="pt-16">
//         <h2 className="text-2xl font-bold text-center mt-6 mb-8">
//           Interview Experiences
//         </h2>
//         <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {experiences.length > 0 ? (
//             experiences.map((experience) => (
//               <div key={experience.id} className="group relative">
//                 <Card
//                   className="h-full transform transition-all duration-300 hover:scale-105 cursor-pointer"
//                   onClick={() => handleCardClick(experience.id)}
//                 >
//                   <CardContent className="p-12">
//                     <div className="space-y-4">
//                       <div>
//                         <h3 className="text-xl font-semibold">
//                           {experience.firstName} {experience.lastName}
//                         </h3>
//                         <p className="text-gray-600">
//                           {experience.collegeName}, {experience.graduationYear}
//                         </p>
//                       </div>

//                       <div>
//                         <h4 className="text-lg font-medium">
//                           Latest Experience:
//                         </h4>
//                         {experience.experiences[0] && (
//                           <div className="ml-4 mt-2">
//                             <p>
//                               <span className="font-medium">Company:</span>{" "}
//                               {experience.experiences[0].company}
//                             </p>
//                             <p>
//                               <span className="font-medium">Year:</span>{" "}
//                               {experience.experiences[0].year}
//                             </p>
//                           </div>
//                         )}
//                       </div>

//                       <div>
//                         <h4 className="text-lg font-medium">Latest Offer:</h4>
//                         {experience.offers[0] && (
//                           <div className="ml-4 mt-2">
//                             <p>
//                               <span className="font-medium">Company:</span>{" "}
//                               {experience.offers[0].company}
//                             </p>
//                             <p>
//                               <span className="font-medium">Package:</span>{" "}
//                               {experience.offers[0].package || "N/A"}
//                             </p>
//                             <p>
//                               <span className="font-medium">Status:</span>{" "}
//                               <span
//                                 className={
//                                   experience.offers[0].status === "Selected"
//                                     ? "text-green-600"
//                                     : "text-red-600"
//                                 }
//                               >
//                                 {experience.offers[0].status}
//                               </span>
//                             </p>
//                           </div>
//                         )}
//                       </div>

//                     </div>
//                   </CardContent>

//                   <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
//                     <div className="p-6 h-full flex flex-col justify-center items-center text-center bg-blue-50 rounded-lg">
//                       <h3 className="text-xl font-semibold mb-2">Mastercard</h3>
//                       <p className="text-gray-600 mb-2">New York, USA</p>
//                       <p className="text-gray-600 mb-4">
//                         A leading global payments and technology company
//                         transforming the way the world pays and gets paid.
//                       </p>
//                       <a
//                         href="https://www.mastercard.com"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:text-blue-700 underline"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         Visit Company Website
//                       </a>
                     
//                       {/* <div className="mt-4">
//                         <button
//                           onClick={(e) => handleViewComments(experience.id, e)}
//                           className="px-4 py-2 bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded hover:from-blue-400 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
//                         >
//                           View Comments
//                         </button>
//                       </div> */}


//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-3">
//               No interview experiences found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewExperience;



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
  id: string;
  firstName: string;
  lastName: string;
  collegeName: string;
  graduationYear: string;
  experiences: IExperience[];
  offers: IOffer[];
}


export interface CollegeComapny {
    id: string;
    name: string;
    company: string;
  }
  

  const colleges: CollegeComapny[] = [
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



const CompanyExperience = () => {
  const [experiences, setExperiences] = useState<IExperienceSubmission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/user/InterviewExperience"
//         );
//         if (Array.isArray(response.data)) {
//           setExperiences(response.data);
//         } else {
//           setError("Invalid data format received from the server.");
//         }
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch experiences. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, []);



  const handleCardClick = (id: string) => {
    navigate(`/viewexperience/${id}`);
  };
  
  if (error) return (
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
      <div  className="space-y-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-6"
        >
          Interview Experiences
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {colleges.length > 0 ? (
            colleges.map((college, index) => (
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
            <p className="text-center col-span-2 text-gray-400">
              No interview experiences found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyExperience;