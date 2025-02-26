import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

interface IExperienceSubmission {
  id: string;
  firstName: string;
  lastName: string;
  collegeName: string;
  graduationYear: string;
  experiences: IExperience[];
  offers: IOffer[];
}

export default function ViewExperience() {
  const { id } = useParams<{ id: string }>();
  const [experience] = useState<IExperienceSubmission | null>(
    null
  );
  const [relatedExperiences, setRelatedExperiences] = useState<
    IExperienceSubmission[]
  >([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/InterviewExperience/${id}`,
          {
            withCredentials: true, // This ensures cookies are sent with the request
          }
        );

        console.log(response.data);
        // Fetch other experiences from the same company
        const companyName = response.data.experiences[0]?.company;
        if (companyName) {
          const relatedResponse = await axios.get(
            `${API_BASE_URL}/user/InterviewExperience?company=${companyName}`,
            {
              withCredentials: true, // Sends cookies with the request
            }
          );
          setRelatedExperiences(
            relatedResponse.data.filter(
              (exp: IExperienceSubmission) => exp.id !== id
            )
          );
        }
      } catch (err) {
        console.error("Error fetching experience:", err);
      }
    };

    fetchExperience();
  }, [id]);

  return (
    <div className="flex">
      {/* Left Sidebar - Related Experiences */}
      <div className="w-1/3 p-4 border-r">
        <h3 className="text-xl font-semibold mb-4">Other Experiences</h3>
        {relatedExperiences.map((exp) => (
          <p key={exp.id} className="cursor-pointer text-blue-500">
            {exp.firstName} {exp.lastName}
          </p>
        ))}
      </div>

      {/* Right Section - Experience Details */}
      <div className="w-2/3 p-4">
        {experience ? (
          <h2 className="text-2xl font-bold">
            {experience.firstName} {experience.lastName}'s Experience
          </h2>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
