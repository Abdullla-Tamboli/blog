import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API_URL = "https://blog-application-vh8n.onrender.com/api";
const COLORS = ["#8884d8", "#82ca9d"];

const GraphStats = () => {
  const [data, setData] = useState([]);
  const [totalStats, setTotalStats] = useState(null);
  const [chartType, setChartType] = useState("line"); // switch between 'line' or 'pie'

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const posts = res.data;
        const graphData = posts.map((post) => ({
          name: post.title.substring(0, 10) + "...",
          Likes: post.likes.length,
          Comments: post.comments.length,
        }));

        // For pie chart total
        const totalLikes = graphData.reduce((acc, post) => acc + post.Likes, 0);
        const totalComments = graphData.reduce((acc, post) => acc + post.Comments, 0);
        setTotalStats([
          { name: "Likes", value: totalLikes },
          { name: "Comments", value: totalComments },
        ]);

        setData(graphData);
      } catch (err) {
        console.error("Graph stats fetch error:", err);
      }
    };
    fetchStats();
  }, [user.id, token]);

  return (
    <div className="my-8 p-4 border rounded shadow bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">📊 Your Post Stats</h3>
        <button
          onClick={() => setChartType(chartType === "line" ? "pie" : "line")}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Switch to {chartType === "line" ? "Pie" : "Line"}
        </button>
      </div>

      {data.length === 0 ? (
        <p>No posts to display graph.</p>
      ) : chartType === "line" ? (
        <ResponsiveContainer width="50%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Likes" stroke="#8884d8" />
            <Line type="monotone" dataKey="Comments" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={totalStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {totalStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GraphStats;
