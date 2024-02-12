import { useEffect, useState } from "react";
import {
  dateTimeFromTimestamp,
  getTimeFromMilliseconds,
  getTimeFromMillisecondsDynamic,
} from "../../../../../helpers/timeHelper";

import style from "../index.module.css";
import classNames from "classnames";

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
    <div className={classNames(style.timeTemplate, 't-inter-medium')}>
      <span>{getTimeFromMillisecondsDynamic(date - value, false, true)}</span>
      <span>{dateTimeFromTimestamp(value)}</span>
    </div>
  );
};

export default TimeTemplate;
