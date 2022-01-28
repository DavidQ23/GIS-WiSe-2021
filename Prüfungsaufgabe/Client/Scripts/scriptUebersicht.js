"use strict";
var Gefrierschrank;
(function (Gefrierschrank) {
    let allGefriergut = document.getElementById("displayListe");
    window.onload = async function buildSite() {
        let url = "https://davidqgissose2021.herokuapp.com/allGefriergut";
        let response = await fetch(url);
        let answer = await response.text();
        let everyGefriergut = JSON.parse(answer);
    };
})(Gefrierschrank || (Gefrierschrank = {}));
//# sourceMappingURL=scriptUebersicht.js.map