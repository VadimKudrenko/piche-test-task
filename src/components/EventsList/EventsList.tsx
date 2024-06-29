import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./EventsList.css";
import "react-virtualized/styles.css";

interface IRow {
  index: number;
  style: object;
}

interface IAutoSizer {
  width: number;
}

export default function EventsList() {
  const getWikiEvents = useAppSelector((state) => state.wikiData.events);

  const Row = ({ index, style }: IRow) => (
    <div
      className={
        index % 2 ? "events-list__item--odd" : "events-list__item--even"
      }
      style={style}
    >
      <div className="events-list__item-index">{index + 1}.</div>
      <div className="events-list__item-year">{getWikiEvents[index]?.year}</div>
      <div className="events-list__item-text">{getWikiEvents[index]?.text}</div>
    </div>
  );

  return (
    <AutoSizer disableHeight>
      {({ width }: IAutoSizer) => (
        <List
          height={300}
          itemCount={getWikiEvents.length}
          itemSize={60}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
}
