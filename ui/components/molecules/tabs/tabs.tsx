import { Button } from "@/components/atoms/button";
import style from "./index.module.css";
import { Variant } from "@/components/atoms/button/types";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { TABS_VARIANT } from "./tabs.types";

type TabsProps = {
  initValue?: string | number;
  items: {
    content: React.ReactElement;
    title: string;
    value: string | number;
  }[];
  onTabChange?: (value: string | number) => void;
  className?: string;
  variant?: TABS_VARIANT;
};

const Tabs = ({
  initValue,
  items,
  onTabChange,
  className,
  variant,
}: TabsProps): JSX.Element => {
  const [value, setValue] = useState<string | number>(
    initValue || items?.[0]?.value
  );

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  return (
    <div className={classNames(style.wrapper, className)}>
      <div className={classNames(style.buttonGroup, style[variant])}>
        {items.map((item) => {
          if (variant === TABS_VARIANT.blackButton) {
            return (
              <>
                {item.title && (
                  <Button
                    key={item.value}
                    variant={
                      value === item?.value ? Variant.black : Variant.cancel
                    }
                    onClick={(): void => {
                      onTabChange?.(item?.value);
                      setValue(item?.value);
                    }}
                  >
                    {item.title}
                  </Button>
                )}
              </>
            );
          }
          return (
            <Button
              key={item.value}
              variant={
                value === item?.value ? Variant.lightTab : Variant.cancel
              }
              onClick={(): void => {
                onTabChange?.(item?.value);
                setValue(item?.value);
              }}
            >
              {item.title}
            </Button>
          );
        })}
      </div>
      <div className={style.content}>
        {items.map((item) => {
          return (
            <React.Fragment key={item.value}>
              {value === item.value && <>{item.content}</>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export { Tabs };
