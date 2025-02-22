import { College } from "./collage";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface CollegeCardProps {
  college: College;
  isSelected: boolean;
}

export const CollegeCard = ({ college, isSelected }: CollegeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-xl backdrop-blur-sm ${
        isSelected
          ? "bg-white/10 border-2 border-white/20"
          : "bg-white/5 hover:bg-white/10 border border-white/10"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{college.name}</h3>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm">{college.rating}</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">{college.description}</p>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-300">
          <span className="font-medium">Location:</span>
          <span className="ml-2">{college.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <span className="font-medium">Founded:</span>
          <span className="ml-2">{college.founded}</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Popular Courses:</p>
        <div className="flex flex-wrap gap-2">
          {college.courses.slice(0, 3).map((course, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};