import { useEffect } from "react";
import Plotly from "plotly.js-dist";

const SunburstChart = () => {
  useEffect(() => {
    const sampleData = {
      labels: [
        "root",
        "Engineering",
        "Computer Science",
        "Mechanical",
        "Civil",
        "Management",
        "MBA",
        "MBATech",
        "MTech",
        "BBA",
        "Science",
        "Physics",
        "Mathematics",
      ],
      parents: [
        "",
        "root",
        "Engineering",
        "Engineering",
        "Engineering",
        "root",
        "Management",
        "MBA",
        "MBA",
        "Management",
        "root",
        "Science",
        "Science",
      ],
      values: [0, 0, 30, 20, 15, 0, 0, 12, 21, 10, 0, 18, 22],
    };

    const chartData = [
      {
        type: "sunburst",
        labels: sampleData.labels,
        parents: sampleData.parents,
        values: sampleData.values,
        outsidetextfont: { size: 20, color: "#377eb8" },
        leaf: { opacity: 0.4 },
        marker: { line: { width: 2 } },
      },
    ];

    const layout = {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      width: 500,
      height: 500,
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
    };

    Plotly.newPlot("myDiv", chartData, layout);
  }, []);

  return <div id="myDiv"></div>;
};

export default SunburstChart;
