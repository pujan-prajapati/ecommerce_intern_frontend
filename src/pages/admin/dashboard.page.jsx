import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Import the icons
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    totalSales: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    outOfStockProducts: 0,
  });

  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const generateRandomStats = () => {
      setStats({
        totalUsers: Math.floor(Math.random() * 1000 + 500),
        newUsers: Math.floor(Math.random() * 100 + 10),
        totalSales: Math.floor(Math.random() * 100000 + 10000),
        totalOrders: Math.floor(Math.random() * 500 + 100),
        pendingOrders: Math.floor(Math.random() * 50 + 5),
        totalProducts: Math.floor(Math.random() * 1000 + 300),
        outOfStockProducts: Math.floor(Math.random() * 100 + 1),
      });
    };

    const generateSalesData = () => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const data = months.map((month) => ({
        month,
        sales: Math.floor(Math.random() * 10000 + 1000), // Random sales data
      }));
      setSalesData(data);
    };

    generateRandomStats();
    generateSalesData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-7">Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500 shadow-md w-full h-52 rounded-lg flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
          <p className="text-sm">New: {stats.newUsers}</p>
        </div>

        <div className="bg-green-500 shadow-md w-full h-52 rounded-lg flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-4xl font-bold">${stats.totalSales}</p>
          <p className="text-sm">This Month</p>
        </div>

        <div className="bg-yellow-500 shadow-md w-full h-52 rounded-lg flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
          <p className="text-sm">Pending: {stats.pendingOrders}</p>
        </div>

        <div className="bg-red-500 shadow-md w-full h-52 rounded-lg flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-4xl font-bold">{stats.totalProducts}</p>
          <p className="text-sm">Out of Stock: {stats.outOfStockProducts}</p>
        </div>
      </section>

      {/* Sales Graph */}
      <section className="mt-10 bg-gray-100 p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Monthly Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Social Media Links */}
      <section className="mt-10 flex justify-center gap-5">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-4 rounded-full text-white hover:bg-blue-700"
        >
          <FaFacebookF size={30} />
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-600 p-4 rounded-full text-white hover:bg-pink-700"
        >
          <FaInstagram size={30} />
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-800 p-4 rounded-full text-white hover:bg-blue-900"
        >
          <FaLinkedinIn size={30} />
        </a>
      </section>
    </>
  );
};
