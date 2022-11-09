//Counter inplementation for accessing Rows and Columns of grid
function counter(initialVal) {
    let count = initialVal;
    function incrementCount() {
        count++;
        return count;
    }
    function decrementCount() {
        count--;
        return count;
    }

    function currentCountVal() {
        return count;
    }
    return {
        incrementCount: incrementCount,
        decrementCount: decrementCount,
        currentCountVal: currentCountVal,
    };
}

let rowCounter = counter(0); // Row counter initislised
let colCounter = counter(0); // Column counter also initialised

// let secretWord = ["B", "E", "G", "I", "N"];

let kbModule = document.querySelector(".my-kb-row-wrapper");
let gridRows = document.querySelectorAll(".my-word-grid");

kbModule.onclick = function (e) {
    //console.log(e);
    if (rowCounter.currentCountVal() < 6) {
        if (
            e.target.innerText !== "ENTER" &&
            colCounter.currentCountVal() < 5
        ) {
            gridRows[rowCounter.currentCountVal()].children[
                colCounter.currentCountVal()
            ].textContent = e.target.innerText;

            if (colCounter.currentCountVal() != 4) {
                colCounter.incrementCount();
            }
        } else if (e.target.innerText == "ENTER") {
            if (colCounter.currentCountVal() == 4) {
                rowCounter.incrementCount();
                colCounter = counter(0);
            }
        }
    }
};

/*
//This is the hardcoded implementation of the wordle application
//tomorrow i have implement it in generalized form
console.log(gridRows[0].children[1]);
console.log(gridRows[0].children[0]);

*/
