let allRecipes = [];

let selectedMeal = "";





async function loadRandomRecipes() {


    const response =
        await fetch("data/recipes.json");


    allRecipes =
        await response.json();



    const params =
        new URLSearchParams(
            window.location.search
        );


    selectedMeal =
        params.get("meal");



    if (!selectedMeal) {

        showRandomRecipe(
            allRecipes
        );

        return;

    }



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


    const randomIndex =
        Math.floor(
            Math.random() *
            recipes.length
        );


    const recipe =
        recipes[randomIndex];



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



    showRandomRecipe(
        mealRecipes
    );

}






function formatTime(minutes) {

    return `${Math.round(minutes / 5) * 5} mins`;

}





loadRandomRecipes();