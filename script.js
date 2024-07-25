const searchBtn = document.querySelector(".button");
const searchBox = document.querySelector(".searchBox");
const recipeContainer = document.querySelector(".recipe-container");
const  recipeDetailContent = document.querySelector(".recipe-detail-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");



const fetchRecipes = async (query) => { // get recip. function
    recipeContainer.innerHTML = "<h2>Fatching Recipes 😋...</h2>";
    try {

        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        
        recipeContainer.innerHTML = "";
            response.meals.forEach(meal => {
       const recipeDiv = document.createElement("div"); // by using js  we make a class here
       recipeDiv.classList.add("recipe");
       recipeDiv.innerHTML = ` 
       <img src="${meal.strMealThumb}"> 
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span> Dish</p>
       <p> Belongs to <span>${meal.strCategory}</span> Category</p>
       ` // through ` ` we can write html in js

       const btn = document.createElement("btn");
       btn.textContent = "View Recipe";
       recipeDiv.appendChild(btn);

       //adding eventlistener to recipe button
       btn.addEventListener("click", ()=>{
        openRecipePopup(meal);

       });

       recipeContainer.appendChild(recipeDiv);

        });

    } 
    catch (error) {
        recipeContainer.innerHTML = `<h2>Error in fetching recipes 🫤......</h2>`;
    }

}
// function to fetch ingredents and measurement
const fetchIngredents = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=28; i++){
       const ingredient = meal[`strIngredient${i}`];
       if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`
       }
       else{
        break;
       }
    }
    return ingredientsList;

}
const openRecipePopup = (meal) => {
    recipeDetailContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredentList">${fetchIngredents(meal)}</ul>
    <div  class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `;
    recipeDetailContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', ()=>{
   recipeDetailContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();  // auto submit blocked by using it
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in search box 😥....</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});