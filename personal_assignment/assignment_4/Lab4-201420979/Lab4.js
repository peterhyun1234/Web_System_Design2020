const btnContainer = document.querySelector(".btn");
const textAreaContainer = document.querySelector(".textArea");
const sectionContainer = document.querySelector("#lab3Section");
const boxContainer = document.querySelector(".box1");

let degreeOfText = 0;

function addArticle(inputStr) {
    let creatingArticle = document.createElement("article");
    creatingArticle.innerHTML = inputStr;
    sectionContainer.appendChild(creatingArticle);
};

function addTextHandler(event) {
    const inputText = textAreaContainer.value;
    if (inputText != "") {
        //console.log(inputText);
        addArticle(inputText);
    }
};

function init() {
    btnContainer.addEventListener("click", addTextHandler);
};

init();