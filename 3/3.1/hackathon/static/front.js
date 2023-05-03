"use strict";
var Buttons;
(function (Buttons) {
    Buttons["plus"] = "plus";
    Buttons["minus"] = "minus";
})(Buttons || (Buttons = {}));
function fetchData(button) {
    fetch(`http://localhost:3000?action=${button}`, {
        method: "POST"
    }).then(res => res.json())
        .then(res => {
        let plus = document.getElementById("plus");
        let minus = document.getElementById("minus");
        if (res.plus && plus) {
            plus.innerHTML = `Plus pressed: ${res.plus}`;
        }
        else if (minus) {
            minus.innerHTML = `Minus pressed: ${res.minus}`;
        }
    });
}
