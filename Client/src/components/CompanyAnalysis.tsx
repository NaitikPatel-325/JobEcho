import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CompanyAnalysis() {
  const [company, setCompany] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const cleanAnalysisText = (text:any) => {
    return text
      .replace(/[*_~`]/g, "") // Remove special symbols
      .replace(/([.!?])\s*/g, "$1\n"); // Add new lines after punctuation
  };

  const fetchAnalysis = async () => {
    if (!company) return;
    setLoading(true);

    try {
      const companyResponse = await fetch(
        `https://jobecho-iex4.onrender.com/company/getbyname/${company}`,
        {
          method : "GET",
          credentials: "include", 
        }
      );
      const companyData = await companyResponse.json();
      console.log("Company Data:", companyData);

      if (!companyData || !companyData._id) {
        setAnalysis("❌ Company not found. Please try another name.");
        setLoading(false);
        return;
      }

      const companyId = companyData._id;

      const analysisResponse = await fetch(
        `https://jobecho-iex4.onrender.com/user/getaipowerdanalysis/${companyId}`,{
          method : "GET",
          credentials: "include",
        }
      );
      const analysisData = await analysisResponse.json();

      console.log("Raw Analysis Data:", analysisData);

      const cleanedAnalysis = cleanAnalysisText(analysisData.analysis);
      setAnalysis(cleanedAnalysis);
    } catch (error) {
      setAnalysis("⚠️ Error fetching analysis. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg flex flex-col"
      >
        <Card className="shadow-lg rounded-2xl border-none">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              🧠 Interview Analysis Chatbot
            </h2>
            <p className="text-center text-gray-600 mt-2">
              Enter a company name to get AI-powered insights on their interview process.
            </p>
            <div className="mt-4 flex space-x-2">
              <Input
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="flex-1 bg-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
              <Button
                onClick={fetchAnalysis}
                className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Get Analysis"}
              </Button>
            </div>
            {analysis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 max-h-64 overflow-y-auto p-4 bg-gray-100 rounded-lg text-gray-800 whitespace-pre-wrap text-sm"
              >
                {analysis}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
