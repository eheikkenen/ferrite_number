/// <reference path="ui.ts" />
/// <reference path="fnn1999.ts" />

namespace App {
    import UI = App.UI;
    import Calculation = App.Calculation;

document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculate_button');
    if (calculateButton) {
        calculateButton.addEventListener('click', () => {
            const { values, elementIds } = UI.getInputs();
            if (UI.validateInputs(values, elementIds)) {
                const ferriteNumber = Calculation.calculateFerriteNumber(values);
                UI.displayOutput(ferriteNumber);
            }
        });
    }
});
}
