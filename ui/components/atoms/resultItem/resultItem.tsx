import { Button } from "../button";
import { Variant } from "../button/types";
import style from "./index.module.css";

const ResultItem = ({ text }) => {
  return (
    <div className={style.wrapper}>
      {text}
      <Button text="Purchase" variant={Variant.blue} />
    </div>
  );
};

export default ResultItem;
