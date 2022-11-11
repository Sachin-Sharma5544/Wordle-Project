let secretWord = ["B", "E", "G", "I", "N"];

let kbModule = document.querySelector(".my-kb-row-wrapper");
let gridRows = document.querySelectorAll(".my-word-grid");
let clearbtn = document.querySelector("#my-clear-btn");
console.log(gridRows);

let rowCntr = counter(0); // Row counter initislised
let colCntr = counter(0); // Column counter also initialised

/* ##### Functionality implementation using UI Keybord module/App starts #####*/

kbModule.onclick = function (e) {
    let key = clickedKey(e).toUpperCase();
    key = setGridData(key);
};

/* #####Functionality implementation using UI Keybord module/App Ends #####*/

/* #####Functionality implementation using Device Keybopard starts #####*/

document.onkeyup = function (e) {
    let key = e.key.toUpperCase();
    setGridData(key);
};

/* ##### Functionality implementation using Device Keybopard Ends ##### */

function setGridData(key) {
    if (rowCntr.currCount() < 6) {
        if (key !== "ENTER" && colCntr.currCount() < 6) {
            if (
                (key == "CLEAR" || key == "BACKSPACE") &&
                colCntr.currCount() >= 0
            ) {
                colCntr.decCount();
                clearCellData(rowCntr.currCount(), colCntr.currCount());

                if (colCntr.currCount() >= 0) {
                    colCntr.decCount();
                }
            } else {
                setCellData(key, rowCntr.currCount(), colCntr.currCount());
            }

            if (colCntr.currCount() != 5) {
                colCntr.incCount();
            }
        } else if (key == "ENTER") {
            if (colCntr.currCount() == 5) {
                //console.log(rowCntr.currCount(), "correct");
                wordComparison(
                    secretWord,
                    typedWord(gridRows[rowCntr.currCount()]),
                    rowCntr.currCount()
                );
                rowCntr.incCount();
                colCntr = counter(0);
            } else {
                alert("word is short");
            }
        }
    }
}

//function to enter cell data in a row
function setCellData(data, rowNum, colNum) {
    if (colNum > -1 && colNum < 5) {
        gridRows[rowNum].children[colNum].textContent = data;
    }
}

//function to clear the cell data
function clearCellData(rowNum, colNum) {
    if (colNum > -1 && colNum < 5) {
        gridRows[rowNum].children[colNum].textContent = "";
    }
}

//function to find the clicked key
function clickedKey(e) {
    //console.log(ev.target.innerText);
    if (e.target.name == undefined) {
        //return e.target.innerText;
        return "clear";
    } else {
        return e.target.name;
    }
}

function typedWord(gridRowData) {
    let typedWord = [];
    for (let i = 0; i < gridRowData.children.length; i++) {
        typedWord.push(gridRowData.children[i].innerText);
    }
    return typedWord;
}

function wordComparison(secretWord, userWord, rowNum) {
    if (wordMatch(secretWord, userWord, rowNum).toLowerCase() == "full match") {
        styleFullMatchElements(rowNum);
    } else if (
        wordMatch(secretWord, userWord, rowNum).toLowerCase() == "partial match"
    ) {
        console.log("partial match");
        stylePartialMatchElements(secretWord, userWord, rowNum);
    } else if (
        wordMatch(secretWord, userWord, rowNum).toLowerCase() == "no match"
    ) {
        console.log("No Match");
    }
}

function wordMatch(secretWord, userWord, rowNum) {
    if (fullMatch(secretWord, userWord) == true) {
        return "Full Match";
    } else if (chkPartialMatch(secretWord, userWord, rowNum)) {
        return "Partial Match";
    } else {
        return "No Match";
    }
}

function styleFullMatchElements(rowNum) {
    for (let i = 0; i < gridRows[rowNum].childElementCount; i++) {
        gridRows[rowNum].children[i].style.backgroundColor = "rgb(23, 247, 23)";
        gridRows[rowNum].children[i].style.border = "2px solid rgb(5, 101, 5);";
    }
}

function stylePartialMatchElements(secretWord, userWord, rowNum) {
    for (let i = 0; i < gridRows[rowNum].childElementCount; i++) {
        if (secretWord[i] == userWord[i]) {
            gridRows[rowNum].children[i].style.backgroundColor =
                "rgb(23, 247, 23)";
            gridRows[rowNum].children[i].style.border =
                "2px solid rgb(5, 101, 5);";
        }
    }
}

function fullMatch(secretWord, userWord) {
    if (secretWord.join("") == userWord.join("")) return true;
    if (secretWord.join("") != userWord.join("")) return false;
}

function chkPartialMatch(secretWord, userWord, rowNum) {
    let matchCount = 0;
    for (let i = 0; i < gridRows[rowNum].childElementCount; i++) {
        if (secretWord[i] == userWord[i]) {
            matchCount++;
        }
    }
    if (matchCount > 0) return true;
    if (matchCount <= 0) return false;
}

//Counter inplementation for accessing Rows and Columns of grid
function counter(initialVal) {
    let count = initialVal;
    function incCount() {
        count++;
        return count;
    }
    function decCount() {
        count--;
        return count;
    }

    function currCount() {
        return count;
    }
    return {
        incCount: incCount,
        decCount: decCount,
        currCount: currCount,
    };
}
