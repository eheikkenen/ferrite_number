var App;
(function (App) {
    var Data;
    (function (Data) {
        Data.minComposition = [0.008, 14.74, 4.61, 0.01, 0.01, 0.35, 45.599, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0];
        Data.maxComposition = [0.2, 32.0, 33.5, 6.85, 0.3, 12.67, 72.51, 1.3, 12.16, 2.16, 3.52, 0.92, 1.28];
        Data.inputLayerWeights = [[-0.77387279, 0.018434081, 0.82022685, 0.11006859, 0.73543739, 0.4691014],
            [-0.069039397, -2.5659544, -0.044000875, -2.9419811, -3.9367428, -1.1520522],
            [2.6727166, 7.9642334, 1.5666518, -0.23706625, 4.4325504, 0.048408136],
            [-0.44477677, -1.4908272, 2.6978562, -1.1000808, 1.0438977, -1.2577403],
            [0.44379342, 0.56137705, 0.96918595, 0.11622228, 2.2909589, -0.92807078],
            [-0.044638768, 1.0530523, -0.047280665, 0.39095843, 0.28415173, -0.55964953],
            [-1.3890632, 0.001614709, -1.5885487, 1.3223488, -1.071898, -0.21818578],
            [-2.0870762, -0.12974143, 0.21457124, 2.4922497, 0.59629947, -0.21896739],
            [2.0396113, 1.8920177, 0.83045024, -1.3074456, 0.4277178, -0.67360127],
            [-1.5564938, -4.5376453, -0.2121184, 1.1786785, -1.1766754, 0.006974767],
            [0.26728973, -0.080053128, -0.077407442, 0.0086041111, -0.20916402, -0.028071323],
            [-0.037870687, -2.5422843, -1.7820013, -1.2304662, -0.80585718, 1.1488333],
            [0.99747533, -1.0812732, -1.4582157, -1.4943409, -1.4962931, 0.71126705]];
        Data.inputLayerBias = [0.87582731, 1.9934373, 0.34536767, -0.6946488, -0.34683022, -0.69136626];
        Data.hiddenLayerWeights = [2.4113946, -5.8647647, 2.0065274, 2.2444227, -2.1600745, -1.2715312];
        Data.hiddenLayerBias = 2.2027299;
    })(Data = App.Data || (App.Data = {}));
})(App || (App = {}));
/// <reference path="modelData.ts" />
var App;
(function (App) {
    var Calculation;
    (function (Calculation) {
        var Data = App.Data;
        function calculateFerriteNumber(inputComposition) {
            // # eq A1
            var normalizedInputs = inputComposition
                .map(function (composition, i) { return (composition - Data.minComposition[i]) / (Data.maxComposition[i] - Data.minComposition[i]); });
            // # eq A2
            var inputLayerSums = Data.inputLayerWeights
                .map(function (row, i) { return row
                .map(function (element) { return normalizedInputs[i] * element; }); })
                .reduce(function (a, b) { return a.map(function (c, i) { return c + b[i]; }); })
                .map(function (sum, i) { return sum + Data.inputLayerBias[i]; });
            // # eq A3
            var hiddenLayerValues = inputLayerSums
                .map(function (sum) { return 1. / (1. + Math.exp(-sum)); });
            // # eq A4
            var outputNodeSum = hiddenLayerValues
                .map(function (value, i) { return value * Data.hiddenLayerWeights[i]; })
                .reduce(function (a, b) { return a + b; }) + Data.hiddenLayerBias;
            // # eq A5
            var outputValue = 1. / (1. + Math.exp(-outputNodeSum));
            // # eq A7 (round to 1 decimal place)
            var ferriteNumber = Math.round((outputValue - 0.2) * 117. / 0.6 * 10) / 10;
            return ferriteNumber;
        }
        Calculation.calculateFerriteNumber = calculateFerriteNumber;
    })(Calculation = App.Calculation || (App.Calculation = {}));
})(App || (App = {}));
/// <reference path="modelData.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        var Data = App.Data;
        UI.elementIds = ["c", "cr", "ni", "mo", "n", "mn", "fe", "si", "cu", "ti", "nb", "v", "co"];
        function getInputs() {
            var values = UI.elementIds.map(function (id) { return parseFloat(document.getElementById(id).value); });
            var feIndex = UI.elementIds.indexOf("fe");
            var otherElementsSum = values.reduce(function (acc, value, i) { return i === feIndex ? acc : acc + value; }, 0);
            values[feIndex] = 100 - otherElementsSum;
            document.getElementById("fe").value = values[feIndex].toFixed(2);
            return { values: values, elementIds: UI.elementIds };
        }
        UI.getInputs = getInputs;
        function validateInputs(inputs, elementIds) {
            var errorMessagesDiv = document.getElementById("error_messages");
            var errorMessages = "";
            inputs.forEach(function (value, i) {
                var elementId = elementIds[i];
                var min = Data.minComposition[i];
                var max = Data.maxComposition[i];
                var inputElement = document.getElementById(elementId);
                if (value < min || value > max) {
                    errorMessages += "Value for ".concat(elementId.toUpperCase(), " must be between ").concat(min, " and ").concat(max, ".<br>");
                    inputElement.classList.add('is-invalid');
                }
                else {
                    inputElement.classList.remove('is-invalid');
                }
            });
            if (errorMessages) {
                errorMessagesDiv.innerHTML = errorMessages;
                errorMessagesDiv.style.display = "block";
                return false;
            }
            else {
                errorMessagesDiv.style.display = "none";
                return true;
            }
        }
        UI.validateInputs = validateInputs;
        function displayOutput(ferriteNumber) {
            document.getElementById("test_output").innerText = "Ferrite Number: " + ferriteNumber;
        }
        UI.displayOutput = displayOutput;
        function updateBalanceElement() {
            var _a = getInputs(), values = _a.values, elementIds = _a.elementIds;
            validateInputs(values, elementIds);
        }
        UI.updateBalanceElement = updateBalanceElement;
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));
/// <reference path="ui.ts" />
/// <reference path="fnn1999.ts" />
var App;
(function (App) {
    var UI = App.UI;
    var Calculation = App.Calculation;
    document.addEventListener('DOMContentLoaded', function () {
        var themeSwitcher = document.getElementById('theme-switcher');
        var htmlElement = document.documentElement;
        function setTheme(isDark) {
            htmlElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        var storedTheme = localStorage.getItem('theme');
        var isDark = storedTheme === 'dark';
        if (themeSwitcher) {
            themeSwitcher.checked = isDark;
            setTheme(isDark);
            themeSwitcher.addEventListener('click', function (event) {
                var newIsDark = event.target.checked;
                setTheme(newIsDark);
            });
        }
        var calculateButton = document.getElementById('calculate_button');
        if (calculateButton) {
            calculateButton.addEventListener('click', function () {
                var _a = UI.getInputs(), values = _a.values, elementIds = _a.elementIds;
                if (UI.validateInputs(values, elementIds)) {
                    var ferriteNumber = Calculation.calculateFerriteNumber(values);
                    UI.displayOutput(ferriteNumber);
                }
            });
        }
        UI.elementIds.forEach(function (id) {
            if (id !== 'fe') {
                var inputElement = document.getElementById(id);
                if (inputElement) {
                    inputElement.addEventListener('input', function () {
                        UI.updateBalanceElement();
                    });
                }
            }
        });
        UI.updateBalanceElement();
    });
})(App || (App = {}));
//# sourceMappingURL=main.js.map