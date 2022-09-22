import styled from "@emotion/styled";

export const ChosenRecipe = ({ props }) => {
  if (!props) return;
  if (props.hits && props.hits[0]) {
    return <p>Your recipe is {props.hits[0].recipe.label}</p>;
  } else {
    return <p>No recipes for that ingredient</p>;
  }
};

export default ChosenRecipe;
