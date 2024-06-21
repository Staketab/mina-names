import { ChangeEvent } from "react";

export type RadioGroupOption = {
  value: string;
  label: string | React.ReactNode;
};

export type RadioGroupProps = {
  name: string;
  options: RadioGroupOption[];
  defaultValue: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};
