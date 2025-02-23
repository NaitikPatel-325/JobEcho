import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import "ag-charts-enterprise";
import { useSearchParams } from "react-router-dom";

export default function Histogram() {
  const [searchParams] = useSearchParams();
  const [histdata, setHistData] = useState<any[]>([]);
  const companyId = searchParams.get("id");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/expereince/get-avg-package/${companyId}`
        );
        if (!response.ok) throw new Error("Failed to fetch colleges");
        const data = await response.json();
        setHistData([{ age: data.data.avgPackage }]);
      } catch (err) {
        console.log(err);
      }
    };

    if (companyId) {
      fetchColleges();
    }
  }, [companyId]);

  const [options] = useState<AgChartOptions>({
    title: {
      text: "Race Demographics",
    },
    data: histdata,
    series: [
      {
        type: "histogram",
        xKey: "age",
        xName: "Participant Age",
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        title: { text: "Age Band (Years)" },
        interval: { step: 2 },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Number of Participants" },
      },
    ],
  });

  return <AgCharts options={options as any} />;
}
