import { NameCard } from "../../../molecules/nameCard";
import style from "../index.module.css";

type NameCardsProps = {
  data: {
    name: string;
    url: string;
  }[];
};

const NameCards = ({ data }: NameCardsProps): JSX.Element => {
  return (
    <div className={style.nameCards}>
      {data.map(({ name, url }, index) => {
        return <NameCard name={name} img={url} key={index} />;
      })}
    </div>
  );
};

export default NameCards;
