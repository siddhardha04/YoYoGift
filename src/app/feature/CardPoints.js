import React, { memo } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";

function CardPoints(props) {
  const { handlePoints } = props;
  const points = ["0-1000", "1000-3000", "3000-10000", ">10000"];

  return (
    <>
      <div className="points-title">Points</div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="points"
          name="points"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {points.map(point => (
            <FormControlLabel
              key={point}
              value={point}
              control={<Radio onClick={handlePoints} />}
              label={point}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default memo(CardPoints);
