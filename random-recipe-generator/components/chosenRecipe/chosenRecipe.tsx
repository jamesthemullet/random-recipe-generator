import styled from "@emotion/styled";
import Image from "next/image";
import Button from "../button/button";

export const ChosenRecipe = ({ props }) => {
  if (!props || !props.hits || !props.hits[0]) return;
  const { label, ingredients, totalTime, images, url } = props.hits[0].recipe;
  const { url: imageURL, height, width } = images.REGULAR;
  if (props.hits && props.hits[0]) {
    return (
      <>
        <p>Your recipe is {label}</p>
        <Image src={imageURL} height={height} width={width} />
        <p>You'll need the following ingredients:</p>
        <ul>
          {ingredients.map((item, index) => {
            return <li key={`${index}${item.foodId}`}>{item.text}</li>;
          })}
        </ul>
        {totalTime > 0 && <p>It will take you {totalTime} minutes to make</p>}
        <a href={url} target="_blank">
          <Button text={"Full instructions"}></Button>
        </a>
      </>
    );
  } else {
    return <p>No recipes for that ingredient</p>;
  }
};

export default ChosenRecipe;
