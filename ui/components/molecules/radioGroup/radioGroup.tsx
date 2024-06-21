import { RadioButton } from "@/components/atoms/input";
import React, { ChangeEvent, useEffect, useState } from "react";

type RadioGroupProps = {
  name: string;
  options: { value: string; label: string | React.ReactNode }[];
  defaultValue: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const RadioGroup = ({
  name,
  options,
  defaultValue,
  onChange,
  className,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          group={name}
          selectedValue={selectedValue}
          onChange={handleChange}
        >
          {option.label}
        </RadioButton>
      ))}
    </div>
  );
};

export { RadioGroup };
