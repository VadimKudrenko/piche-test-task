import React from "react";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "react-virtualized/styles.css";
import { useAppSelector } from "../../hooks/redux-hooks";

import "./HolidaysList.css"

interface IRow {
  index: number;
  style: object;
}

interface IAutoSizer {
  width: number;
}

export default function EventsList() {
  const holidaysList = useAppSelector((state) => state.wikiData.holidays);

  const Row = ({ index, style }: IRow) => (
    <div className={index % 2 ? 'holidays-list__item--odd' : 'holidays-list__item--even'} style={style}>
      <div className="holidays-list__item-index">{index + 1}.</div>
      <div className="holidays-list__item-text">{holidaysList[index]?.text}</div>
    </div>
  );

  return (
    <AutoSizer disableHeight>
      {({ width }: IAutoSizer) => (
        <List
          height={300}
          itemCount={holidaysList.length}
          itemSize={60}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
}
