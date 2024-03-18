import { NameCard } from "../../../molecules/nameCard";
import style from "../index.module.css";

type NameCardsProps = {
  data: {
    domainName: string;
    domainImg: string;
    id: string;
  }[];
};

const NameCards = ({ data }: NameCardsProps): JSX.Element => {

  if(!data) return null
  
  return (
    <div className={style.nameCards}>
      {data.map(({ domainName, domainImg, id }, index) => {
        return <NameCard name={domainName} img={domainImg} key={index} id={id}/>;
      })}
    </div>
  );
};

export default NameCards;
