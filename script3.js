function wordComparison1() {
    let wordMatchOrNot = wordMatch1(100, 51);
    if (wordMatchOrNot == "a") {
        console.log("a is true");
    } else if (wordMatchOrNot == "b") {
        console.log("b is true");
    } else if (wordMatchOrNot == "c") {
        console.log("c is true");
    }
}

function wordMatch1(result, result1) {
    if (result == 100) {
        return "a";
    } else {
        if (result1 > 50) {
            return "b";
        } else {
            return "c";
        }
    }
}

wordComparison1();
