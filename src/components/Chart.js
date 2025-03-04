import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const ChartComponent = ({ actualPrices = [], predictedPrices = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("chartCanvas");

    // ✅ Destroy previous chart instance before creating a new one
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: actualPrices.map((_, index) => `House ${index + 1}`),
        datasets: [
          { label: "Actual Price ($1000)", data: actualPrices, backgroundColor: "black" },
          { label: "Predicted Price ($1000)", data: predictedPrices, backgroundColor: "brown" }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });

    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
    };
  }, [actualPrices, predictedPrices]);

  return <canvas id="chartCanvas"></canvas>;
};

export default ChartComponent;
