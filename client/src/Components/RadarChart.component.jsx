import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarChartComponent({ marks }) {

  const defaultData = {
    labels: [
      'Positive Attitude',
      'Productivity',
      'Autonomy',
      'Communication',
      'Teamwork',
      'Self Improvement',
      'Open Mindedness',
      'Curiosity',
      'Clean Code',
      'Efficient Code',
      'Reliable Code',
      'Javascript',
      'Back-end',
      'Database',
      'Front-end'
    ],
    datasets: [{
      label: 'Marks',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fill: true,
      backgroundColor: 'rgba(192, 132, 252, 0.2)',
      borderColor: 'rgba(192, 132, 252, 1)',
      pointBackgroundColor: 'rgba(192, 132, 252, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(192, 132, 252, 1)'
    }],
  }

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        min: 0
      }
    }
  }

  const [data, setData] = useState(defaultData);

  function filterMarks() {
    const fields = defaultData.labels.slice(0, Object.keys(marks).length);
    const camelCaseFields = fields.map(field => {
      let concatField = field.split(' ').join('');
      const removedHyphenArr = concatField.split('-').map((word, index) => {
        if (index > 0) word = word[0].toUpperCase() + word.slice(1);
        return word;
      });

      concatField = removedHyphenArr.join('');
      return concatField[0].toLowerCase() + concatField.slice(1);
    });

    const scores = camelCaseFields.map(field => marks[field]);
    const newDataset = { ...defaultData.datasets[0], data: scores }

    setData((prevState) => ({ ...prevState, labels: fields, datasets: [newDataset] }));
  }

  useEffect(() => {
    filterMarks();
  }, [marks]);

  return (
    <Radar data={data} options={options} />
  )
}

export default RadarChartComponent