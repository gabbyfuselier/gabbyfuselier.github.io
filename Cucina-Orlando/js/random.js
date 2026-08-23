let allRecipes = [];

let selectedMeal = "Dinner";

let currentRecipe = null;





async function loadRandomRecipes() {


    const response =
        await fetch("data/recipes.json");


    allRecipes =
        await response.json();



    const params =
        new URLSearchParams(
            window.location.search
        );


    /*
    If a meal is specifically included
    in the URL, use it.

    Otherwise default to Dinner.
    */

    selectedMeal =
        params.get("meal") || "Dinner";



    const mealRecipes =
        allRecipes.filter(recipe => {

            return (
                recipe.categories &&
                recipe.categories.meal &&
                recipe.categories.meal.includes(
                    selectedMeal
                )
            );

        });



    if (mealRecipes.length === 0) {

        document.querySelector(
            "#random-result"
        ).innerHTML = `

            <h1>
                No recipes found
            </h1>

            <p>
                We don't have any recipes
                in this category yet.
            </p>

            <a
            class="button primary"
            href="index.html">

                Back Home

            </a>

        `;

        return;

    }



    showRandomRecipe(
        mealRecipes
    );

}






function showRandomRecipe(recipes) {


    /*
    Remove the recipe currently being shown
    from the possible choices.
    */

    let availableRecipes =
        recipes.filter(recipe => {

            return (
                !currentRecipe ||
                recipe.id !== currentRecipe.id
            );

        });



    /*
    If there is only one recipe available,
    allow it to show again rather than
    leaving the randomizer empty.
    */

    if (availableRecipes.length === 0) {

        availableRecipes = recipes;

    }



    const randomIndex =
        Math.floor(
            Math.random() *
            availableRecipes.length
        );


    const recipe =
        availableRecipes[randomIndex];


    currentRecipe =
        recipe;



    document.title =
        `${recipe.title} | Random Recipe`;



    const container =
        document.querySelector(
            "#random-result"
        );



    container.innerHTML = `


        <p class="random-eyebrow">
            Your Random Recipe
        </p>



        <h1>
            What do you think?
        </h1>



        <article
        class="random-preview">


            <div class="random-preview-image">


                <img
                src="images/recipes/${recipe.images.hero}"
                alt="${recipe.title}">


            </div>



            <div class="random-preview-content">


                <h2>
                    ${recipe.title}
                </h2>



                <div class="random-preview-meta">


                    ${
                        recipe.time?.total
                        ?
                        `

                        <span>
                            ${formatTime(
                                recipe.time.total
                            )}
                        </span>

                        `
                        :
                        ""
                    }



                    ${
                        recipe.difficulty
                        ?
                        `

                        <span>
                            ${recipe.difficulty}
                        </span>

                        `
                        :
                        ""
                    }


                </div>



                <div
                class="random-preview-actions">


                    <a
                    class="button primary"
                    href="recipe.html?id=${recipe.id}">

                        Let's Give It a Try!

                    </a>



                    <button
                    class="button secondary"
                    onclick="tryAnotherRecipe()">

                        Try Another Recipe

                    </button>


                </div>


            </div>


        </article>


    `;

}






function tryAnotherRecipe() {


    const mealRecipes =
        allRecipes.filter(recipe => {

            return (
                recipe.categories &&
                recipe.categories.meal &&
                recipe.categories.meal.includes(
                    selectedMeal
                )
            );

        });



    if (mealRecipes.length === 0) {

        return;

    }



    /*
    showRandomRecipe() will automatically
    exclude the recipe currently being shown.
    */

    showRandomRecipe(
        mealRecipes
    );

}






function formatTime(minutes) {

    return `${Math.round(minutes / 5) * 5} mins`;

}





loadRandomRecipes();