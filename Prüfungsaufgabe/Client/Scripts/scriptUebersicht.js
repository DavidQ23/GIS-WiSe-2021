"use strict";
var Gefrierschrank;
(function (Gefrierschrank) {
    let allGefriergut = document.getElementById("displayListe");
    window.onload = async function buildSite() {
        let url = "https://davidqgissose2021.herokuapp.com/allGefriergut";
        let response = await fetch(url);
        let answer = await response.text();
        let everyGefriergut = JSON.parse(answer);
        let displayTabelle = document.getElementById("displayListe");
        let inhaltstabelle = document.getElementById("inhaltstabelle");
        //Aufbau der Seite
        for (let i = 0; i < everyGefriergut.length; i++) {
        }
    };
})(Gefrierschrank || (Gefrierschrank = {}));
//# sourceMappingURL=scriptUebersicht.js.map