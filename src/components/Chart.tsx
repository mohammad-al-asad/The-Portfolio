'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#788494',
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#788494',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#788494',
        }
      }
    }
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Visitors',
        data: [6500, 8100, 7200, 9800, 11500, 10500, 13200],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
      {
        label: 'Page Views',
        data: [12000, 15000, 14200, 16500, 18000, 19500, 22000],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
    ],
  };

  return <Line options={options} data={data} height={300} />;
}