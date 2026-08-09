async function loadRecipe() {

    const params =
        new URLSearchParams(window.location.search);

    const recipeID =
        params.get("id");


    const response =
        await fetch("data/recipes.json");


    const recipes =
        await response.json();


    const recipe =
        recipes.find(
            item => item.id === recipeID
        );


    if (!recipe) {

        document.querySelector(
            "#recipe-container"
        ).innerHTML = `

            <section class="container">

                <h1>
                    Recipe not found
                </h1>

            </section>

        `;

        return;

    }


    document.title =
        `${recipe.title} | Cucina Orlando`;


    const container =
        document.querySelector(
            "#recipe-container"
        );


    container.innerHTML = `


        ${createVideo(recipe)}



        <section class="recipe-hero">

            <img
                src="images/recipes/${recipe.images.hero}"
                alt="${recipe.title}"
            >

        </section>



        <section class="container recipe-header">


            ${recipe.approved ?
                `

                <span class="approved">
                    ✓ Cucina Orlando Approved
                </span>

                `
                :
                ""
            }



            <h1>
                ${recipe.title}
            </h1>



            <div class="recipe-meta">


            ${
                recipe.time?.prep
                ?
                `
                <span>
                    Prep:
                    ${formatTime(recipe.time.prep)}
                </span>
                `
                :
                ""
            }
            
            
            ${
                recipe.time?.cook
                ?
                `
                <span>
                    Cook:
                    ${formatTime(recipe.time.cook)}
                </span>
                `
                :
                ""
            }
            
            
            ${
                recipe.time?.total
                ?
                `
                <span>
                    Total:
                    ${formatTime(recipe.time.total)}
                </span>
                `
                :
                ""
            }


                ${recipe.difficulty ?
                    `

                    <span>
                        ${recipe.difficulty}
                    </span>

                    `
                    :
                    ""
                }



                ${recipe.servings ?
                    `

                    <span>
                        Serves
                        <span id="serving-number">
                            ${recipe.servings}
                        </span>
                    </span>

                    `
                    :
                    ""
                }


            </div>



            <div class="tags">

                ${createTags(recipe.categories)}

            </div>


        </section>




        <section class="container cooking-layout">


            <div class="ingredients">


                <h2>
                    Ingredients
                </h2>



                ${recipe.servings ?
                    `

                    <div class="servings-control">

                        <button
                            onclick="changeServing(-1)">
                            −
                        </button>


                        <span>

                            Servings:

                            <span id="current-serving">
                                ${recipe.servings}
                            </span>

                        </span>


                        <button
                            onclick="changeServing(1)">
                            +
                        </button>

                    </div>

                    `
                    :
                    ""
                }



                <ul>


                    ${recipe.ingredients
                        .map(
                            (item, index) => `

                            <li>

                                <label>

                                    <input
                                        type="checkbox"
                                    >


                                    <span>

                                        ${formatIngredient(
                                            item,
                                            recipe.servings
                                        )}
                                        ${
                                            item.note
                                            ?
                                            ` — ${item.note}`
                                            :
                                            ""
                                        }

                                    </span>

                                </label>

                            </li>

                            `
                        )
                        .join("")
                    }


                </ul>


            </div>





            <div class="instructions">


                <h2>
                    Instructions
                </h2>



                ${recipe.steps
                    .map(
                        (step, index) => `

                        <div class="step">


                            <h3>
                                Step ${index + 1}
                            </h3>



                            <p>
                                ${step.description}
                            </p>



                            ${
                                step.image
                                ?
                                `

                                <img
                                    src="images/recipes/${step.image}"
                                    alt="Step ${index + 1}"
                                >

                                `
                                :
                                ""
                            }


                        </div>

                        `
                    )
                    .join("")
                }


            </div>


        </section>




        ${createNutrition(recipe)}



        ${createEquipment(recipe)}




        <section class="download-section container">


            <button
                class="button primary"
                onclick="downloadPDF()">

                Download Recipe PDF

            </button>


            <button
                class="button secondary"
                onclick="startCooking()">

                Start Cooking

            </button>


        </section>


    `;



    window.currentRecipe =
        recipe;


    window.currentServing =
        recipe.servings || 1;


}






