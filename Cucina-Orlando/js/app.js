async function loadHomepageRecipes(){


    const response = await fetch("data/recipes.json");
    
    const recipes = await response.json();
    
    
    
    // Sort newest first
    
    recipes.sort(
    (a,b)=>
    new Date(b.dateAdded) - new Date(a.dateAdded)
    );
    
    
    
    
    
    // FEATURED RECIPE
    
    
    const featured =
    recipes.find(recipe=>recipe.featured);
    
    
    
    if(featured){
    
    
    document.querySelector("#featured-recipe")
    .innerHTML = `
    
    
    <a 
    class="featured-card"
    href="recipe.html?id=${featured.id}"
    >
    
    
    <img 
    src="images/recipes/${featured.images.hero}"
    alt="${featured.title}"
    >
    
    
    <div>
    
    
    <h3>
    ${featured.title}
    </h3>
    
    
    <p>
    
    ${featured.categories.meal[0]}
    
    ${
    featured.categories.cuisine.length
    ?
    " • " + featured.categories.cuisine[0]
    :
    ""
    
    }
    
    </p>
    
    
    </div>
    
    
    </a>
    
    
    `;
    
    }
    
    
    
    
    
    // NEW RECIPES
    
    
    const newest =
    recipes.slice(0,3);
    
    
    
    const grid =
    document.querySelector("#new-recipe-grid");
    
    
    
    newest.forEach(recipe=>{
    
    
    grid.innerHTML += `
    
    
    <a 
    class="recipe-card"
    href="recipe.html?id=${recipe.id}"
    >
    
    
    <img
    src="images/recipes/${recipe.images.hero}"
    alt="${recipe.title}"
    >
    
    
    <div class="recipe-card-content">
    
    
    <h3>
    ${recipe.title}
    </h3>
    
    
    <p>
    
    ${recipe.categories.meal[0]}
    
    ${
    recipe.categories.cuisine.length
    ?
    " • " + recipe.categories.cuisine[0]
    :
    ""
    
    }
    
    </p>
    
    
    
    <span>
    
    ${
    Math.round(recipe.time.total / 5) * 5
    }
    mins
    
    </span>
    
    
    </div>
    
    
    </a>
    
    
    `;
    
    
    });
    
    
    
    
    }
    
    
    
    loadHomepageRecipes();