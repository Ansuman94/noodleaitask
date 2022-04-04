import { IPlanetoryData } from "../TypeView";

export interface IFeatureSectionProps {
  featureList: string[];
  selectedFeatures: ISelectedFeatureObj;
  selectedFeature: string;
  type: "firstFeature" | "secondFeature";
  onSelectFeature: (type: "first" | "second", feature: string) => void;
  planetoryData: IPlanetoryData[];
}
export interface ISelectedFeatureObj {
  firstFeature: string;
  secondFeature: string;
}
