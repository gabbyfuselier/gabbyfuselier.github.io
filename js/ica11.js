const btn = document.querySelector("button");

function userInput(){
    let text = prompt("Enter a message");
    return(text);
}

btn.addEventListener("click", () => 
    displayMessage(userInput(), "warning"),
);



function displayMessage(msgText, msgType){
    const body = document.body;

    const panel = document.createElement("div");
    panel.setAttribute("class", "msgBox");
    body.appendChild(panel);

    const msg = document.createElement("p");
    msg.textContent = msgText;
    panel.appendChild(msg);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "x";
    panel.appendChild(closeBtn);

    closeBtn.addEventListener("click", () =>
    panel.parentNode.removeChild(panel),
    );

    if (msgType === "warning") {
        msg.style.backgroundImage = "url(../img/flower_cartoon.jpeg)";
        panel.style.backgroundColor = "pink";
      } else if (msgType === "chat") {
        msg.style.backgroundImage = "url(../img/redBall.png)";
        panel.style.backgroundColor = "green";
      } else {
        msg.style.paddingLeft = "20px";
      }
      

  }

// displayMessage();

  