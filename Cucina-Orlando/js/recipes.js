let allRecipes = [];





async function loadRecipes(){

    const response =
    await fetch("data/recipes.json");

    allRecipes =
    await response.json();


    /*
    Sort newest first
    */

    allRecipes.sort(
        (a,b) =>
        new Date(b.dateAdded || 0) -
        new Date(a.dateAdded || 0)
    );


    /*
    Create the filter options
    from the recipes themselves.
    */

    createFilters();


    /*
    Check URL for homepage
    meal selection.
    */

    const params =
    new URLSearchParams(
        window.location.search
    );


    const meal =
    params.get("meal");


    /*
    If the homepage sent us
    a meal, check that filter.
    */

    if(meal){

        document
        .querySelectorAll(
            'input[data-filter="meal"]'
        )
        .forEach(box => {

            if(
                box.value.toLowerCase() ===
                meal.toLowerCase()
            ){

                box.checked = true;

            }

        });


        /*
        Start with only the
        selected meal.
        */

        const mealFiltered =
        allRecipes.filter(recipe => {

            return (
                recipe.categories &&
                recipe.categories.meal &&
                recipe.categories.meal.some(
                    value =>
                    value.toLowerCase() ===
                    meal.toLowerCase()
                )
            );

        });


        displayRecipes(mealFiltered);

        return;

    }


    displayRecipes(allRecipes);

}






function createFilters(){

    /*
    Meal is intentionally
    controlled/static.
    */

    const meals = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert"
    ];


    const mealContainer =
    document.querySelector(
        "#meal-filters"
    );


    mealContainer.innerHTML =
    meals.map(meal => {

        return `

        <label>

            <input
            type="checkbox"
            value="${meal}"
            data-filter="meal">

            ${meal}

        </label>

        `;

    }).join("");



    /*
    All other filters are
    generated from recipes.json.
    */

    createDynamicFilter(
        "protein",
        "#protein-filters"
    );


    createDynamicFilter(
        "cuisine",
        "#cuisine-filters"
    );


    createDynamicFilter(
        "dishType",
        "#dishType-filters"
    );


    createDynamicFilter(
        "equipment",
        "#equipment-filters"
    );


    createDynamicFilter(
        "tags",
        "#tags-filters"
    );

}





function createDynamicFilter(
    category,
    selector
){

    const values = new Set();


    allRecipes.forEach(recipe => {

        if(
            !recipe.categories ||
            !recipe.categories[category]
        ){

            return;

        }


        recipe.categories[category]
        .forEach(value => {

            values.add(value);

        });

    });


    const sortedValues =
    [...values].sort(
        (a,b) =>
        a.localeCompare(b)
    );


    const container =
    document.querySelector(selector);


    container.innerHTML =
    sortedValues.map(value => {

        return `

        <label>

            <input
            type="checkbox"
            value="${value}"
            data-filter="${category}">

            ${value}

        </label>

        `;

    }).join("");

}






function displayRecipes(recipes){

    const grid =
    document.querySelector(
        "#recipe-grid"
    );


    const count =
    document.querySelector(
        "#recipe-count"
    );


    count.innerText =
    `${recipes.length} recipes`;


    grid.innerHTML = "";

    if (recipes.length === 0) {

        grid.innerHTML = `
    
            <div class="no-results">
    
                <h2>
                    Looks like we don't have
                    what you're looking for...
                </h2>
    
                <p>
                    Would you like to try something else?
                </p>
    
            </div>
    
        `;
    
        return;
    
    }


    recipes.forEach(recipe => {

        grid.innerHTML += `

        <a
        class="recipe-card"
        href="recipe.html?id=${recipe.id}">


            <img
            src="images/recipes/${recipe.images.hero}"
            alt="${recipe.title}">


            <div class="recipe-card-content">


                <h3>
                    ${recipe.title}
                </h3>


                <p>

                    ${
                    recipe.categories &&
                    recipe.categories.meal
                    ?
                    recipe.categories.meal[0]
                    :
                    ""
                    }


                    ${
                    recipe.categories &&
                    recipe.categories.cuisine &&
                    recipe.categories.cuisine.length
                    ?
                    " • " +
                    recipe.categories.cuisine[0]
                    :
                    ""
                    }

                </p>


                ${
                recipe.time &&
                recipe.time.total
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


            </div>


        </a>

        `;

    });

}






function formatTime(minutes){

    return `${Math.round(minutes / 5) * 5} mins`;

}






function filterRecipes(){

    let filtered =
    [...allRecipes];


    /*
    Search
    */

    const search =
    document
    .querySelector("#recipe-search")
    .value
    .toLowerCase()
    .trim();


    if(search){

        filtered =
        filtered.filter(recipe => {

            const ingredients =
            recipe.ingredients
            .map(item =>
                item.name
            )
            .join(" ")
            .toLowerCase();


            return (

                recipe.title
                .toLowerCase()
                .includes(search)

                ||

                ingredients.includes(search)

            );

        });

    }



    /*
    Filters
    */

    const checkedFilters =
    document.querySelectorAll(
        "input[type=checkbox]:checked"
    );


    /*
    Group selected filters
    by category.
    */

    const selected = {};


    checkedFilters.forEach(filter => {

        const category =
        filter.dataset.filter;


        const value =
        filter.value;


        if(!selected[category]){

            selected[category] = [];

        }


        selected[category].push(value);

    });



    /*
    Apply each category.
    
    Multiple choices within
    the same category use OR.

    Example:
    Chicken OR Beef

    Different categories use AND.

    Example:
    Chicken AND Italian
    */

    Object.keys(selected)
    .forEach(category => {

        const values =
        selected[category];


        filtered =
        filtered.filter(recipe => {

            const recipeValues =
            recipe.categories &&
            recipe.categories[category]
            ?
            recipe.categories[category]
            :
            [];


            return values.some(
                value =>
                recipeValues.includes(value)
            );

        });

    });



    displayRecipes(filtered);

}






/*
Search listener
*/

document
.querySelector("#recipe-search")
.addEventListener(
    "input",
    filterRecipes
);





/*
Filter listener

This uses event delegation
because the checkboxes are
created dynamically.
*/

document
.querySelector("#filters")
.addEventListener(
    "change",
    filterRecipes
);





loadRecipes();




// =========================================
// FILTER TOGGLE
// =========================================

const filterToggle =
    document.querySelector("#filter-toggle");

const filters =
    document.querySelector("#filters");


if (filterToggle && filters) {

    // Start collapsed
    filters.classList.remove("open");


    filterToggle.addEventListener("click", () => {

        filters.classList.toggle("open");


        const isOpen =
            filters.classList.contains("open");


        filterToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}