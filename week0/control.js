const a = "1";

if (a == 1) {
    console.log(a + " is 1");
} else {
    console.log(a + " is not 1");
}

let res = 1;
for(let x = 0; x <= 5; x++) { // Logical Error?
    res *= x;
}
console.log(res);