function createVideo(recipe) {

    if (!recipe.video) {

        return "";

    }


    return `

        <section class="recipe-video">

            <iframe
                src="${recipe.video}"
                allowfullscreen>
            </iframe>

        </section>

    `;

}






function createTags(categories) {

    if (!categories) {

        return "";

    }


    let tags = [];


    Object.values(categories)
        .forEach(category => {

            if (Array.isArray(category)) {

                tags.push(...category);

            }

        });


    return tags
        .map(tag => `

            <span class="tag">
                ${tag}
            </span>

        `)
        .join("");

}






function createNutrition(recipe) {

    if (
        !recipe.nutrition ||
        Object.keys(recipe.nutrition).length === 0
    ) {

        return "";

    }


    return `

        <section class="nutrition container">

            <h2>
                Nutrition
            </h2>


            ${
                recipe.nutrition.calories
                ?
                `<p>
                    Calories:
                    ${recipe.nutrition.calories}
                </p>`
                :
                ""
            }


            ${
                recipe.nutrition.protein
                ?
                `<p>
                    Protein:
                    ${recipe.nutrition.protein}
                </p>`
                :
                ""
            }

        </section>

    `;

}






function createEquipment(recipe) {

    if (
        !recipe.categories ||
        !recipe.categories.equipment ||
        recipe.categories.equipment.length === 0
    ) {

        return "";

    }


    return `

        <section class="equipment container">

            <h2>
                Equipment
            </h2>


            <p>
                ${recipe.categories.equipment.join(", ")}
            </p>

        </section>

    `;

}






function formatTime(minutes) {

    return `${Math.round(minutes / 5) * 5} mins`;

}






function roundFraction(number) {

    if (!number) {

        return "";

    }


    const rounded =
        Math.round(number * 4) / 4;


    const whole =
        Math.floor(rounded);


    const fraction =
        rounded - whole;


    const fractions = {

        0.25: "¼",

        0.5: "½",

        0.75: "¾"

    };


    if (fraction === 0) {

        return `${whole}`;

    }


    if (whole === 0) {

        return fractions[fraction];

    }


    return `${whole}${fractions[fraction]}`;

}






function formatIngredient(item, baseServings) {

    let quantity =
        Number(item.quantity);


    if (
        baseServings &&
        window.currentServing
    ) {

        quantity =
            quantity *
            (
                window.currentServing /
                baseServings
            );

    }


    return `

        ${roundFraction(quantity)}
        ${item.unit || ""}
        ${item.name}

    `;

}






function changeServing(amount) {

    if (!window.currentRecipe.servings) {

        return;

    }


    let current =
        window.currentServing;


    current += amount;


    if (current < 1) {

        return;

    }


    window.currentServing =
        current;


    document.querySelector(
        "#current-serving"
    ).innerText =
        current;


    document.querySelector(
        "#serving-number"
    ).innerText =
        current;


    const ingredients =
        document.querySelectorAll(
            ".ingredients li"
        );


    window.currentRecipe.ingredients
        .forEach(
            (item, index) => {

                const span =
                    ingredients[index]
                        .querySelector("span");


                    const note =
                    item.note
                    ?
                    ` — ${item.note}`
                    :
                    "";


                span.innerHTML = `

                    ${formatIngredient(
                        item,
                        window.currentRecipe.servings
                    )}

                    ${note}

                `;

            }
        );

}






/* ==================================================
   PDF DOWNLOAD
================================================== */


