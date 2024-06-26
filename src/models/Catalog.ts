import { SingleValue } from "react-select";

export type Catalog = SingleValue<{
  label: string;
  value: number;
}>