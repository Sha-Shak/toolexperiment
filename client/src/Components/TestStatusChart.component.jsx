import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TestStatusChartComponent({ stats }) {

  const intialChartData = { 
    labels: ['Pass', 'Passed Late', 'Fail', 'Unsubmitted'], 
    datasets: [{ 
      data: [], 
      label: 'No. of students', 
      backgroundColor: 'rgba(126, 34, 206, 1)' }] 
  };

  const [chartData, setChartData] = useState(intialChartData);

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Test Results',
      },
    },
    scales: {
      y: {
        max: stats.length,
        min: 0,
        ticks: {
          stepSize: 1
        }
      }
    },
    maintainAspectRatio: false
  };

  useEffect(() => {
    if (!stats.length) return;

    const unsubmitted = stats.filter(stat => !stat.status);
    const passed = stats.filter(stat => stat.status === 'passed');
    const latePass = stats.filter(stat => stat.status === 'passed late');
    const failed = stats.filter(stat => stat.status === 'failed');

    setChartData(prevState => ({ ...prevState, datasets: [{ ...prevState.datasets[0], data: [passed.length, latePass.length, failed.length, unsubmitted.length] }] }));
  }, [stats])


  return (
    <div className='hidden sm:block'>
      <Bar options={options} data={chartData} width={500} height={400} />
    </div>
  )
}

export default TestStatusChartComponent