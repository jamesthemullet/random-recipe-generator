import type { NextPage } from "next";
import Head from "next/head";
import Button from "../components/button/button";
import styled from "@emotion/styled";
import ChosenRecipe from "../components/chosenRecipe/chosenRecipe";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useCallback } from "react";

const Heading = styled.h1`
  margin-bottom: 3rem;
  font-family: "Playfair Display";
  color: #81b29a;
`;

const Description = styled.p`
  text-align: center;
  font-family: "Raleway";
  font-size: 20;
`;

const StyledInput = styled.input`
  font-family: "Raleway";
  font-size: 28;
`;

const Home: NextPage = () => {
  const [recipeList, setRecipeList] = useState(null);
  const [foodName, setFoodName] = useState("");

  const fetchData = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_SECRET;
    const appId = process.env.NEXT_PUBLIC_APP_ID;
    return axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${foodName}&app_id=${appId}&app_key=${apiKey}&random=true`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRecipes = useCallback(async () => {
    const recipes = await fetchData();

    setRecipeList(recipes);
  }, [recipeList, foodName]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Recipe Generator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Raleway:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <Heading className={styles.title}>Random Recipe Generator</Heading>

        <Description>
          Enter an ingredient below to see a randomly generated recipe
          containing your ingredient and everything else you need to make it!
        </Description>

        <StyledInput
          type="text"
          placeholder="Ingredient"
          onChange={(e) => setFoodName(e.target.value)}
        />
        <br />
        <Button onClick={getRecipes} text={"Generate new recipe"} />

        {recipeList && <ChosenRecipe props={recipeList}></ChosenRecipe>}
      </main>
    </div>
  );
};

export default Home;
