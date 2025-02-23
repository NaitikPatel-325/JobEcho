import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import "ag-charts-enterprise";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function getData(): any[] {
  return [
    { age: 20 },
    { age: 25 },
    { age: 19 },
  ];
}

export default function Histogram() {
  const [histdata, setHistData] = useState<any[]>(getData());

  const company_ids = useSelector(
    (state: RootState) => state.appSlice.college.company_id
  );

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const responses = await Promise.all(
          company_ids.map(async (companyId) => {
            const response = await fetch(
              `http://localhost:3000/experience/get-avg-package/${companyId}`
            );
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            return { age: data.data.avgPackage }; // Ensure key matches `xKey`
          })
        );
        setHistData(responses);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    if (company_ids.length > 0) {
      fetchColleges();
    }
  }, [company_ids]);

  const options: AgChartOptions = {
    title: {
      text: "Average Package Histogram",
    },
    data: histdata,
    series: [
      {
        type: "histogram",
        xKey: "age", // Ensure this matches data structure
        xName: "Average Package",
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        title: { text: "Salary Range" },
        interval: { step: 2 },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Number of Companies" },
      },
    ],
  };

  return <AgCharts options={options as any} />;
}
