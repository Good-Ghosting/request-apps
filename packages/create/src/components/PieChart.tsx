import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { UserBalance } from "../contexts/MoneyBoxContext";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const fundsData = {
  labels: ["Money Boxes", "Safe"],
  datasets: [
    {
      label: "Funds",
      data: [50, 50],
      backgroundColor: ["#7CB9E8", "#13274F"],
      borderColor: ["rgba(124, 185, 232, 0.5)", "rgba(19, 39, 79, 0.5)"],
      borderWidth: 3,
    },
  ],
};

// const MoneyBoxData2 = {
//   labels: ["Spending", "Tax", "Saving"],
//   datasets: [
//     {
//       label: "Funds",
//       data: [30, 20, 10],
//       backgroundColor: ["#7CB9E8", "#13274F", "#5F9EA0"],
//       borderColor: [
//         "rgba(124, 185, 232, 0.5)",
//         "rgba(19, 39, 79, 0.5)",
//         "rgba(95, 158, 160, 0.2)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

export const options = {
  plugins: {
    datalabels: {
      formatter: (value: any, context: any) => {
        // Get the label and value from the context
        const label = context.chart.data.labels[context.dataIndex];
        const numString = `${value}%`;

        // Return them as an array of strings
        return [label, numString];
      },
      anchor: "center",
      align: "center",
    },
    legend: {
      display: false,
    },
  },
};

const toTwoDecimalPlaces = (num: number) => {
  return Number(num.toFixed(2));
};

const PieChart = ({
  safePercentage,
  moneyBoxPercentage,
}: {
  safePercentage: number;
  moneyBoxPercentage: number;
}) => {
  fundsData.datasets[0].data = [toTwoDecimalPlaces(moneyBoxPercentage), toTwoDecimalPlaces(safePercentage)];

  return <Pie data={fundsData} options={options as any} />;
};

export const MoneyBoxPieChart = ({
  userBalance,
}: {
  userBalance: UserBalance;
}) => {
  const backgroundColors = [
    "#7CB9E8",
    "#13274F",
    "#5F9EA0",
    "#E52B50",
    "#FFBF00",
    "#9966CC",
    "#3B7A57",
    "#FF7E00",
    "#C41E3A",
    "#8A2BE2",
  ];
  const borderColors = [
    "rgba(124, 185, 232, 0.5)",
    "rgba(19, 39, 79, 0.5)",
    "rgba(95, 158, 160, 0.2)",
    "rgba(229, 43, 80, 0.5)",
    "rgba(255, 191, 0, 0.5)",
    "rgba(153, 102, 204, 0.5)",
    "rgba(59, 122, 87, 0.5)",
    "rgba(255, 126, 0, 0.5)",
    "rgba(196, 30, 58, 0.5)",
    "rgba(138, 43, 226, 0.5)",
  ];

  const totalUSDInBoxes = userBalance.boxes.reduce((acc, boxBalance) => {
    return (
      acc +
      boxBalance.balances.reduce(
        (boxAcc, balance) => boxAcc + balance.amountUSD,
        0
      )
    );
  }, 0);

  const MoneyBoxData = {
    labels: [] as string[],
    datasets: [
      {
        label: "Funds",
        data: [] as number[],
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        borderWidth: 1,
      },
    ],
  };

  userBalance.boxes.forEach((box, index) => {
    const boxTotalUSD = box.balances.reduce(
      (boxAcc, balance) => boxAcc + balance.amountUSD,
      0
    );
    const percentage = (boxTotalUSD / totalUSDInBoxes) * 100;

    MoneyBoxData.labels.push(box.name);
    MoneyBoxData.datasets[0].data.push(toTwoDecimalPlaces(percentage));
    MoneyBoxData.datasets[0].backgroundColor.push(
      backgroundColors[index % backgroundColors.length]
    );
    MoneyBoxData.datasets[0].borderColor.push(
      borderColors[index % borderColors.length]
    );
  });

  return <Pie data={MoneyBoxData} options={options as any} />;
};

export default PieChart;
