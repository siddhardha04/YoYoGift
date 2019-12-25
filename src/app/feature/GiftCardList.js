import React from "react";
import GiftCard from "./GiftCard";
import { Grid, WindowScroller } from "react-virtualized";
import CircularProgress from "@material-ui/core/CircularProgress";

function GiftCardList(props) {
  const gridOfGifts = [];
  for (let i = 0; i < props.gifts.length; i = i + 3) {
    let a = [];
    for (let j = i; j < i + 3; j++) {
      if (j < props.gifts.length) a.push(props.gifts[j]);
    }
    gridOfGifts.push(a);
  }

  function cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div style={style} key={key}>
        {gridOfGifts[rowIndex][columnIndex] ? (
          <GiftCard gift={gridOfGifts[rowIndex][columnIndex]} />
        ) : null}
      </div>
    );
  }

  return props.gifts.length !== 0 ? (
    <div className="gifts-container">
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <Grid
            autoHeight
            autoWidth
            cellRenderer={cellRenderer}
            columnCount={3}
            columnWidth={400}
            height={height}
            rowCount={gridOfGifts.length}
            rowHeight={300}
            width={1243}
            onScroll={onChildScroll}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
          />
        )}
      </WindowScroller>
    </div>
  ) : (
    <CircularProgress
      style={{ position: "absolute", top: "50%", left: "50%" }}
    />
  );
}

export default GiftCardList;
