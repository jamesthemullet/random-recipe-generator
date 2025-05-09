import type { NextPage } from "next";
import Head from "next/head";
import Button from "../components/button/button";

import ChosenRecipe from "../components/chosenRecipe/chosenRecipe";
import styles from "../styles/Home.module.css";
import { useState, useCallback } from "react";
import React from "react";
import Script from "next/script";

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
        <meta property="og:title" content="Random Recipe Generator " />
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
        <link rel="canonical" href="https://www.randomrecipe.co.uk/" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-MJ48MF40NR"
      ></Script>
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MJ48MF40NR');
        `}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3090319297502193"
        crossOrigin="anonymous"
      ></Script>

      <main className={styles.main}>
        <h1 className={styles.title}>Random Recipe Generator</h1>

        <p>
          Enter an ingredient below to see a randomly generated recipe
          containing your ingredient and everything else you need to make it!
        </p>

        <input
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
