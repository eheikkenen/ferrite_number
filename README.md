# FNN-1999

This project is a web-based calculator for predicting the Ferrite Number (FN) in stainless steel arc welds using an artificial neural network.

## Based On

This project is based on the paper: "Improved Ferrite Number Prediction in Stainless Steel Arc Welds Using Artificial Neural Networks Part 1: Neural Network Development" by J.M. Vitek, Y.S. Iskander, and E.M. Oblow (2000).

## What is Ferrite Number (FN) and why it matters
**Ferrite Number (FN)** is a measure of ferrite content in austenitic and duplex stainless steel weld metal. FN correlates with crack susceptibility, solidification mode (primary austenite vs. ferrite), and several weld properties, so manufacturers often specify minimum/maximum FN in welding procedures and filler metal selections. While FN can roughly correlate to ferrite percentages at low ferrite numbers, there is not an absolute match to the actual ferrite percentages.


## Usage

1.  Open `index.html` in your web browser.
2.  Enter the chemical composition of the weld metal in the input fields.
3.  Click the "Calculate FN" button to calculate the Ferrite Number.

## Development

To build the project, you need to have Node.js and npm installed.

1.  Install the dependencies:
    ```
    npm install
    ```
2.  Build the TypeScript code:
    ```
    npm run build
    ```

This will compile the TypeScript files in `src/scripts` and create a single output file at `build/main.js`.
