function arrayComapre(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j]) {
                if (i == j) console.log("index also match with letter present");
            } else {
                console.log("index does not match with letter present in it");
            }
        }
    }
}

function arrayCompareString(arr1, arr2) {
    let str1 = arr1.join("");
    let str2 = arr2.join("");

    if (str2.includes(str1[0])) {
        console.log(
            str2 + " includes " + str1[1] + " at index " + str2.indexOf(str1[1])
        );
    }
}

const arr1 = ["B", "E", "G", "I", "N"];
const arr2 = ["B", "I", "R", "T", "L"];

//arrayComapre(arr1, arr2);

arrayCompareString(arr1, arr2);
