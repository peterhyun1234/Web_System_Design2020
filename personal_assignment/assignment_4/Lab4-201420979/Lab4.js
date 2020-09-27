const btnContainer = document.querySelector(".btn");
const textAreaContainer = document.querySelector(".textArea");
const sectionContainer = document.querySelector("#lab3Section");
const cntDivContainer = document.querySelector(".cntDiv");

let degreeOfText = 0;

function refreshDegreeOfMemo() {
    degreeOfText++;
    cntDivContainer.innerHTML = degreeOfText;
}

function addArticle(inputStr) {
    let creatingArticle = document.createElement("article");

    creatingArticle.innerHTML = inputStr;
    creatingArticle.style.backgroundColor = "green";
    creatingArticle.style.marginBottom = 10 + "px";
    creatingArticle.style.width = 100 + "%";

    sectionContainer.appendChild(creatingArticle);
    refreshDegreeOfMemo();
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
    cntDivContainer.innerHTML = degreeOfText;

};

init();