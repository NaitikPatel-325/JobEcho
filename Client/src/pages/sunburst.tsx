import { useEffect, useState } from "react";
import Plotly from "plotly.js-dist";

const SunburstChart = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    parents: string[];
    values: number[];
  } | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all colleges
        const response = await fetch(
          `${API_BASE_URL}/user/getallCollages`, {
            method: "GET", 
            credentials: "include" // Allows cookies to be sent with the request
        }
        );
        if (!response.ok) throw new Error("Failed to fetch colleges");
        const colleges = await response.json();

        const labels: string[] = ["root"];
        const parents: string[] = [""];
        const values: number[] = [0];

        // Fetch companies for each college
        const companyPromises = colleges.map(async (college: any) => {
          const companyResponse = await fetch(
            `${API_BASE_URL}/user/getCollegesandcompany/${college._id}`, {
              method: "GET", 
              credentials: "include" // Allows cookies to be sent with the request
          }
          );
          if (!companyResponse.ok) return [];
          return companyResponse.json();
        });

        const companyData = await Promise.all(companyPromises);

        // Process data into labels, parents, values
        colleges.forEach((college: any, index: number) => {
          labels.push(college.collegeName);
          parents.push("root");
          values.push(10); // Arbitrary value for college

          (companyData[index] || []).forEach((company: any) => {
            labels.push(company.name);
            parents.push(college.collegeName);
            values.push(5); // Arbitrary value for company
          });
        });

        setChartData({ labels, parents, values });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartData) return;

    const { labels, parents, values } = chartData;

    Plotly.newPlot(
      "myDiv",
      [
        {
          type: "sunburst",
          labels,
          parents,
          values,
          textfont: { size: 20, color: "#377eb8" },
          marker: { line: { width: 2 } },
        },
      ],
      {
        margin: { l: 0, r: 0, b: 0, t: 0 },
        width: 600,
        height: 600,
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
      }
    );
  }, [chartData]);

  return <div id="myDiv"></div>;
};

export default SunburstChart;
