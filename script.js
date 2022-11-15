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
    setGridData(key);
};

/* #####Functionality implementation using UI Keybord module/App Ends #####*/

/* #####Functionality implementation using Device Keybopard starts #####*/

document.onkeyup = function (e) {
    let keyArray = ignoreKeys();
    let key = e.key.toUpperCase();
    if (!keyArray.includes(key)) {
        setGridData(key);
    }
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
                let userWord = typedWord(gridRows[rowCntr.currCount()]);
                // wordComparison(secretWord, userWord, rowCntr.currCount());
                // rowCntr.incCount();
                // colCntr = counter(0);

                let wordCompVal = wordComparison(
                    secretWord,
                    userWord,
                    rowCntr.currCount()
                );
                colCntr = counter(0);
                if (wordCompVal.toLowerCase() == "full match") {
                    rowCntr = counter(0);
                    colCntr = counter(0);
                    setTimeout(function () {
                        alert(
                            "You guessed it Right!!! Click ok to reset the game"
                        );
                        resetStyles();
                    }, 1000);
                } else {
                    rowCntr.incCount();
                    colCntr = counter(0);
                }
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
    return typedWord;
}

function wordComparison(secretWord, userWord, rowNum) {
    let wordMatchVal = wordMatch(secretWord, userWord, rowNum).toLowerCase();

    if (wordMatchVal == "full match") {
        styleFullMatchElements(rowNum);
        return "full match";
    } else if (wordMatchVal == "partial match") {
        stylePartialMatchElements(secretWord, userWord, rowNum);
        return "partial match";
    } else if (wordMatchVal == "no match") {
        styleNoMatchElements(rowNum);
        return "No Match";
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
        gridRows[rowNum].children[i].style.backgroundColor = "rgb(4, 132, 4)";
    }
}

function styleNoMatchElements(rowNum) {
    for (let i = 0; i < gridRows[rowNum].childElementCount; i++) {
        gridRows[rowNum].children[i].style.backgroundColor = "rgb(189, 36, 36)";
    }
}

function stylePartialMatchElements(secretWord, userWord, rowNum) {
    for (let i = 0; i < userWord.length; i++) {
        if (secretWord.includes(userWord[i])) {
            if (
                secretWord.indexOf(userWord[i]) == userWord.indexOf(userWord[i])
            ) {
                gridRows[rowNum].children[i].style.backgroundColor =
                    "rgb(4, 132, 4)";
            } else {
                gridRows[rowNum].children[i].style.backgroundColor =
                    "rgb(157, 157, 2)";
            }
        } else {
            gridRows[rowNum].children[i].style.backgroundColor =
                "rgb(189, 36, 36)";
        }
    }
}

function resetStyles() {
    for (let i = 0; i < gridRows.length; i++) {
        for (let j = 0; j < gridRows[i].children.length; j++) {
            gridRows[i].children[j].style.backgroundColor = "";
            gridRows[i].children[j].textContent = "";
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

function ignoreKeys() {
    let keyArray = [
        "TAB",
        "CAPSLOCK",
        "SHIFT",
        "CONTROL",
        "ALT",
        "META",
        " ",
        "ARROWLEFT",
        "ARROWUP",
        "ARROWDOWN",
        "ARROWRIGHT",
        "ESCAPE",
        "`",
        "~",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-",
        "_",
        "+",
        "=",
        "{",
        "}",
        "[",
        "]",
        "|",
        "/",
        "'",
        '"',
        ":",
        ";",
        "?",
        ",",
        "<",
        ">",
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "\\",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
    ];
    return keyArray;
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
