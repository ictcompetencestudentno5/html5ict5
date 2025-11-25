function add() {
    let sum = 1 + 1;
    let binarysum = sum.toString(2);
        document.getElementById("wait").innerHTML = "wait";
    setTimeout(function() {
        document.getElementById("paragraph").innerText = "1 + 1 = " + binarysum;
        document.getElementById("wait").innerHTML = "";
    }, 3000)
}