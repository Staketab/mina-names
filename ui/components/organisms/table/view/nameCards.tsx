import { DOMAIN_STATUS } from "@/comman/types";
import { NameCard } from "../../../molecules/nameCard";
import style from "../index.module.css";

type NameCardsProps = {
  data: {
    domainName: string;
    domainImg: string;
    id: string;
    domainStatus: DOMAIN_STATUS;
    endTimestamp: number;
  }[];
};

const NameCards = ({ data }: NameCardsProps): JSX.Element => {
  if (!data) return null;

  return (
    <div className={style.nameCards}>
      {data.map(
        ({ domainName, domainImg, id, domainStatus, endTimestamp }, index) => {
          return (
            <NameCard
              name={domainName}
              img={domainImg}
              key={index}
              id={id}
              domainStatus={domainStatus}
              endTimestamp={endTimestamp}
            />
          );
        }
      )}
    </div>
  );
};

export default NameCards;
