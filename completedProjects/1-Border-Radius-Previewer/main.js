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

function takeInputBorderRadius(cssOutput) {
    const formBorderRadius = document.getElementById("formBorderRadius");
    const outputContainer = document.getElementById("outputContainer");
    const outputContainer2 = document.getElementById("outputContainer2");

    formBorderRadius.addEventListener("submit", (event) => {
        event.preventDefault();
        const borderRadius = formBorderRadius.borderRadiusInput.value.trim();

        if (borderRadius) {
            outputContainer.style.borderRadius = borderRadius;
            outputContainer2.style.borderRadius = borderRadius;
            cssOutput["border-radius"] = borderRadius;
        } else {
            delete cssOutput["border-radius"];
        }

        renderCSSOutput(cssOutput);
    });
}

function output() {
    const cssOutput = {};
    takeInputColorset(cssOutput);
    takeInputBorderSize(cssOutput);
    takeInputBorderType(cssOutput);
    takeInputBorderRadius(cssOutput);
}

output();