/// <reference path="modelData.ts" />

namespace App.UI {
    import Data = App.Data;

    export const elementIds = ["c", "cr", "ni", "mo", "n", "mn", "fe", "si", "cu", "ti", "nb", "v", "co"];

    export function getInputs(): { values: number[], elementIds: string[] } {
        const values = elementIds.map(id => parseFloat((<HTMLInputElement>document.getElementById(id)).value));
        const feIndex = elementIds.indexOf("fe");
        const otherElementsSum = values.reduce((acc, value, i) => i === feIndex ? acc : acc + value, 0);
        values[feIndex] = 100 - otherElementsSum;
        (<HTMLInputElement>document.getElementById("fe")).value = values[feIndex].toFixed(2);
        return { values, elementIds };
    }

    export function validateInputs(inputs: number[], elementIds: string[]): boolean {
        const errorMessagesDiv = document.getElementById("error_messages");
        let errorMessages = "";

        inputs.forEach((value, i) => {
            const elementId = elementIds[i];
            

            const min = Data.minComposition[i];
            const max = Data.maxComposition[i];
            const inputElement = document.getElementById(elementId);

            if (value < min || value > max) {
                errorMessages += `Value for ${elementId.toUpperCase()} must be between ${min} and ${max}.<br>`;
                inputElement.classList.add('is-invalid');
            } else {
                inputElement.classList.remove('is-invalid');
            }
        });

        if (errorMessages) {
            errorMessagesDiv.innerHTML = errorMessages;
            errorMessagesDiv.style.display = "block";
            return false;
        } else {
            errorMessagesDiv.style.display = "none";
            return true;
        }
    }

    export function displayOutput(ferriteNumber: number): void {
        document.getElementById("test_output").innerText = "Ferrite Number: " + ferriteNumber;
    }

    export function updateBalanceElement(): void {
        const { values, elementIds } = getInputs();
        validateInputs(values, elementIds);
    }
}