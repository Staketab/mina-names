import { useCheckTimeReservation } from "@/hooks";

const TimeReservation = (): JSX.Element => {
  const time = useCheckTimeReservation();

  return <span> Domain reservation {time}</span>;
};

export { TimeReservation };
