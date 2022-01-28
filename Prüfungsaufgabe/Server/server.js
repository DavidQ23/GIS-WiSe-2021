"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gefrierschrank = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Gefrierschrank;
(function (Gefrierschrank) {
    //MongoDB verbinden und anlegen
    let gefriergutliste;
    async function connectWithDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        gefriergutliste = mongoClient.db("Gefrierschrank").collection("Gefriergut");
    }
    let mongoURL = "";
    // Portzuweisung falls keiner vorhanden
    console.log("Starting Server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    //Funktion für Serverstarten
    function serverStart(_port) {
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
    }
    //Abruf der Funktionen    
    serverStart(port);
    connectWithDB(mongoURL);
    function handleListen() {
        console.log("Listening");
    }
    //Anfrage bearbeiten
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            //erhaltene URL in String
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query);
            console.log(jsonString);
            // Serververarbeitung zum Speichern der formData
            if (url.pathname == "/saveGefriergut") {
                let gefriergut = JSON.parse(jsonString);
                let mongoResponse = await saveGefriergut(gefriergut);
                _response.write(mongoResponse);
            }
            if (url.pathname == "/allGefriergut") {
                let gefriergutliste = await buildSite();
                _response.write(JSON.stringify(gefriergutliste));
            }
        }
        //Funktion zum Speichern der FormData
        function saveGefriergut(_gefriergut) {
            gefriergutliste.insertOne(_gefriergut);
            let serverResponse = "Gefriergut wurde hinzugefügt";
            return serverResponse;
        }
        //Funktion um Seite auf Übersicht darzustellen
        async function buildSite() {
            let cursor = gefriergutliste.find();
            let result = await cursor.toArray();
            return result;
        }
        _response.end();
    }
})(Gefrierschrank = exports.Gefrierschrank || (exports.Gefrierschrank = {}));
//# sourceMappingURL=server.js.map