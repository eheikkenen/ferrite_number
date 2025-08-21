# FNN-1999

This project is a web-based calculator for predicting the Ferrite Number (FN) in stainless steel arc welds using an artificial neural network.

## Based On

This project is based on the paper: "Improved Ferrite Number Prediction in Stainless Steel Arc Welds Using Artificial Neural Networks Part 1: Neural Network Development" by J.M. Vitek, Y.S. Iskander, and E.M. Oblow (2000).

## Usage

1.  Open `index.html` in your web browser.
2.  Enter the chemical composition of the weld metal in the input fields.
3.  Click the "get FN" button to calculate the Ferrite Number.

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
