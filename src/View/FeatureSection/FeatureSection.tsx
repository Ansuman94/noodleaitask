import React from "react";
import Dropdown from "../../Common/Components/Dropdown/Dropdown";
import { IDropdownOptionObj } from "../../Common/Components/Dropdown/Type";
import "./FeatureSection.css";
import * as Types from "./TypeFeatureSection";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "underscore";

const FeatureSection = (props: Types.IFeatureSectionProps) => {
  const dropdownOptions = props.featureList.map((item) => {
    return {
      id: item,
      value: item,
      isDisabled:
        (props.type === "firstFeature" &&
          props.selectedFeatures.secondFeature === item) ||
        (props.type === "secondFeature" &&
          props.selectedFeatures.firstFeature === item),
    };
  });
  const selectOption = (selectedOption: IDropdownOptionObj) => {
    props.onSelectFeature(
      props.type === "firstFeature" ? "first" : "second",
      selectedOption.value
    );
  };
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    yAxis: {
      min: 0,
      title: {
        text: `${props.selectedFeature}`,
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
        data: [..._.pluck(props.planetoryData, props.selectedFeature)],
      },
    ],
    xAxis: {
      categories: [..._.pluck(props.planetoryData, "P. Disc. Year")],
      crosshair: true,
    },
  };
  return (
    <div className="feature-section-container-wrap">
      <div className="feature-section-container">
        <div className="drop-down-section">
          <Dropdown
            options={dropdownOptions}
            selectedOption={{
              id:
                props.type === "firstFeature"
                  ? props.selectedFeatures.firstFeature
                  : props.selectedFeatures.secondFeature,
              value:
                props.type === "firstFeature"
                  ? props.selectedFeatures.firstFeature
                  : props.selectedFeatures.secondFeature,
            }}
            onSelect={selectOption}
            label={props.type === "firstFeature" ? "X-Axis" : "Y-Axis"}
          />
        </div>
        <div className="drop-down-chart-section">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
