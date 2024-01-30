import React, { useEffect, useState } from 'react';
import './wineDataTable.css'
const WineStatsTable = ({ wineData }) => {
  const [statsFlavanoids, setStatsFlavanoids] = useState([]);
  const [statsGamma, setStatsGamma] = useState([]);

  useEffect(() => {
    calculateStatistics('Flavanoids', setStatsFlavanoids);
    calculateGamma();
  }, [wineData]);

  const calculateStatistics = (property, setStats) => {
    const classes = [...new Set(wineData.map((wine) => wine.Alcohol))];
    const measures = ['Mean', 'Median', 'Mode'];

    const classStats = classes.map((currentClass) => {
      const classData = wineData.filter((wine) => wine.Alcohol === currentClass);

      const measureStats = measures.map((measure) => {
        const values = classData.map((wine) => parseFloat(wine[property]));

        let result;
        switch (measure) {
          case 'Mean':
            result = calculateMean(values);
            break;
          case 'Median':
            result = calculateMedian(values);
            break;
          case 'Mode':
            result = calculateMode(values);
            break;
          default:
            result = '';
        }

        return result.toFixed(3);
      });

      return { class: currentClass, stats: measureStats };
    });

    setStats(classStats);
  };

  const calculateGamma = () => {
    const classes = [...new Set(wineData.map((wine) => wine.Alcohol))];
    const measures = ['Mean', 'Median', 'Mode'];

    const classStats = classes.map((currentClass) => {
      const classData = wineData.filter((wine) => wine.Alcohol === currentClass);

      const measureStats = measures.map((measure) => {
        const values = classData.map((wine) => calculateGammaValue(wine));

        let result;
        switch (measure) {
          case 'Mean':
            result = calculateMean(values);
            break;
          case 'Median':
            result = calculateMedian(values);
            break;
          case 'Mode':
            result = calculateMode(values);
            break;
          default:
            result = '';
        }

        return result.toFixed(3);
      });

      return { class: currentClass, stats: measureStats };
    });

    setStatsGamma(classStats);
  };

  const calculateMean = (values) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const calculateMedian = (values) => {
    const sortedValues = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
      return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
    } else {
      return sortedValues[middle];
    }
  };

  const calculateMode = (values) => {
    const frequencyMap = {};
    values.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    let mode;
    let maxFrequency = 0;

    for (const [value, frequency] of Object.entries(frequencyMap)) {
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        mode = parseFloat(value);
      }
    }

    return mode;
  };

  const calculateGammaValue = (wine) => {
    const { Ash, Hue, Magnesium } = wine;
    return (Ash * Hue) / Magnesium;
  };

  return (
    <div>
      <h2>Flavanoids Statistics</h2>
      <table className="border-table">
        <thead>
          <tr>
            <th>Measure</th>
            {statsFlavanoids.map((classStat) => (
              <th key={classStat.class}>Class {classStat.class}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['Mean', 'Median', 'Mode'].map((measure, index) => (
            <tr key={index}>
              <td>{`Flavanoids (${measure})`}</td>
              {statsFlavanoids.map((classStat) => (
                <td key={`${classStat.class}-${measure}`}>{classStat.stats[index]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Gamma Statistics</h2>
      <table className="border-table">
        <thead>
          <tr>
            <th>Measure</th>
            {statsGamma.map((classStat) => (
              <th key={classStat.class}>Class {classStat.class}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['Mean', 'Median', 'Mode'].map((measure, index) => (
            <tr key={index}>
              <td>{`Gamma (${measure})`}</td>
              {statsGamma.map((classStat) => (
                <td key={`${classStat.class}-${measure}`}>{classStat.stats[index]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WineStatsTable;