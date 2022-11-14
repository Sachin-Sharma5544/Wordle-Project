const arr1 = ["B", "E", "G", "I", "N"];
const arr3 = ["P", "U", "T", "C", "B"];
const arr2 = ["B", "I", "R", "T", "Y"];

function stylePartialMatch(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.includes(arr2[i])) {
            if (arr1.indexOf(arr2[i]) == arr2.indexOf(arr2[i])) {
                console.log("style green", arr2[i]);
                console.log("style green", i);
            } else {
                console.log("style yellow", arr2[i]);
                console.log("style yellow", i);
            }
        } else {
            console.log("style black", arr2[i]);
            console.log("style black", i);
        }
    }
}
stylePartialMatch(arr1, arr2);
