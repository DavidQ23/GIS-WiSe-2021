"use strict";
var Kühlschrank;
(function (Kühlschrank) {
    let newGefriergutForm = document.getElementById("newGefriergut");
    let saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("cick", saveGefriergut);
    async function saveGefriergut() {
        let formData = new FormData(document.forms[0]);
        let url = "https://davidqgissose2021.herokuapp.com/saveGefriergut";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        let answer = await response.text();
        console.log(answer);
        newGefriergutForm.reset();
        window.location.reload();
    }
})(Kühlschrank || (Kühlschrank = {}));
//# sourceMappingURL=scriptAnlegen.js.map