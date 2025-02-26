import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function ExperienceForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [experiences, setExperiences] = useState<
    {
      company: string;
      year: string;
      rounds: { name: string; experience: string }[];
    }[]
  >([]);
  const [results, setResults] = useState<
    { company: string; status: string; lpa?: string }[]
  >([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const addNewExperience = () => {
    setExperiences([...experiences, { company: "", year: "", rounds: [] }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addRound = (index: number) => {
    const newExperiences = [...experiences];
    newExperiences[index].rounds.push({ name: "", experience: "" });
    setExperiences(newExperiences);
  };

  const removeRound = (expIndex: number, roundIndex: number) => {
    const newExperiences = [...experiences];
    newExperiences[expIndex].rounds.splice(roundIndex, 1);
    setExperiences(newExperiences);
  };

  const addResult = () => {
    setResults([...results, { company: "", status: "Rejected" }]);
  };

  const removeResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const submitExperience = async () => {
    const data = {
      firstName,
      lastName,
      collegeName,
      graduationYear,
      experiences,
      results,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/user/submit-experience`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log(response);

      const result = await response.json();
      if (response.ok) {
        alert("Experience saved successfully!");
        window.location.href = "/";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting experience:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Experience Form</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>First Name</Label>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <Label>College Name</Label>
          <Input
            type="text"
            placeholder="College Name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
          />
        </div>
        <div>
          <Label>Graduation Year</Label>
          <Input
            type="text"
            placeholder="Graduation Year"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4">Work Experience</h3>
      {experiences.map((exp, i) => (
        <div key={i} className="relative border p-4 mt-2 rounded-lg shadow-md">
          <button
            onClick={() => removeExperience(i)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            &times;
          </button>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => {
                const newExperiences = [...experiences];
                newExperiences[i].company = e.target.value;
                setExperiences(newExperiences);
              }}
            />
            <Input
              placeholder="Year"
              value={exp.year}
              onChange={(e) => {
                const newExperiences = [...experiences];
                newExperiences[i].year = e.target.value;
                setExperiences(newExperiences);
              }}
            />
          </div>
          {exp.rounds.map((round, j) => (
            <div key={j} className="relative mt-2 border p-2 rounded-md">
              <button
                onClick={() => removeRound(i, j)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                &times;
              </button>
              <Label>Round {j + 1}</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Round Name"
                  value={round.name}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[i].rounds[j].name = e.target.value;
                    setExperiences(newExperiences);
                  }}
                />
                <Input
                  placeholder="Experience"
                  value={round.experience}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[i].rounds[j].experience = e.target.value;
                    setExperiences(newExperiences);
                  }}
                />
              </div>
            </div>
          ))}
          <Button onClick={() => addRound(i)} className="mt-2">
            + Add Round
          </Button>
        </div>
      ))}
      <Button onClick={addNewExperience} className="mt-2">
        + Add Experience
      </Button>

      <h3 className="text-lg font-semibold mt-4">Interview Results</h3>
      {results.map((result, i) => (
        <div
          key={i}
          className="relative grid grid-cols-2 gap-4 mt-2 border p-4 rounded-lg shadow-md"
        >
          <button
            onClick={() => removeResult(i)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            &times;
          </button>
          <Input
            placeholder="Company Name"
            value={result.company}
            onChange={(e) => {
              const newResults = [...results];
              newResults[i].company = e.target.value;
              setResults(newResults);
            }}
          />
          <Select
            value={result.status}
            onValueChange={(value) => {
              const newResults = [...results];
              newResults[i].status = value;
              if (value === "Rejected") {
                delete newResults[i].lpa;
              }
              setResults(newResults);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Selected">Selected</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          {result.status === "Selected" && (
            <Input  
              placeholder="LPA Offered"
              value={result.lpa || ""}
              onChange={(e) => {
                const newResults = [...results];
                newResults[i].lpa = e.target.value;
                setResults(newResults);
              }}
            />
          )}
        </div>
      ))}
      <Button onClick={addResult} className="mt-2">
        + Add More
      </Button>

      <Button
        onClick={submitExperience}
        className="mt-4 w-full bg-blue-500 text-white"
      >
        Submit
      </Button>
    </div>
  );
}
