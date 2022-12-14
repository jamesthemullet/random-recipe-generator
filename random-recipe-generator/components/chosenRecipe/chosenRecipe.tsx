import styled from "@emotion/styled";
import Image from "next/image";
import Button from "../button/button";

const StyledList = styled.ul`
  font-family: "Raleway";
`;

const StyledParagraph = styled.p`
  font-family: "Raleway";
`;

const Title = styled.h2`
  font-family: "Playfair Display";
`;

type IngredientsProps = {
  foodId: string;
  text: string;
};

type RecipeProps = {
  recipe: {
    label: string;
    ingredients: IngredientsProps[];
    totalTime: number;
    images: {
      REGULAR: {
        height: number;
        width: number;
        url: string;
      };
    };
    url: string;
  };
};

type HitsProps = {
  hits: RecipeProps[];
};

type Props = {
  props: HitsProps | null;
};

export const ChosenRecipe = ({ props }: Props) => {
  if (!props || !props.hits || !props.hits[0])
    return <p>Please enter at lease one ingredient</p>;
  const { label, ingredients, totalTime, images, url } = props.hits[0].recipe;
  const { url: imageURL, height, width } = images.REGULAR;
  if (props.hits && props.hits[0]) {
    return (
      <>
        <Title>
          Your recipe is <b>{label}</b>
        </Title>
        <Image src={imageURL} height={height} width={width} alt={label} />
        <StyledParagraph>
          You will need the following ingredients:
        </StyledParagraph>
        <StyledList>
          {ingredients.map((item, index) => {
            return <li key={`${index}${item.foodId}`}>{item.text}</li>;
          })}
        </StyledList>
        {totalTime > 0 && (
          <StyledParagraph>
            It will take you {totalTime} minutes to make
          </StyledParagraph>
        )}
        <a href={url} target="_blank" rel="noreferrer">
          <Button text={"Full instructions"}></Button>
        </a>
      </>
    );
  } else {
    return <StyledParagraph>No recipes for that ingredient</StyledParagraph>;
  }
};

export default ChosenRecipe;
