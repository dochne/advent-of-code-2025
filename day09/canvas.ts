import { createCanvas } from "canvas";
import { resolve } from "path";

// 1. Define the canvas dimensions
const width = 400;
const height = 300;

// 2. Create the canvas object
const canvas = createCanvas(width, height);

// 3. Get the 2D rendering context
const ctx = canvas.getContext("2d");

// --- Drawing Operations ---
// 4. Set the fill color
ctx.fillStyle = "blue";

// 5. Draw a filled rectangle (x, y, width, height)
ctx.fillRect(0, 0, width, height); // Fill the entire canvas blue

// 6. Change color for the second shape
ctx.fillStyle = "red";

// 7. Draw a smaller red rectangle in the center
const rectWidth = 150;
const rectHeight = 100;
const x = (width - rectWidth) / 2;
const y = (height - rectHeight) / 2;
ctx.fillRect(x, y, rectWidth, rectHeight);

// 8. Add some text
ctx.fillStyle = "white";
ctx.font = "24px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Hello from Bun!", width / 2, height / 2);
// --- End Drawing Operations ---

// 9. Convert the canvas to a PNG buffer
// The toBuffer() method is provided by the node-canvas library
const buffer = canvas.toBuffer("image/png");

// 10. Define the output path
const outputPath = resolve("output.png");

// 11. Write the buffer to a file using Bun's file I/O
await Bun.write(outputPath, buffer);

console.log(`Image saved to ${outputPath}`);
