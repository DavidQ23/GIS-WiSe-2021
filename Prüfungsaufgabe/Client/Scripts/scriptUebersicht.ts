namespace Gefrierschrank {
    interface Gefriergut {
        name: string;
        ablaufdatum: Date;
        notiz: string;
        anlegdatum: Date;
        menge: number;
    }

    let allGefriergut: HTMLDivElement = <HTMLDivElement>document.getElementById("displayListe");

    window.onload = async function buildSite(): Promise<void> {

        let url: string = "https://davidqgissose2021.herokuapp.com/allGefriergut";
        let response: Response = await fetch(url);
        let answer: string = await response.text();
        let everyGefriergut: Gefriergut[] = JSON.parse(answer);
    }
}