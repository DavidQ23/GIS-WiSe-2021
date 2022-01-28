import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Gefrierschrank {
    
    export interface Gefriergut {
        name: string;
        ablaufdatum: Date;
        anlegdatum: Date;
        notiz: string;
        menge: number;
    }


    //MongoDB verbinden und anlegen
    let gefriergutliste: Mongo.Collection;

    async function connectWithDB(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();

        gefriergutliste = mongoClient.db("Gefrierschrank").collection("Gefriergut");
    }

    let mongoURL: string = "";


    // Portzuweisung falls keiner vorhanden
    console.log("Starting Server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    //Funktion für Serverstarten
    function serverStart(_port: number): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
    }
    //Abruf der Funktionen    
    serverStart(port);
    connectWithDB(mongoURL);



    function handleListen(): void {
        console.log("Listening");
    }

    
    //Anfrage bearbeiten
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            //erhaltene URL in String
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let jsonString: string = JSON.stringify(url.query);
            console.log(jsonString);

            // Serververarbeitung zum Speichern der formData
            if (url.pathname == "/saveGefriergut") {
                let gefriergut: Gefriergut = JSON.parse(jsonString);
                let mongoResponse: string = await saveGefriergut(gefriergut);
                _response.write(mongoResponse);
            }

            if (url.pathname == "/allGefriergut") {
                let gefriergutliste: Gefriergut[] = await buildSite();
                _response.write(JSON.stringify(gefriergutliste)); 
            }
        }

        //Funktion zum Speichern der FormData
        function saveGefriergut(_gefriergut: Gefriergut): string {
            gefriergutliste.insertOne(_gefriergut);
            let serverResponse: string = "Gefriergut wurde hinzugefügt";
            return serverResponse;
        }

        //Funktion um Seite auf Übersicht darzustellen

        async function buildSite(): Promise<Gefriergut[]> {
            let cursor: Mongo.Cursor = gefriergutliste.find();
            let result: Gefriergut[] = await cursor.toArray();
            return result;
        }
        _response.end();
    }
}