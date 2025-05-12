import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TagChart = ({ deckId }) => {
  const [chartData, setChartData] = useState(null);
  const [singleTags, setSingleTags] = useState([]);
  const [doubleTags, setDoubleTags] = useState([]);
  const [showSingles, setShowSingles] = useState(false);
  const [showDoubles, setShowDoubles] = useState(false);

  useEffect(() => {
    fetch(`/decks/${deckId}/tag_summary`)
      .then((res) => res.json())
      .then((summary) => {
        const filtered = Object.entries(summary).reduce(
          (acc, [tag, count]) => {
            if (count > 2) {
              acc.chart.labels.push(tag);
              acc.chart.counts.push(count);
            } else if (count === 2) {
              acc.doubles.push(tag);
            } else {
              acc.singles.push(tag);
            }
            return acc;
          },
          { chart: { labels: [], counts: [] }, singles: [], doubles: [] }
        );

        setChartData({
          labels: filtered.chart.labels,
          datasets: [
            {
              label: "Tag Frequency",
              data: filtered.chart.counts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });

        setSingleTags(filtered.singles);
        setDoubleTags(filtered.doubles);
      });
  }, [deckId]);

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const chart = elements[0].element.$context.chart;
        const index = elements[0].index;
        const tag = chart.data.labels[index];
  
        // Define your desired URL behavior
        const tagSlug = tag.toLowerCase().replace(/\s+/g, "-"); // "burn spell" → "burn-spell"
        const tagUrl = `https://tagger.scryfall.com/tags/card/${tagSlug}`;
  
        window.open(tagUrl, "_blank");
      }
    }
  };

  return (
    <div>
      {chartData ? (
        <Bar data={chartData} options={options} height={chartData.labels.length * 10}/>
      ) : (
        <p>Loading chart...</p>
      )}

      {doubleTags.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => setShowDoubles(!showDoubles)}
          >
            Tags (count = 2) {showDoubles ? "▼" : "▶"}
          </h4>
          {showDoubles && (
            <ul>
              {doubleTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {singleTags.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => setShowSingles(!showSingles)}
          >
            Tags (count = 1) {showSingles ? "▼" : "▶"}
          </h4>
          {showSingles && (
            <ul>
              {singleTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TagChart;
