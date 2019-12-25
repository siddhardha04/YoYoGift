import React, { useEffect, useState, memo } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";

function Categories(props) {
  const { categories, handleCategory } = props;
  const [catWithIds, setCatWithIds] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const resp = await axios.get("http:localhost:3001/category");
      setCatWithIds(resp.data);
    }
    getCategories();
  }, []);

  return (
    <>
      <div className="cat-title">Categories</div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="categories"
          name="brands"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {categories.map(name => {
            let data = catWithIds.find(cat => cat.name === name);
            return (
              <FormControlLabel
                key={name}
                value={data.id}
                control={<Radio onClick={handleCategory} />}
                label={name}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default memo(Categories);
