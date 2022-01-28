namespace Kühlschrank {
    interface Gefriergut {
        name: string;
        ablaufdatum: Date;
        anlegdatum: Date;
        notiz: string;
        anzahl: number;
    }

    let newGefriergutForm: HTMLFormElement = <HTMLFormElement>document.getElementById("newGefriergut");

    let saveButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveButton");
    saveButton.addEventListener("cick", saveGefriergut);

    async function saveGefriergut(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://davidqgissose2021.herokuapp.com/saveGefriergut";
        let query: URLSearchParams = new URLSearchParams(<any>formData);

        url = url + "?" + query.toString();
        console.log(url);

        let response: Response = await fetch(url);
        let answer: string = await response.text();
        console.log(answer);
        newGefriergutForm.reset();
        window.location.reload();
    }
}