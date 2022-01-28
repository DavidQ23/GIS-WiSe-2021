"use strict";
var Gefrierschrank;
(function (Gefrierschrank) {
    let heutigesDatum = Date.now();
    let datumString = heutigesDatum.toString();
    //Zugriff auf Form Elemente
    let newGefriergutForm = document.getElementById("newGefriergut");
    let saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("cick", saveGefriergut);
    async function saveGefriergut() {
        let formData = new FormData(document.forms[0]);
        let url = "https://davidqgissose2021.herokuapp.com/saveGefriergut";
        let query = new URLSearchParams(formData);
        //Eingaben an die URL zur Weiterverarbeitung anhängen
        url = url + "?" + query.toString() + "&anlegdatum=" + datumString + "&menge=1";
        console.log(url);
        let response = await fetch(url);
        let answer = await response.text();
        console.log(answer);
        newGefriergutForm.reset();
        window.location.reload();
    }
})(Gefrierschrank || (Gefrierschrank = {}));
//# sourceMappingURL=scriptAnlegen.js.map