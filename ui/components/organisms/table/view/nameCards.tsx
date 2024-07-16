import { DOMAIN_STATUS } from "@/comman/types";
import { NameCard } from "../../../molecules/nameCard";
import style from "../index.module.css";
import { Loader, LoaderVariant } from "@/components/atoms/loader";

type NameCardsProps = {
  data: {
    domainName: string;
    domainImg: string;
    id: string;
    domainStatus: DOMAIN_STATUS;
    endTimestamp: number;
    handlePendingStatus?: () => void;
  }[];
  isLoading: boolean;
};

const NameCards = ({ data, isLoading }: NameCardsProps): JSX.Element => {
  if (!data || isLoading) return null;

  return (
    <div className={style.nameCards}>
      {data.map(
        (
          { domainName, domainImg, id, domainStatus, endTimestamp, handlePendingStatus },
          index
        ) => {
          return (
            <NameCard
              name={domainName}
              img={domainImg}
              key={index}
              id={id}
              domainStatus={domainStatus}
              endTimestamp={endTimestamp}
              handlePendingStatus={handlePendingStatus}
            />
          );
        }
      )}
    </div>
  );
};

export default NameCards;
