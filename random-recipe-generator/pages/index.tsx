import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Test from "../components/test/test";
import styled from "@emotion/styled";
import ChosenRecipe from "../components/chosenRecipe/chosenRecipe";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const Home: NextPage = () => {
  const [recipeList, setRecipeList] = useState(null);
  const [foodName, setFoodName] = useState("");

  const fetchData = async () => {
    console.log(1, "hello", foodName);
    return axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${foodName}&app_id=51f1a3e7&app_key=%2012b2acdd9562c85d636e7d9010e7bea2&random=true`
      )
      .then((res) => {
        console.log(10, res);
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRecipes = useCallback(async () => {
    const recipes = await fetchData();
    console.log(15, recipes);

    setRecipeList(recipes);
  }, [recipeList, foodName]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Recipe Generator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading className={styles.title}>Random Recipe Generator-test</Heading>

        <label htmlFor="ingredient">Ingredient:</label>
        <input
          type="text"
          name="ingredient"
          onChange={(e) => setFoodName(e.target.value)}
        />
        <br />
        <button onClick={getRecipes}>click me for recipes</button>

        <ChosenRecipe props={recipeList} />
      </main>
    </div>
  );
};

export default Home;
