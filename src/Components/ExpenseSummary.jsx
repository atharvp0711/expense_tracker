// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Group A', value: 500 },
//   { name: 'Group B', value: 200 },
//   { name: 'Group C', value: 200 },
//   { name: 'Group D', value: 100 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const ExpenseSummary = () => {
//     return(
//         <div className = "expense-summary">
//           <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={renderCustomizedLabel}
//               outerRadius={80}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//           </PieChart>
//                 </ResponsiveContainer>
//         </div>
//     )
// }

// export default ExpenseSummary


import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import './ExpenseSummary.css'; 

// Sample colors for each category
const COLORS = ["#0088FE", "#00C49F", "#FFBB28","#34ebdf", "#eb3434", "#eb34d3", "#FF8042"];

const ExpenseSummary = ({ expenses }) => {
  // Step 1: Categorize and sum up expenses
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.price;
    } else {
      acc[expense.category] = expense.price;
    }
    return acc;
  }, {});

  // Step 2: Create an array of data for the Pie chart
  const data = Object.keys(categorizedExpenses).map((category) => ({
    name: category,
    value: categorizedExpenses[category],
  }));

  // Step 3: Calculate total expense for displaying
  const totalExpense = expenses.reduce((total, expense) => total + expense.price, 0);

  // Render Pie chart and summary
  return (
    <div className="expense-summary">
      <ResponsiveContainer width="100%" height={200}>
      <h3>Total Expense: ₹{totalExpense}</h3>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
      </ResponsiveContainer>
      <div className="category-summary">
        {data.map((entry, index) => (
          <div key={index} className="category-item">
            <div
              className="category-color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span>{entry.name}: ₹{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseSummary;
