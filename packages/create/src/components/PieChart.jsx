import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const fundsData = {
  labels: ['Money Boxes', 'Unallocated'],
  datasets: [
    {
      label: 'Funds',
      data: [80, 20],
      backgroundColor: [
        '#7CB9E8',
        '#13274F',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 102, 335, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

const MoneyBoxData = {
    labels: ['Spending', 'Tax', 'Saving'],
    datasets: [
      {
        label: 'Funds',
        data: [30, 20, 10],
        backgroundColor: [
          '#7CB9E8',
          '#13274F',
          '#5F9EA0',
        ],
        borderColor: [
          'rgba(124, 185, 232, 0.5)',
          'rgba(19, 39, 79, 0.5)',
          'rgba(95, 158, 160, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
}

export const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
            // Get the label and value from the context
            const label = context.chart.data.labels[context.dataIndex];
            const numString = `${value}%`

            // Return them as an array of strings
            return [label, numString];
        },
        anchor: 'center',
        align: 'center',
      },
      legend: {
        display: false
    }
    },
  };


const PieChart = () => {
    return (
        <Pie data={fundsData} options={options} />
    )
}

export const MoneyBoxPieChart = () => (
    <Pie data={MoneyBoxData} options={options} />
) 


export default PieChart;
