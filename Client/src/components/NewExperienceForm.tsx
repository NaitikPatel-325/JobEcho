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
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Plus, X } from "lucide-react";
import './componentStyles/NewExperienceForm.css'

const formSteps = ["Personal", "Experience", "Results"] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function NewExperienceForm() {
  const [step, setStep] = useState(0);
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
    { company: string; status: string; package?: string }[]
  >([]);

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
        "http://localhost:3000/user/submit-experience",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

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

  const nextStep = () => setStep((s) => Math.min(s + 1, formSteps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-3xl mx-auto"
      >
        {/* Progress Steps */}
        
        <div className="mb-8 w-full">
        <motion.div
          className="absolute -inset-2 rounded-xl"
          style={{
            background:
              "linear-gradient(45deg, #3b82f6, #60a5fa, #3b82f6, #60a5fa)",

            backgroundSize: "300% 300%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
          <div className="flex justify-between relative mb-4">
            <div className="absolute top-1/2 h-0.5 w-full bg-gray-700 -translate-y-1/2">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / (formSteps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {formSteps.map((formStep, idx) => (
              <motion.div
                key={formStep}
                variants={itemVariants}
                className="relative flex flex-col items-center gap-2 z-10"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor:
                      step >= idx ? "rgb(255, 215, 0)" : "rgb(31, 41, 55)",
                    scale: step === idx ? 1.1 : 1,
                  }}
                  className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center shadow-lg"
                >
                  <motion.span
                    initial={false}
                    animate={{
                      color: step >= idx ? "white" : "rgb(156, 163, 175)",
                    }}
                    className="text-sm font-medium"
                  >
                    {idx + 1}
                  </motion.span>
                  {step === idx && (
                    <motion.div
                      className="absolute -z-10 w-14 h-14 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      style={{
                        background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
                      }}
                    />
                  )}
                </motion.div>
                <span className="text-sm font-medium text-gray-300">
                  {formStep}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          layout
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-gray-700"
        >
            
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.1 }}
                className="space-y-6"
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">
                      College Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="College Name"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">
                      Graduation Year
                    </Label>
                    <Input
                      type="text"
                      placeholder="Graduation Year"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={addNewExperience}
                    variant="outline"
                    className="w-full bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600 transition-colors"
                    disabled={experiences.length >= 3}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Experience
                  </Button>
                </motion.div>
                <AnimatePresence>
                  {experiences.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative border border-gray-600 p-6 rounded-lg bg-gray-700/30 backdrop-blur-sm shadow-xl group"
                    >
                      <motion.button
                        onClick={() => removeExperience(i)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => {
                            const newExperiences = [...experiences];
                            newExperiences[i].company = e.target.value;
                            setExperiences(newExperiences);
                          }}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                        />
                        <Input
                          placeholder="Year"
                          value={exp.year}
                          onChange={(e) => {
                            const newExperiences = [...experiences];
                            newExperiences[i].year = e.target.value;
                            setExperiences(newExperiences);
                          }}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                        />
                      </div>
                      <AnimatePresence>
                        {exp.rounds.map((round, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="relative mt-4 border border-gray-600 p-4 rounded-md bg-gray-700/20 group/round"
                          >
                            <motion.button
                              onClick={() => removeRound(i, j)}
                              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover/round:opacity-100"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X size={16} />
                            </motion.button>
                            <Label className="text-sm font-medium text-gray-300 mb-2 block">
                              Round {j + 1}
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input
                                placeholder="Round Name"
                                value={round.name}
                                onChange={(e) => {
                                  const newExperiences = [...experiences];
                                  newExperiences[i].rounds[j].name = e.target.value;
                                  setExperiences(newExperiences);
                                }}
                                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                              />
                              <Input
                                placeholder="Experience"
                                value={round.experience}
                                onChange={(e) => {
                                  const newExperiences = [...experiences];
                                  newExperiences[i].rounds[j].experience = e.target.value;
                                  setExperiences(newExperiences);
                                }}
                                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => addRound(i)}
                          variant="outline"
                          className="mt-4 w-full bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600 transition-colors group"
                          disabled={exp.rounds.length >= 4}
                        >
                          <Plus size={16} className="mr-2 group-hover:rotate-180 transition-transform duration-300" />
                          Add Round
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={addResult}
                    variant="outline"
                    className="w-full bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600 transition-colors"
                    disabled={results.length >= experiences.length}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Result
                  </Button>
                </motion.div>
                <AnimatePresence>
                  {results.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative border border-gray-600 p-6 rounded-lg bg-gray-700/30 backdrop-blur-sm shadow-xl group"
                    >
                      <motion.button
                        onClick={() => removeResult(i)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">
                            Company
                          </Label>
                          <Input
                            placeholder="Company Name"
                            value={result.company}
                            onChange={(e) => {
                              const newResults = [...results];
                              newResults[i].company = e.target.value;
                              setResults(newResults);
                            }}
                            className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">
                            Status
                          </Label>
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
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                              <SelectValue placeholder="Result" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Selected">Selected</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {result.status === "Selected" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 col-span-2"
                          >
                            <Label className="text-sm font-medium text-gray-300">
                              LPA Offered
                            </Label>
                            <Input
                              placeholder="LPA Offered"
                              value={result.lpa || ""}
                              onChange={(e) => {
                                const newResults = [...results];
                                newResults[i].lpa = e.target.value;
                                setResults(newResults);
                              }}
                              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div layout className="flex justify-between mt-8 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 0}
                className="flex items-center gap-2 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {step === formSteps.length - 1 ? (
                <Button
                  onClick={submitExperience}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
                  disabled={results.length === 0}
                >
                  Submit
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
                  // disabled={firstName === "" || lastName === "" || collegeName === "" || graduationYear === "" }
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}