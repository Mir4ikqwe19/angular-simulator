import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IProgramItem {
  id: number;
  iconName: IconDefinition;
  title: string;
  definition: string;
}