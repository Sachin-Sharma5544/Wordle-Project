let secretWord = ["B", "E", "G", "I", "N"];
let kbModule = document.querySelector(".my-kb-row-wrapper");
let gridRows = document.querySelectorAll(".my-word-grid");
let clearbtn = document.querySelector("#my-clear-btn");
//console.log(gridRows);

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

function typedWord(gridRowNum) {
    let typedWord = [];
    for (let i = 0; i < gridRowNum.children.length; i++) {
        typedWord.push(gridRowNum.children[i].innerText);
    }
    console.log("the typed word is ", typedWord);
    return typedWord;
}

function wordComparison(secretWord, userWord, rowNum) {
    let wordMatchVal = wordMatch(secretWord, userWord, rowNum).toLowerCase();

    if (wordMatchVal == "full match") {
        styleFullMatchElements(rowNum);
    } else if (wordMatchVal == "partial match") {
        console.log("now styling partial match elements");
    } else if (wordMatchVal == "no match") {
        console.log("now styling no match elements");
    }
}

function wordMatch(secretWord, userWord) {
    let chkFullMatchVal = chkFullMatch(secretWord, userWord).toLowerCase();
    let chkPartialMatchVal = chkPartialMatch(secretWord, userWord);

    if (chkFullMatchVal == "full match") {
        return "Full Match";
    } else if (chkFullMatchVal == "check partial match") {
        if (chkPartialMatchVal == true) {
            return "Partial Match";
        } else {
            return "No Match";
        }
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

function chkFullMatch(secretWord, userWord) {
    if (secretWord.join("") == userWord.join("")) {
        return "Full Match";
    } else {
        return "Check Partial Match";
    }
}

function chkPartialMatch(secretWord, userWord) {
    let partialMatchFlag = false;

    for (let i = 0; i < userWord.length; i++) {
        if (userWord.indexOf(secretWord[i]) > -1) {
            partialMatchFlag = true;
            break;
        }
    }
    return partialMatchFlag;
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
