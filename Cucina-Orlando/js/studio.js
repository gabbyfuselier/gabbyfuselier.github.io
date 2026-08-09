// =========================================
// RECIPE STUDIO
// =========================================


// =========================================
// INGREDIENTS
// =========================================

const ingredients =
    document.querySelector("#ingredients");


document
    .querySelector("#add-ingredient")
    .addEventListener("click", addIngredient);


function addIngredient() {

    const row =
        document.createElement("div");

    row.className =
        "ingredient-row";


    row.innerHTML = `

        <input
        type="text"
        placeholder="Quantity">

        <input
        type="text"
        placeholder="Unit">

        <input
        type="text"
        placeholder="Ingredient">

        <input
        type="text"
        placeholder="Note (optional)">

        <button
        type="button"
        class="remove-field"
        onclick="removeField(this)">

            ×

        </button>

    `;


    ingredients.appendChild(row);

}





// =========================================
// STEPS
// =========================================

const stepsContainer =
    document.querySelector("#steps");


document
    .querySelector("#add-step")
    .addEventListener("click", addStep);


function addStep() {

    const step =
        document.createElement("div");

    step.className =
        "step-row";


    step.innerHTML = `

        <textarea
        placeholder="Describe this step">
        </textarea>

        <button
        type="button"
        class="remove-field"
        onclick="removeField(this)">

            ×

        </button>

    `;


    stepsContainer.appendChild(step);

}





// =========================================
// REMOVE INGREDIENT / STEP
// =========================================

function removeField(button) {

    button.parentElement.remove();

}





// =========================================
// FORM SUBMISSION
// =========================================

document
    .querySelector("#recipe-form")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            // ---------------------------------
            // INGREDIENT DATA
            // ---------------------------------

            const ingredientRows =
                document.querySelectorAll(
                    ".ingredient-row"
                );


            const ingredientData = [];


            ingredientRows.forEach(row => {

                const inputs =
                    row.querySelectorAll("input");


                const quantity =
                    inputs[0].value.trim();


                const unit =
                    inputs[1].value.trim();


                const name =
                    inputs[2].value.trim();


                const note =
                    inputs[3].value.trim();


                // Skip completely empty rows

                if (!name) {
                    return;
                }


                ingredientData.push({

                    quantity:
                        quantity === ""
                        ? ""
                        : Number(quantity),

                    unit:
                        unit,

                    name:
                        name,

                    note:
                        note

                });

            });





            // ---------------------------------
            // STEP DATA
            // ---------------------------------

            const stepRows =
                document.querySelectorAll(
                    ".step-row"
                );


            const stepData = [];


            stepRows.forEach(row => {

                const textarea =
                    row.querySelector("textarea");


                const description =
                    textarea.value.trim();


                if (!description) {
                    return;
                }


                stepData.push({

                    description:
                        description,

                    image:
                        ""

                });

            });





            // ---------------------------------
            // TIME
            // ---------------------------------

            const prepInput =
                document.querySelector("#prep-time");


            const cookInput =
                document.querySelector("#cook-time");


            const totalInput =
                document.querySelector("#total-time");



            const time = {};



            if (
                prepInput &&
                prepInput.value !== ""
            ) {

                time.prep =
                    Number(prepInput.value);

            }



            if (
                cookInput &&
                cookInput.value !== ""
            ) {

                time.cook =
                    Number(cookInput.value);

            }



            if (
                totalInput &&
                totalInput.value !== ""
            ) {

                time.total =
                    Number(totalInput.value);

            }





            // ---------------------------------
            // RECIPE
            // ---------------------------------

            const recipe = {

                id:
                    document.querySelector("#id").value,


                title:
                    document.querySelector("#title").value,


                approved:
                    document.querySelector("#approved").checked,


                featured:
                    document.querySelector("#featured").checked,


                dateAdded:
                    new Date()
                        .toISOString()
                        .split("T")[0],


                lastUpdated:
                    new Date()
                        .toISOString()
                        .split("T")[0],



                images: {

                    hero:
                        document.querySelector(
                            "#hero-image"
                        ).value,

                    gallery: []

                },



                video:
                    document.querySelector(
                        "#video"
                    ).value,



                time:
                    time,



                servings:
                    Number(
                        document.querySelector(
                            "#servings"
                        ).value
                    ),



                difficulty:
                    document.querySelector(
                        "#difficulty"
                    ).value,



                categories: {

                    meal:
                        recipeTags.meal,

                    protein:
                        recipeTags.protein,

                    cuisine:
                        recipeTags.cuisine,

                    dishType:
                        recipeTags.dishType,

                    equipment:
                        recipeTags.equipment,

                    tags:
                    recipeTags.tags

                },



                ingredients:
                    ingredientData,



                steps:
                    stepData,



                nutrition: {},



                private: {

                    source: "",

                    notes: ""

                }

            };





            // ---------------------------------
            // OUTPUT
            // ---------------------------------

            document
                .querySelector("#output")
                .textContent =
                JSON.stringify(
                    recipe,
                    null,
                    2
                );

        }
    );