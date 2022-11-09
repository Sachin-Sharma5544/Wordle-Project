// let secretWord = ["B", "E", "G", "I", "N"];

let kbModule = document.querySelector(".my-kb-row-wrapper");
let gridRows = document.querySelectorAll(".my-word-grid");
let clearbtn = document.querySelector("#my-clear-btn");

let rowCntr = counter(0); // Row counter initislised
let colCntr = counter(0); // Column counter also initialised

function rowWiseDataEntry(data, rowNum, colNum) {
    gridRows[rowNum].children[colNum].textContent = data;
}

kbModule.onclick = function (e) {
    //console.log(test(e));
    if (rowCntr.currCount() < 6) {
        if (e.target.innerText !== "ENTER" && colCntr.currCount() < 5) {
            rowWiseDataEntry(
                e.target.innerText,
                rowCntr.currCount(),
                colCntr.currCount()
            );
            if (colCntr.currCount() != 5) {
                colCntr.incCount();
            }
        } else if (e.target.innerText == "ENTER") {
            if (colCntr.currCount() == 5) {
                rowCntr.incCount();
                colCntr = counter(0);
            }
        }
    }
};

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
