import { useEffect, useState } from "react";

import style from "../index.module.css";
import classNames from "classnames";
import {
  dateTimeFromTimestamp,
  getTimeFromMillisecondsDynamic,
} from "@/helpers/timeHelper";
import { manropeMedium, manropeSemiBold } from "@/app/fonts";

type TimeTemplateProps = {
  data: any;
  config: {
    fields: {
      value: string;
      url: string;
    };
  };
};

const TimeTemplate = ({ data, config }: TimeTemplateProps) => {
  const [date, setDate] = useState(Date.now());

  const value = data[config.fields.value];

  useEffect(() => {
    const interval = setInterval(() => setDate(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classNames(style.timeTemplate, manropeSemiBold.className)}>
      <span>{getTimeFromMillisecondsDynamic(date - value, false, true)}</span>
      <span className={manropeMedium.className}>
        {dateTimeFromTimestamp(value)}
      </span>
    </div>
  );
};

export default TimeTemplate;
