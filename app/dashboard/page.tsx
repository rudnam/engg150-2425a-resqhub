"use client";
import { useEffect, useState } from "react";

import ChartComponent from "./ChartComponent";

import { getCumulativeCount } from "../firebase";
import { DataPoint } from "../types";

export default function Dashboard() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const chartData = [];

      for (let hour = 0; hour < 24; hour++) {
        const hourFormatted = ('0' + hour + ":00").slice(-5);
      
        const now = new Date();
        const currentHour = now.getHours();
        
        if (hour > currentHour) {
          chartData.push(
            {
              hour: hourFormatted,
              people: null
            }
          )
        } else {
          now.setHours(hour, 0, 0, 0);
          const count = await getCumulativeCount(now);
          chartData.push(
            {
              hour: hourFormatted,
              people: count
            }
          )
        }
      }

      setData(chartData);
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold py-8">Visualization of Trends</h1>
      <div className="max-w-4xl mx-auto">
        <ChartComponent chartData={data}/>
      </div>
    </div>
  );
}
