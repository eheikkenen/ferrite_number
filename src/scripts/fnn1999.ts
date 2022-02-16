function getInputs() {
    let input: number[] = [parseFloat((<HTMLInputElement>document.getElementById("c")).value),
        parseFloat((<HTMLInputElement>document.getElementById("cr")).value),
        parseFloat((<HTMLInputElement>document.getElementById("ni")).value),
        parseFloat((<HTMLInputElement>document.getElementById("mo")).value),
        parseFloat((<HTMLInputElement>document.getElementById("n")).value),
        parseFloat((<HTMLInputElement>document.getElementById("mn")).value),
        parseFloat((<HTMLInputElement>document.getElementById("fe")).value),
        parseFloat((<HTMLInputElement>document.getElementById("si")).value),
        parseFloat((<HTMLInputElement>document.getElementById("cu")).value),
        parseFloat((<HTMLInputElement>document.getElementById("ti")).value),
        parseFloat((<HTMLInputElement>document.getElementById("nb")).value),
        parseFloat((<HTMLInputElement>document.getElementById("v")).value),
        parseFloat((<HTMLInputElement>document.getElementById("co")).value)];
    return input;
}

function fnn1999() {
    let inputComposition: number[] = getInputs();
    let minComposition: number[] = [0.008, 14.74, 4.61, 0.01, 0.01, 0.35, 45.599, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0];
    let maxComposition: number[] = [0.2, 32.0, 33.5, 6.85, 0.3, 12.67, 72.51, 1.3, 12.16, 2.16, 3.52, 0.92, 1.28];
    let inputLayerWeights: number[][] = [[-0.77387279, 0.018434081, 0.82022685, 0.11006859, 0.73543739, 0.4691014],
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
    let inputLayerBias: number[] = [0.87582731, 1.9934373, 0.34536767, -0.6946488, -0.34683022, -0.69136626];
    let hiddenLayerWeights: number[] = [2.4113946, -5.8647647, 2.0065274, 2.2444227, -2.1600745, -1.2715312];
    let hiddenLayerBias: number = 2.2027299

    // # eq A1
    let normalizedInputs: number[] = inputComposition
        .map((composition, i) => (composition - minComposition[i]) / (maxComposition[i] - minComposition[i]));

    // # eq A2
    let inputLayerSums: number[] = inputLayerWeights
        .map((row, i) => row
            .map((element) => normalizedInputs[i] * element))
        .reduce((a, b) => a.map((c, i) => c + b[i]))
        .map((sum, i) => sum + inputLayerBias[i]);

    // # eq A3
    let hiddenLayerValues: number[] = inputLayerSums
        .map((sum) => 1. / (1. + Math.exp(-sum)));

    // # eq A4
    let outputNodeSum = hiddenLayerValues
        .map((value, i) => value * hiddenLayerWeights[i])
        .reduce((a, b) => a + b) + hiddenLayerBias;

    // # eq A5
    let outputValue = 1. / (1. + Math.exp(-outputNodeSum));

    // # eq A7 (round to 1 decimal place)
    let ferriteNumber = Math.round((outputValue - 0.2) * 117. / 0.6 * 10) / 10;

    document.getElementById("test_output").innerText = "Ferrite Number: " + ferriteNumber;
}