function downloadPDF() {

    const { jsPDF } =
        window.jspdf;


    const doc =
        new jsPDF();


    const recipe =
        window.currentRecipe;


    const pageWidth =
        doc.internal.pageSize.getWidth();


    const pageHeight =
        doc.internal.pageSize.getHeight();


    const margin =
        20;


    const maxWidth =
        pageWidth - margin * 2;


    let y = margin;



    function checkPageBreak(requiredHeight = 10) {

        if (
            y + requiredHeight >
            pageHeight - margin
        ) {

            doc.addPage();

            y = margin;

        }

    }



    function addWrappedText(
        text,
        fontSize = 12,
        lineSpacing = 7
    ) {

        doc.setFontSize(fontSize);


        const lines =
            doc.splitTextToSize(
                text,
                maxWidth
            );


        checkPageBreak(
            lines.length * lineSpacing
        );


        doc.text(
            lines,
            margin,
            y
        );


        y +=
            lines.length *
            lineSpacing;

    }



    doc.setFontSize(22);


    addWrappedText(
        recipe.title,
        22,
        10
    );


    y += 5;



    if (recipe.time?.total) {

        addWrappedText(
            `Total Time: ${formatTime(recipe.time.total)}`,
            12,
            7
        );

    }



    if (recipe.servings) {

        addWrappedText(
            `Servings: ${recipe.servings}`,
            12,
            7
        );

    }



    y += 5;



    addWrappedText(
        "Ingredients",
        16,
        8
    );


    y += 2;



    recipe.ingredients
        .forEach(item => {

            const quantity =
            roundFraction(item.quantity);
        
            const ingredientText =
                `${quantity} ${item.unit || ""} ${item.name}`
                +
                (
                    item.note
                    ?
                    ` — ${item.note}`
                    :
                    ""
                );


            addWrappedText(
                `• ${ingredientText}`,
                11,
                6
            );

        });



    y += 8;



    addWrappedText(
        "Instructions",
        16,
        8
    );


    y += 2;



    recipe.steps
        .forEach(
            (step, index) => {

                addWrappedText(
                    `${index + 1}. ${step.description}`,
                    11,
                    6
                );


                y += 4;

            }
        );



    if (
        recipe.categories?.equipment?.length
    ) {

        y += 5;


        addWrappedText(
            "Equipment",
            16,
            8
        );


        addWrappedText(
            recipe.categories.equipment.join(", "),
            11,
            6
        );

    }



    doc.save(
        `${recipe.title}.pdf`
    );

}






/* ==================================================
   COOKING MODE
================================================== */


let currentStep = 0;



function startCooking() {

    currentStep = 0;


    const cookingMode =
        document.querySelector(
            "#cooking-mode"
        );


    cookingMode.style.display =
        "flex";


    showStep();

}






function showStep() {

    const recipe =
        window.currentRecipe;


    const step =
        recipe.steps[currentStep];


    const cookingMode =
        document.querySelector(
            "#cooking-mode"
        );


    cookingMode.innerHTML = `

        <div class="cooking-header">


            <button
                class="cooking-back"
                onclick="closeCookingMode()">

                ← Back to Recipe

            </button>


            <span>
                Step ${currentStep + 1}
                of
                ${recipe.steps.length}
            </span>


        </div>



        <div class="cooking-content">


            <h2>
                ${recipe.title}
            </h2>


            <p class="cooking-text">

                ${step.description}

            </p>


            ${
                step.image
                ?
                `

                <img
                    class="cooking-image"
                    src="images/recipes/${step.image}"
                    alt="Step ${currentStep + 1}"
                >

                `
                :
                ""
            }


        </div>



        <div class="cooking-controls">


            <button
                class="button secondary"
                onclick="previousStep()"
                ${currentStep === 0 ? "disabled" : ""}>

                ← Back

            </button>



            ${
                currentStep <
                recipe.steps.length - 1
                ?

                `

                <button
                    class="button primary"
                    onclick="nextStep()">

                    Next →

                </button>

                `

                :

                `

                <button
                    class="button primary"
                    onclick="closeCookingMode()">

                    Finish

                </button>

                `
            }


        </div>

    `;


    resizeCookingText();

}






function resizeCookingText() {

    const text =
        document.querySelector(
            ".cooking-text"
        );


    if (!text) {

        return;

    }


    const length =
        text.innerText.length;


    let size = 2.4;


    if (length > 250) {

        size = 2.0;

    }


    if (length > 400) {

        size = 1.7;

    }


    if (length > 600) {

        size = 1.5;

    }


    if (length > 800) {

        size = 1.3;

    }


    text.style.fontSize =
        `${size}rem`;

}






function nextStep() {

    if (
        currentStep <
        window.currentRecipe.steps.length - 1
    ) {

        currentStep++;

        showStep();

    }

}






function previousStep() {

    if (currentStep > 0) {

        currentStep--;

        showStep();

    }

}






function closeCookingMode() {

    const cookingMode =
        document.querySelector(
            "#cooking-mode"
        );


    cookingMode.style.display =
        "none";



    cookingMode.innerHTML =
        "";

}






loadRecipe();