import { TABS_VARIANT, Tabs } from "@/components/molecules/tabs";

import style from "./index.module.css";
import AllContent from "./allContent";
import { DOMAIN_STATUS } from "@/comman/types";
import { SwitchView } from "@/components/atoms/switchView";
import { useState } from "react";
import { TypeView } from "@/components/atoms/switchView/switchView";

const NamesContent = (): JSX.Element => {
  const [typeView, setTypeView] = useState<TypeView>(TypeView.CARD);
  const handleSwitchView = (typeView: TypeView) => {
    setTypeView(typeView);
  };

  return (
    <div className={style.wrapper}>
      <Tabs
        className={style.tabs}
        variant={TABS_VARIANT.blackButton}
        items={[
          {
            content: <AllContent typeView={typeView} />,
            title: "All",
            value: 1,
          },
          {
            content: (
              <AllContent
                typeView={typeView}
                domainStatus={DOMAIN_STATUS.PENDING}
              />
            ),
            title: "Pending",
            value: 2,
          },
          {
            content: (
              <AllContent
                typeView={typeView}
                domainStatus={DOMAIN_STATUS.ACTIVE}
              />
            ),
            title: "Active",
            value: 3,
          },
        ]}
        initValue={1}
      />
      <SwitchView onClick={handleSwitchView} className={style.switchView} />
    </div>
  );
};

export { NamesContent };
