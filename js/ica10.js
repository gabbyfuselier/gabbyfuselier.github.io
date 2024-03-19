const button = document.querySelector("#button1");
button.addEventListener('click', changeText);

 const heading = document.querySelector("h1")

function changeText(){
    // alert('test successful');
    const smt = prompt("Say something");
    heading.textContent = smt;

}

const button2 = document.querySelector("#button2");
button2.addEventListener('click', aFunc);

function aFunc(){
    button2.style.backgroundColor = "red";
}