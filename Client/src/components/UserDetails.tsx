import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from "@/redux/slices/api";
import Home from "@/pages/Home";

export default function UserDetails() {
  const [collegeName, setCollegeName] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [branch, setBranch] = useState("");
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  const navigate = useNavigate();
  const [updateUserDetails] = useUpdateUserDetailsMutation();
  const { data, isSuccess } = useGetUserDetailsQuery();

  useEffect(() => {
    setIsFormLoaded(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isSuccess) {
        await updateUserDetails({
          email: data?.email,
          collegeName,
          collegeLocation,
          graduationYear: Number(graduationYear),
          branch,
        }).unwrap();
        alert("User details updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user details.");
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isFormLoaded ? "backdrop-blur-sm" : ""}`}>
      <Card className="relative w-[1000px] overflow-hidden p-8">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Enter your academic details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-8">
              <div className="flex justify-between gap-8">
                <div className="flex flex-col space-y-1.5 w-2/3">
                  <Label htmlFor="college">College Name</Label>
                  <Select onValueChange={setCollegeName}>
                    <SelectTrigger id="college" className="w-full">
                      <SelectValue placeholder="Select College" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {[
                        "Dharmsinh Desai University",
                        "Nirma University",
                        "DAIICT",
                      ].map((college, index) => (
                        <SelectItem key={index} value={college}>
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5 w-1/3">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter Location"
                    value={collegeLocation}
                    onChange={(e) => setCollegeLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-8">
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Label htmlFor="grad-year">Graduation Year</Label>
                  <Input
                    id="grad-year"
                    type="number"
                    placeholder="Enter Graduation Year"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select onValueChange={setBranch}>
                    <SelectTrigger id="branch" className="w-full">
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {[
                        "Computer Engineering",
                        "IT",
                        "Electrical",
                        "Mechanical",
                      ].map((branch, index) => (
                        <SelectItem key={index} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <CardFooter className="flex justify-end mt-4">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
        <BorderBeam duration={8} size={100} />
      </Card>
    </div>
  );
  
}