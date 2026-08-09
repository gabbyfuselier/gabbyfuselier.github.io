// =========================================
// RECIPE TAG SYSTEM
// =========================================


// Tags currently selected for this recipe

const recipeTags = {

    meal: [],

    cuisine: [],

    protein: [],

    dishType: [],

    equipment: [],

    tags: []

};



// =========================================
// FIXED MEAL OPTIONS
// =========================================

const mealOptions = [

    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert"

];



// =========================================
// LOAD EXISTING TAGS FROM RECIPES
// =========================================

async function loadExistingTags() {

    try {

        const response =
            await fetch("data/recipes.json");


        const recipes =
            await response.json();


        const tagOptions = {

            cuisine: new Set(),

            protein: new Set(),

            dishType: new Set(),

            equipment: new Set(),

            tags: new Set()

        };


        recipes.forEach(recipe => {

            if (!recipe.categories) {
                return;
            }


            Object.keys(tagOptions).forEach(category => {

                if (
                    recipe.categories[category] &&
                    Array.isArray(recipe.categories[category])
                ) {

                    recipe.categories[category].forEach(tag => {

                        tagOptions[category].add(tag);

                    });

                }

            });

        });


        renderTagOptions(
            "meal",
            mealOptions
        );


        renderTagOptions(
            "cuisine",
            [...tagOptions.cuisine].sort()
        );


        renderTagOptions(
            "protein",
            [...tagOptions.protein].sort()
        );


        renderTagOptions(
            "dishType",
            [...tagOptions.dishType].sort()
        );


        renderTagOptions(
            "equipment",
            [...tagOptions.equipment].sort()
        );

        renderTagOptions(
            "tags",
            [...tagOptions.tags].sort()
        );


    } catch (error) {

        console.error(
            "Could not load recipe tags:",
            error
        );

    }

}



// =========================================
// DISPLAY CLICKABLE TAG OPTIONS
// =========================================

function renderTagOptions(type, options) {

    const container =
        document.querySelector(
            `#${type}-options`
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    options.forEach(tag => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className = "tag-option";

        button.textContent = tag;


        button.addEventListener(
            "click",
            () => selectTag(type, tag)
        );


        container.appendChild(button);

    });

}



// =========================================
// SELECT A TAG
// =========================================

function selectTag(type, value) {

    // Don't add the same tag twice

    if (
        recipeTags[type].includes(value)
    ) {

        return;

    }


    recipeTags[type].push(value);


    renderSelectedTags(type);

}



// =========================================
// ADD A BRAND NEW TAG
// =========================================

function addTag(type) {

    const input =
        document.querySelector(
            `#${type}-input`
        );


    const value =
        input.value.trim();


    if (!value) {
        return;
    }


    // Don't allow exact duplicates

    if (
        recipeTags[type].includes(value)
    ) {

        input.value = "";

        return;

    }


    recipeTags[type].push(value);


    input.value = "";


    renderSelectedTags(type);


    // Add the new tag to the clickable
    // options for this session

    addTagOption(type, value);

}



// =========================================
// ADD NEW TAG TO CLICKABLE OPTIONS
// =========================================

function addTagOption(type, value) {

    const container =
        document.querySelector(
            `#${type}-options`
        );


    if (!container) {
        return;
    }


    // Don't create duplicate buttons

    const existing =
        [...container.children]
            .find(button =>
                button.textContent === value
            );


    if (existing) {
        return;
    }


    const button =
        document.createElement("button");


    button.type = "button";

    button.className = "tag-option";

    button.textContent = value;


    button.addEventListener(
        "click",
        () => selectTag(type, value)
    );


    container.appendChild(button);

}



// =========================================
// DISPLAY SELECTED TAGS
// =========================================

function renderSelectedTags(type) {

    const container =
        document.querySelector(
            `#${type}-tags`
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    recipeTags[type].forEach(
        (tag, index) => {


            const selected =
                document.createElement("span");


            selected.className =
                "input-tag";


            selected.innerHTML = `

                ${tag}

                <button
                type="button"
                onclick="removeTag('${type}', ${index})">

                    ×

                </button>

            `;


            container.appendChild(selected);

        }
    );

}



// =========================================
// REMOVE SELECTED TAG
// =========================================

function removeTag(type, index) {

    recipeTags[type].splice(
        index,
        1
    );


    renderSelectedTags(type);

}



// =========================================
// START TAG SYSTEM
// =========================================

loadExistingTags();