# Calculator App Style & Logic Notes

## Stylistic choices

I wanted the calculator to feel embedded in the page rather than sitting on top of it like a standalone desk device. The final design uses a grayscale palette so it feels serious and polished without turning into a bulky hardware mockup.

- Gray panel framing: the whole calculator sits inside a soft neutral panel so it reads like a browser widget rather than a desk calculator.
- Dark ribbon display: the screen is a dark inset strip with a subtle glow and a monospace font so it still feels like a calculator display without becoming heavy or exaggerated.
- Flat button styling: the keys keep a subtle raised feel, but they are cleaner and less dramatic than actual hardware keys.
- Strong contrast for readability: the display text stays crisp and bright, while the body remains muted and toned down.
- Tight spacing and softer corners: the layout is refined enough to feel modern, but still shaped like a classic calculator.

The goal was to keep the old-school calculator vibe while making it look native to the webpage.

## JavaScript choices

The script is built around a button-driven flow, using the value from each clicked button as the source of truth. The core idea is:

- each button press is treated as an input event
- numbers are appended to the current value until an operator is chosen
- the calculator stores the first value and waits for the second one before computing
- the final answer is only evaluated when the user presses Enter

The important state variables are:

- `currentValue`: the number currently shown on the display
- `savedValue`: the previous value stored for calculation
- `currentOperator`: the active arithmetic operation
- `waitingForSecondValue`: tells the script when a second input is needed

This keeps the program predictable and easy to follow. It also mirrors how a physical calculator behaves more closely than a simple string concatenation script would.

## How my approach differed

My version keeps the same general button logic you were aiming for, but it makes the process more deliberate and state-aware.

- Instead of just reading values and dumping them into the display immediately, the logic pauses between numbers and operators so it can preserve the calculation flow.
- I separated the concerns of input handling, display updates, and arithmetic execution so the code is easier to reason about.
- The operator logic does not just “do something” on click; it first stores the prior value, then waits for the next number before performing the calculation.
- This is a more realistic calculator flow than a minimal direct-answer script because it preserves the user’s sequence of input.

In short: the styling pushes the project toward a classic gray calculator look, while the JavaScript keeps the interaction faithful to the real button-by-button calculator experience.
