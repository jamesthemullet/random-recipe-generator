import styles from "../../styles/Home.module.css";
import axios from "axios";
import data from "../../dataLayer/data";
import { useEffect, useReducer, useState } from "react";


type IngredientsProps = {
  foodId: string;
  text: string;
};

type Props = {
  props: IngredientsProps;
};

export const IngredientRecipe = ({ props }: Props) => {

  if (!props)
    return <p>Error</p>;
  
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    var ocadoLink = "https://www.ocado.com";
    var imageURL = "https://www.ocado.com/cmscontent/recipe_image_med/30597917.jpg?Z8O_";
    var savedImage = data.productImages.filter(function (el) { return el.title == props.text; });
    if (savedImage.length > 0) {
      imageURL = savedImage[0].pic;
      ocadoLink = savedImage[0].ocadoLink;
    }
    var imageStyle = {
      backgroundImage: `url(${imageURL})`
    };
    useEffect(() => {
      if (!data.productsQuered.includes(props.text)) {
        var searchedForProduct = props.text.replace(/[^a-z\s]/gi, '');
        data.productsQuered.push(props.text);

        axios.get(
            `https://www.googleapis.com/customsearch/v1?key=AIzaSyCxCI1_PdawU33I9_Jgix-UBx5yohRzPPM&cx=f6ce5b85e88994a0d&q=` + searchedForProduct + `&searchType=image&alt=json&imgSize=LARGE`
          ).then((res) => {
            var items = res.data.items;
            var retrievedMSProduct;
            for(var i=0; i<items.length;i++) {
                if (items[i].title.toLowerCase().includes("M&S")) {
                  retrievedMSProduct = items[i];
                }
            }
            retrievedMSProduct = retrievedMSProduct == null && items.length > 0 ? items[0] : retrievedMSProduct;
            data.productImages.push({title: props.text, pic: retrievedMSProduct.link, ocadoLink: retrievedMSProduct.image.contextLink});
            console.log("Here is the data DISPLAYED link " + JSON.stringify(retrievedMSProduct.link) + " contextLink " + retrievedMSProduct.image.contextLink);
            forceUpdate();
          })
          .catch((err) => {
            console.error(err);
          });
      }

    })
    
  
function openOcadoLink() {
  window.open(ocadoLink, '_blank', 'noopener,noreferrer');
}
  return (
    <>
      <div className={styles.product}>
        <div className={styles.imageBox}>
          <div className={styles.images} style={imageStyle} key={props.foodId}></div>
        </div>
        <div className={styles.textBox}>
          <h2 className={styles.item}>{props.text}</h2>
          <p className={styles.description}>{"M&S Food"}</p>
          <button onClick={openOcadoLink} className={styles.textBox} >Check on Ocado</button>
        </div>
      </div>
    </>
  );
};

export default IngredientRecipe;
