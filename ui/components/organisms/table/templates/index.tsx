import React from "react";
import StringTemplate from "./stringTemplate";
import AmountTemplate from "./amountTemplate";
import NamesTemplate from "./namesTemplate/namesTemplate";
import ButtonTemplate from "./buttonTemplate/buttonTemplate";
import TimeTemplate from "./timeTemplate/timeTemplate";
import { CounterTemplate } from "./counterTemplate";
import { IconTemplate } from "./iconTemplate";
import { LinkTemplate } from "./linkTemplate";

export enum TableTemplates {
  STRING = "string",
  AMOUNT = "amount",
  CARDS = "cards",
  NAMES = "names",
  BUTTON = "button",
  TIME = "time",
  COUNTER = "counter",
  ICON = "icon",
  LINK = "link",
}

const getCell = ({ data, config }): JSX.Element => {
  switch (config.columnTemplate) {
    case TableTemplates.STRING:
      return <StringTemplate data={data} config={config} />;
    case TableTemplates.AMOUNT:
      return <AmountTemplate data={data} config={config} />;
    case TableTemplates.NAMES:
      return <NamesTemplate data={data} config={config} />;
    case TableTemplates.BUTTON:
      return <ButtonTemplate data={data} config={config} />;
    case TableTemplates.TIME:
      return <TimeTemplate data={data} config={config} />;
    case TableTemplates.COUNTER:
      return <CounterTemplate data={data} config={config} />;
    case TableTemplates.ICON:
      return <IconTemplate data={data} config={config} />;
    case TableTemplates.LINK:
      return <LinkTemplate data={data} config={config} />;
  }
};

export default getCell;
