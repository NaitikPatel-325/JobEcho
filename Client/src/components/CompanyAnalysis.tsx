import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import type { IExperienceSubmission } from "@/pages/InterviewExperience";

export default function CompanyAnalysis() {
  const [company, setCompany] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<IExperienceSubmission[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const cleanAnalysisText = (text:any) => {
    return text.replace(/[*_~`]/g, "").replace(/([.!?])\s*/g, "$1\n");
  };

  const fetchReviews = async (id: string) => {
    setReviewsLoading(true);
    setReviewsError(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/experience/get-experience-by-company/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviewsError("Invalid reviews data from server.");
      }
    } catch (err) {
      setReviewsError("Error fetching reviews. Please try again.");
    } finally {
      setReviewsLoading(false);
    }
  };

  const fetchAnalysis = async () => {
    if (!company) return;
    setLoading(true);

    try {
      const companyResponse = await fetch(
        `${API_BASE_URL}/company/getbyname/${company}`,
        {
          method: "GET",
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
      setCompanyId(companyId);

      const analysisResponse = await fetch(
        `${API_BASE_URL}/user/getaipowerdanalysis/${companyId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const analysisData = await analysisResponse.json();

      console.log("Raw Analysis Data:", analysisData);

      if (!analysisData || !analysisData.analysis) {
        setAnalysis("⚠️ No analysis found for this company.");
      } else {
        setAnalysis(cleanAnalysisText(analysisData.analysis));
      }

      // Automatically fetch all reviews/experiences for this company
      await fetchReviews(companyId);
    } catch (error) {
      console.error("Error fetching analysis:", error);
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
              🧠 Interview Analysis & Reviews
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

            {companyId && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Community Reviews
                  </h3>
                  {reviewsLoading && (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                  )}
                </div>

                {reviewsError && (
                  <p className="text-sm text-red-500">{reviewsError}</p>
                )}

                {!reviewsLoading && !reviewsError && reviews.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No reviews found for this company yet.
                  </p>
                )}

                {!reviewsLoading && reviews.length > 0 && (
                  <div className="mt-2 space-y-3 max-h-64 overflow-y-auto pr-1">
                    {reviews.map((exp) => (
                      <div
                        key={exp.id}
                        className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
                      >
                        <p className="text-sm font-semibold text-gray-900">
                          {exp.firstName} {exp.lastName} •{" "}
                          <span className="text-gray-600">
                            {exp.collegeName} ({exp.graduationYear})
                          </span>
                        </p>
                        {exp.experiences?.[0] && (
                          <p className="text-xs text-gray-700 mt-1">
                            <span className="font-medium">Latest:</span>{" "}
                            {typeof (exp.experiences[0] as any).company === "string"
                              ? (exp.experiences[0] as any).company
                              : (exp.experiences[0] as any).company?.name}{" "}
                            •{" "}
                            {exp.experiences[0].year}
                          </p>
                        )}
                        {exp.offers?.[0] && (
                          <p className="text-xs text-gray-700 mt-1">
                            <span className="font-medium">Status:</span>{" "}
                            {exp.offers[0].status}
                            {exp.offers[0].package &&
                              ` • ${exp.offers[0].package} LPA`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
