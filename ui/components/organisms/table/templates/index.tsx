import React from "react";
import StringTemplate from "./stringTemplate";
import AmountTemplate from "./amountTemplate";
import CardsTemplate from "./cardsTemplate/cardsTemplate";
import NamesTemplate from "./namesTemplate/namesTemplate";
import ButtonTemplate from "./buttonTemplate/buttonTemplate";
import TimeTemplate from "./timeTemplate/timeTemplate";

export enum TableTemplates {
  STRING = "string",
  AMOUNT = "amount",
  CARDS = "cards",
  NAMES = "names",
  BUTTON = "button",
  TIME = "time",
}

const getCell = ({ data, config }): JSX.Element => {
  switch (config.columnTemplate) {
    case TableTemplates.STRING:
      return <StringTemplate data={data} config={config} />;
    case TableTemplates.AMOUNT:
      return <AmountTemplate data={data} config={config} />;
    case TableTemplates.CARDS:
      return <CardsTemplate data={data} config={config} />;
    case TableTemplates.NAMES:
      return <NamesTemplate data={data} config={config} />;
    case TableTemplates.BUTTON:
      return <ButtonTemplate data={data} config={config} />;
    case TableTemplates.TIME:
      return <TimeTemplate data={data} config={config} />;
  }
};

export default getCell;
