/// <reference path="ui.ts" />
/// <reference path="fnn1999.ts" />

namespace App {
    import UI = App.UI;
    import Calculation = App.Calculation;

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher') as HTMLInputElement;
    const htmlElement = document.documentElement;

    function setTheme(isDark: boolean): void {
        htmlElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark';

    if (themeSwitcher) {
        themeSwitcher.checked = isDark;
        setTheme(isDark);

        themeSwitcher.addEventListener('click', (event) => {
            const newIsDark = (event.target as HTMLInputElement).checked;
            setTheme(newIsDark);
        });
    }

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

    UI.elementIds.forEach(id => {
        if (id !== 'fe') {
            const inputElement = document.getElementById(id);
            if (inputElement) {
                inputElement.addEventListener('input', () => {
                    UI.updateBalanceElement();
                });
            }
        }
    });

    UI.updateBalanceElement();
});
}