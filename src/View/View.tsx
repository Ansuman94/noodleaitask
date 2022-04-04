import React from "react";
import "./View.css";
import Axios from "axios";
import FeatureSection from "./FeatureSection/FeatureSection";
import { ISelectedFeatureObj } from "./FeatureSection/TypeFeatureSection";
import { IPlanetoryData } from "./TypeView";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const View = () => {
  const [planetoryData, setPlanetoryData] = React.useState<IPlanetoryData[]>(
    []
  );
  const [dataHeaders, setDataHeaders] = React.useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] =
    React.useState<ISelectedFeatureObj>({
      firstFeature: "P. Mass (EU)",
      secondFeature: "P. Gravity (EU)",
    });
  React.useEffect(() => {
    getPlanetoryData();
  }, []);
  const getPlanetoryData = async () => {
    const planetoryDataResponse = await Axios.get("/fixtures/csvjson.json");
    setPlanetoryData(
      planetoryDataResponse.data ? planetoryDataResponse.data : []
    );
    setDataHeaders(
      planetoryDataResponse.data
        ? Object.keys(planetoryDataResponse.data[0])
        : []
    );
  };
  const selectFeature = (type: "first" | "second", feature: string) => {
    setSelectedFeatures({
      ...selectedFeatures,
      firstFeature: type === "first" ? feature : selectedFeatures.firstFeature,
      secondFeature:
        type === "second" ? feature : selectedFeatures.secondFeature,
    });
  };
  const chartOptions = {
    chart: {
      type: "scatter",
    },
    title: {
      text: `${selectedFeatures.firstFeature} vs ${selectedFeatures.secondFeature}`,
    },
    yAxis: {
      min: 0,
      title: {
        text: `${selectedFeatures.secondFeature}`,
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        data: [
          ...planetoryData.map((item) => {
            return [
              item[selectedFeatures.firstFeature],
              item[selectedFeatures.secondFeature],
            ];
          }),
        ],
      },
    ],
    xAxis: {
      title: {
        enabled: true,
        text: `${selectedFeatures.firstFeature}`,
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
            yAxis: {
              labels: {
                align: "left",
                x: 0,
                y: -5,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  };
  return (
    <div className="container">
      <div className="header-section">Exoplanet Data Explorer</div>
      <div className="feature-selector-sections">
        <FeatureSection
          featureList={[...dataHeaders]}
          selectedFeatures={{ ...selectedFeatures }}
          selectedFeature={selectedFeatures.firstFeature}
          type="firstFeature"
          onSelectFeature={selectFeature}
          planetoryData={[...planetoryData]}
        />
        <FeatureSection
          featureList={[...dataHeaders]}
          selectedFeatures={{ ...selectedFeatures }}
          selectedFeature={selectedFeatures.secondFeature}
          type="secondFeature"
          onSelectFeature={selectFeature}
          planetoryData={[...planetoryData]}
        />
      </div>
      <div className="chart-section">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};

export default View;
