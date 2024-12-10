import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TopExpenses = ({ expenses }) => {
  // Group and sum expenses by category
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.price;
    } else {
      acc[expense.category] = expense.price;
    }
    return acc;
  }, {});

  // Create data for the bar chart
  const data = Object.keys(categorizedExpenses).map((category) => ({
    name: category,
    value: categorizedExpenses[category],
  }));

  // Sort and get top 3 categories
  const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <div className="top-expenses">
      <h3>Top Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenses;
