import type { NextPage } from "next";
import Head from "next/head";
import Button from "../components/button/button";
import styled from "@emotion/styled";
import ChosenRecipe from "../components/chosenRecipe/chosenRecipe";
import styles from "../styles/Home.module.css";
import { useState, useCallback } from "react";
import React from "react";

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
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodName}&app_id=${appId}&app_key=${apiKey}&random=true`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const getRecipes = useCallback(async () => {
    const recipes = await fetchData();

    setRecipeList(recipes);
  }, [recipeList, foodName]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Random Recipe Generator</title>
        <meta name="description" content="Random Recipe Generator" />
        <meta
          name="keywords"
          content="random recipe, cooking, food, ingredients"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Random Recipe Generator" />
        <meta
          property="og:description"
          content="Generate random recipes based on ingredients"
        />
        {/* <meta property="og:image" content="/path/to/image.jpg" /> */}
        <meta property="og:url" content="https://www.randomrecipe.co.uk/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Random Recipe Generator" />
        <meta
          name="twitter:description"
          content="Generate random recipes based on ingredients"
        />
        {/* <meta name="twitter:image" content="/path/to/image.jpg" /> */}
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MJ48MF40NR"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MJ48MF40NR"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MJ48MF40NR');
          `}
        </script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3090319297502193"
          crossOrigin="anonymous"
        ></script>
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
