import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const RepeatCustomers = () => {
  const [repeatCustomersData, setRepeatCustomersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://data-visualization-qw8s.onrender.com/api/repeat-customers?interval=daily"
        );
        setRepeatCustomersData(response.data);
      } catch (error) {
        console.error("Error fetching repeat customers data", error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: repeatCustomersData.map((item) => item._id),
    datasets: [
      {
        label: "Repeat Customers",
        data: repeatCustomersData.map((item) => item.repeatCustomers),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{color:"rgba(153, 102, 255, 1)"}}>Repeat Customers Over Time</h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default RepeatCustomers;
