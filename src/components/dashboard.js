'use client';

import { FaCar, FaBatteryFull, FaPlug } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard({ evData }) {
  const totalEVs = evData.length;

  const byType = evData.reduce((acc, row) => {
    acc[row['Electric Vehicle Type']] = (acc[row['Electric Vehicle Type']] || 0) + 1;
    return acc;
  }, {});

  const modelYears = evData.reduce((acc, row) => {
    acc[row['Model Year']] = (acc[row['Model Year']] || 0) + 1;
    return acc;
  }, {});

  const makes = evData.reduce((acc, row) => {
    acc[row.Make] = (acc[row.Make] || 0) + 1;
    return acc;
  }, {});

  const counties = evData.reduce((acc, row) => {
    acc[row.County] = (acc[row.County] || 0) + 1;
    return acc;
  }, {});

  const electricRanges = evData.filter(row => row['Electric Range'] > 0).map(row => row['Electric Range']);
  const prices = evData.filter(row => row['Base MSRP'] > 0).map(row => row['Base MSRP']);

  const dataByYear = {
    labels: Object.keys(modelYears),
    datasets: [{
      label: 'Count of EVs by Model Year',
      data: Object.values(modelYears),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const dataByMake = {
    labels: Object.keys(makes),
    datasets: [{
      label: 'Distribution of EVs by Make',
      data: Object.values(makes),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  const dataByCounty = {
    labels: Object.keys(counties),
    datasets: [{
      label: 'Count of EVs by County',
      data: Object.values(counties),
      backgroundColor: 'rgba(255, 206, 86, 0.6)',
    }],
  };

  const pieData = {
    labels: Object.keys(byType),
    datasets: [{
      data: Object.values(byType),
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
    }],
  };

  // Calculate the average MSRP by Model Year
  const avgMSRPByYear = Object.entries(modelYears).map(([year]) => {
    const yearData = evData.filter(row => row['Model Year'] === year && row['Base MSRP'] > 0);
    const avgMSRP = yearData.reduce((sum, row) => sum + row['Base MSRP'], 0) / yearData.length || 0;
    return { year, avgMSRP };
  }).filter(item => item.avgMSRP > 0);

  // Data for the new chart showing Average MSRP by Model Year
  const dataByYearPrice = {
    labels: avgMSRPByYear.map(item => item.year),
    datasets: [{
      label: 'Average Base MSRP by Model Year',
      data: avgMSRPByYear.map(item => item.avgMSRP),
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
    }],
  };

  const priceCounts = prices.reduce((acc, price) => {
    const priceRange = Math.floor(price / 5000) * 5000;
    acc[priceRange] = (acc[priceRange] || 0) + 1;
    return acc;
  }, {});

  const dataByPrice = {
    labels: Object.keys(priceCounts).map(range => `$${range} - $${parseInt(range) + 5000}`),
    datasets: [{
      label: 'Count of EVs by Price Range',
      data: Object.values(priceCounts),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }],
  };

  // Define options for each chart with specific x-axis labels
  const optionsByYear = {
    responsive: true,
    plugins: {
      legend: {
        onClick: null, // Disable toggle on legend click
      },
    },
    scales: {
      x: { 
        title: { 
          display: true, 
          text: 'Model Year',
          font: { weight: 'bold' }
        }
      },
      y: { 
        title: { 
          display: true, 
          text: 'Count of EVs',
          font: { weight: 'bold' }
        }
      },
    },
  };
  
  const optionsByMake = {
    responsive: true,
    plugins: {
      legend: {
        onClick: null, // Disable toggle on legend click
      },
    },
    scales: {
      x: { 
        title: { 
          display: true, 
          text: 'Make',
          font: { weight: 'bold' }
        }
      },
      y: { 
        title: { 
          display: true, 
          text: 'Count of EVs',
          font: { weight: 'bold' }
        }
      },
    },
  };
  
  const optionsByCounty = {
    responsive: true,
    plugins: {
      legend: {
        onClick: null, // Disable toggle on legend click
      },
    },
    scales: {
      x: { 
        title: { 
          display: true, 
          text: 'County',
          font: { weight: 'bold' }
        }
      },
      y: { 
        title: { 
          display: true, 
          text: 'Count of EVs',
          font: { weight: 'bold' }
        }
      },
    },
  };
  
  const optionsByYearPrice = {
    responsive: true,
    plugins: {
      legend: {
        onClick: null, // Disable toggle on legend click
      },
    },
    scales: {
      x: { 
        title: { 
          display: true, 
          text: 'Model Year',
          font: { weight: 'bold' }
        }
      },
      y: { 
        title: { 
          display: true, 
          text: 'Average Base MSRP',
          font: { weight: 'bold' }
        }
      },
    },
  };
  
  const optionsByPrice = {
    responsive: true,
    plugins: {
      legend: {
        onClick: null, // Disable toggle on legend click
      },
    },
    scales: {
      x: { 
        title: { 
          display: true, 
          text: 'Price Range',
          font: { weight: 'bold' }
        }
      },
      y: { 
        title: { 
          display: true, 
          text: 'Count of EVs',
          font: { weight: 'bold' }
        }
      },
    },
  };
  
  return (
    <div className="container mx-auto p-6 bg-white ">
      <h1 className="text-3xl font-bold mb-6 text-center">Electric Vehicle Dashboard</h1>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">Summary Statistics</h2>
        <div className="flex justify-around mb-4">
          <div className="flex items-center">
            <FaCar className="text-2xl mr-2" />
            <p className="text-lg">Total EVs: <span className="font-bold">{totalEVs}</span></p>
          </div>
          <div className="flex items-center">
            <FaBatteryFull className="text-2xl mr-2" />
            <p className="text-lg">BEVs: <span className="font-bold">{byType['Battery Electric Vehicle (BEV)'] || 0}</span></p>
          </div>
          <div className="flex items-center">
            <FaPlug className="text-2xl mr-2" />
            <p className="text-lg">PHEVs: <span className="font-bold">{byType['Plug-in Hybrid Electric Vehicle (PHEV)'] || 0}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">EVs by Model Year</h2>
          <Bar data={dataByYear} options={optionsByYear} />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">EVs by Make</h2>
          <Bar data={dataByMake} options={optionsByMake} />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">EVs by County</h2>
          <Bar data={dataByCounty} options={optionsByCounty} />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Average Base MSRP by Model Year</h2>
          <div style={{ maxHeight: '300px' }}>
            <Bar data={dataByYearPrice} options={optionsByYearPrice} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">EV Eligibility (CAFV)</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow flex justify-center">
          <div style={{ width: '250px', height: '250px' }}>
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Count of EVs by Price Range</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <div style={{ height: 'auto' }}>
            <Bar data={dataByPrice} options={optionsByPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
