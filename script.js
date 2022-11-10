//let secretWord = ["B", "E", "G", "I", "N"];

let kbModule = document.querySelector(".my-kb-row-wrapper");
let gridRows = document.querySelectorAll(".my-word-grid");
let clearbtn = document.querySelector("#my-clear-btn");

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
    if (e.target.innerText != "") {
        return e.target.innerText;
    } else {
        return "clear";
    }
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
