function renderCSSOutput(cssOutput) {
    const outputTextCSS = document.getElementById("outputTextCSS");
    outputTextCSS.textContent = Object.entries(cssOutput)
        .map(([property, value]) => `${property}: ${value};`)
        .join("\n");
}

function takeInputColorset(cssOutput) {
    const colorsetInput = document.querySelectorAll('input[name=colorsetInput]');
    const outputContainer = document.getElementById("outputContainer");
    const outputContainer2 = document.getElementById("outputContainer2");
    const outputTextH = document.getElementById("outputTextH");
    const outputTextHCSS = document.getElementById("outputTextHCSS");
    const outputTextP = document.getElementById("outputTextP");
    const outputTextCSS = document.getElementById("outputTextCSS");

    colorsetInput.forEach(radio => {
        radio.addEventListener("change", (event) => {
            let backgroundColor;
            let borderColor;
            let textColor;
            const colorsetValue = event.currentTarget.value;

            if (colorsetValue === "neutral") {
                backgroundColor = "#E5D0E3";
                borderColor = "#927C8B";
                textColor = "#3E2832";
            } else if (colorsetValue === "warm") {
                backgroundColor = "#D62828";
                borderColor = "#000000";
                textColor = "#C6DBF0";
            } else {
                backgroundColor = "#006D77";
                borderColor = "#443742";
                textColor = "#EDF6F9";
            }

            outputContainer.style.backgroundColor = backgroundColor;
            outputContainer.style.borderColor = borderColor;
            outputContainer2.style.backgroundColor = backgroundColor;
            outputContainer2.style.borderColor = borderColor;
            outputTextH.style.color = textColor;
            outputTextHCSS.style.color = textColor;
            outputTextP.style.color = textColor;
            outputTextCSS.style.color = textColor;
            cssOutput["background-color"] = backgroundColor;
            cssOutput["border-color"] = borderColor;
            cssOutput.color = textColor;
            renderCSSOutput(cssOutput);
        });
    });
}

function takeInputBorderSize(cssOutput) {
    const borderSizeInput = document.querySelectorAll('input[name=borderSizeInput]');
    const outputContainer = document.getElementById("outputContainer");
    const outputContainer2 = document.getElementById("outputContainer2");

    borderSizeInput.forEach(radio => {
        radio.addEventListener("change", (event) => {
            const borderSize = { small: "4px", medium: "8px", large: "12px" };
            const borderWidth = borderSize[event.currentTarget.value];
            outputContainer.style.borderWidth = borderWidth;
            outputContainer2.style.borderWidth = borderWidth;
            cssOutput["border-width"] = borderWidth;
            renderCSSOutput(cssOutput);
        });
    });
}

function takeInputBorderType(cssOutput) {
    const borderTypeInput = document.getElementById("borderType");
    const outputContainer = document.getElementById("outputContainer");
    const outputContainer2 = document.getElementById("outputContainer2");

    borderTypeInput.addEventListener("change", (event) => {
        const borderType = event.currentTarget.value;
        outputContainer.style.borderStyle = borderType;
        outputContainer2.style.borderStyle = borderType;
        cssOutput["border-style"] = borderType;
        renderCSSOutput(cssOutput);
    });
}
// remake this function to just hold onto the value to send to takeInputBorderRadiusChoice
function takeInputBorderRadius() {
    const formBorderRadius = document.getElementById("formBorderRadius");
    let borderRadius = "";

    formBorderRadius.addEventListener("input", () => {
        borderRadius = formBorderRadius.borderRadiusInput.value.trim();
    });

    return () => borderRadius;
}
function takeInputBorderRadiusChoice(cssOutput, getBorderRadius) {
    const formBorderRadiusChoice = document.getElementById("formBorderRadiusChoice");
    const formBorderRadius = document.getElementById("formBorderRadius");
    const outputContainer = document.getElementById("outputContainer");
    const outputContainer2 = document.getElementById("outputContainer2");

    formBorderRadiusChoice.addEventListener("change", () => {
        const selectedCorners = Array.from(formBorderRadiusChoice.querySelectorAll("input:checked")).map(input => input.value);
        const borderRadius = getBorderRadius();

        if (borderRadius && selectedCorners.length > 0) {
            const cornerStyles = {
                "bottom-left": "border-bottom-left-radius",
                "bottom-right": "border-bottom-right-radius",
                "top-left": "border-top-left-radius",
                "top-right": "border-top-right-radius"
            };

            selectedCorners.forEach(corner => {
                const property = cornerStyles[corner];
                outputContainer.style[property] = borderRadius;
                outputContainer2.style[property] = borderRadius;
                cssOutput[property] = borderRadius;
            });
        }

        renderCSSOutput(cssOutput);
    });
}

function output() {
    const cssOutput = {};
    takeInputColorset(cssOutput);
    takeInputBorderSize(cssOutput);
    takeInputBorderType(cssOutput);
    const getBorderRadius = takeInputBorderRadius();
    takeInputBorderRadiusChoice(cssOutput, getBorderRadius);
}
// create a function to initialize all the input handlers and set up the CSS output rendering
function initialize() {
    // if nothing is selected just set the border up as a solid 5px black outline.
    const outputContainer = document.getElementById("outputContainer");
    const outputContainer2 = document.getElementById("outputContainer2");
    outputContainer.style.border = "5px solid black";
    outputContainer2.style.border = "5px solid black";
    output();
}
initialize();