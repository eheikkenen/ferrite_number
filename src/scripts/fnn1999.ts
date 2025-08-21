/// <reference path="modelData.ts" />

namespace App.Calculation {
    import Data = App.Data;

    export function calculateFerriteNumber(inputComposition: number[]): number {
        // # eq A1
        const normalizedInputs: number[] = inputComposition
            .map((composition, i) => (composition - Data.minComposition[i]) / (Data.maxComposition[i] - Data.minComposition[i]));

        // # eq A2
        const inputLayerSums: number[] = Data.inputLayerWeights
            .map((row, i) => row
                .map((element) => normalizedInputs[i] * element))
            .reduce((a, b) => a.map((c, i) => c + b[i]))
            .map((sum, i) => sum + Data.inputLayerBias[i]);

        // # eq A3
        const hiddenLayerValues: number[] = inputLayerSums
            .map((sum) => 1. / (1. + Math.exp(-sum)));

        // # eq A4
        const outputNodeSum = hiddenLayerValues
            .map((value, i) => value * Data.hiddenLayerWeights[i])
            .reduce((a, b) => a + b) + Data.hiddenLayerBias;

        // # eq A5
        const outputValue = 1. / (1. + Math.exp(-outputNodeSum));

        // # eq A7 (round to 1 decimal place)
        const ferriteNumber = Math.round((outputValue - 0.2) * 117. / 0.6 * 10) / 10;

        return ferriteNumber;
    }
}