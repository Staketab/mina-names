import { Routs } from "@/comman/types";
import accountIcon from "./img/account.svg";

export const navList: {
  title: string;
  url: string;
  icon: string;
  id: string;
}[] = [
  {
    title: "My Names",
    url: Routs.NAMES,
    icon: accountIcon,
    id: "1",
  },
];
