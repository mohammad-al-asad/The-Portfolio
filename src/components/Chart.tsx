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

export type ChartPoint = { label: string; visitors: number; pageViews: number };

export default function Chart({ points }: { points: ChartPoint[] }) {
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
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#788494',
          precision: 0,
        }
      }
    }
  };

  const data = {
    labels: points.map((p) => p.label),
    datasets: [
      {
        label: 'Visitors',
        data: points.map((p) => p.visitors),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
      {
        label: 'Page Views',
        data: points.map((p) => p.pageViews),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
    ],
  };

  return <Line options={options} data={data} height={300} />;
}
