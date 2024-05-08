import React from "react";
import { colorConfig, disabledColor } from "./constants";

export enum LoaderVariant {
  CIRCLE = "circle",
  DOTS = "dots",
}

type LoaderProps = {
  label?: string;
  disabled?: boolean;
  dotCount?: number;
  radius?: number;
  gap?: number;
  duration?: number;
  variant?: LoaderVariant;
  circleSize?: {
    width: number;
    height: number;
    strokeWidth?: number;
  };
};

const Loader = ({
  label,
  disabled,
  dotCount = 5,
  radius = 3,
  gap = 8,
  duration = 2000,
  variant = LoaderVariant.DOTS,
  circleSize,
}: LoaderProps): JSX.Element => {
  const r = radius;
  const g = gap;
  const colors = colorConfig.blue;

  const getCX = (r, g, i) => r + (r * 2 + g) * i;
  const width = getCX(r, g, dotCount - 1) + r;

  const getCircles = (count) => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      let values = [];
      for (let index = 0; index < count * 2 - 1; index++) {
        values.push(index < i || index > count + i - 1 ? 0 : 1);
      }
      values = [0, ...values, 0];
      arr.push(
        <circle
          cx={getCX(r, g, i)}
          cy={r}
          r={r}
          fill={!disabled ? colors[i] ?? colors.at(-1) : disabledColor}
          key={i}
        >
          {!disabled && (
            <animate
              attributeName="opacity"
              begin="0s"
              dur={duration + "ms"}
              values={values.join(";")}
              calcMode="linear"
              repeatCount="indefinite"
            />
          )}
        </circle>
      );
    }
    return arr;
  };

  if (variant === LoaderVariant.CIRCLE) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        // style="margin: auto; background: transparent; display: block; shape-rendering: auto;"
        width={circleSize?.width ? circleSize?.width + "px" : "20px"}
        height={circleSize?.height ? circleSize?.height + "px" : "20px"}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="rgba(89, 127, 255, 1)"
          stroke-width={circleSize?.strokeWidth || "8"}
          r="40"
          stroke-dasharray="188.49555921538757 64.83185307179586"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    );
  }

  return (
    <svg
      height={r * 2}
      width={width}
      viewBox={`0 0 ${width} ${r * 2}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={label}
    >
      {getCircles(dotCount)}
    </svg>
  );
};

export default Loader;
