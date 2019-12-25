import React, { memo } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function Brands(props) {
  const { brands, handleBrand } = props;

  return (
    <>
      <div className="brand-title">Brands</div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="brands"
          name="brands"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {brands.map(name => (
            <FormControlLabel
              key={name}
              value={name}
              control={<Radio onClick={handleBrand} />}
              label={name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default memo(Brands);
