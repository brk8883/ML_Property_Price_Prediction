import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const ChartComponent = ({ actualPrices = [], predictedPrices = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("chartCanvas");

    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: actualPrices.map((_, index) => `House ${index + 1}`),
        datasets: [
          { label: "Actual Price ($1000s)", data: actualPrices, borderColor: "black", backgroundColor: "rgba(0, 0, 0, 0.1)", tension: 0.3 },
          { label: "Predicted Price ($1000s)", data: predictedPrices, borderColor: "brown", backgroundColor: "rgba(165, 42, 42, 0.1)", tension: 0.3 }
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
