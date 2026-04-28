#!/usr/bin/env bun
import { readStdin, println } from "../helpers";
import { createCanvas } from "canvas";
import { resolve } from "path";

(await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(",").map(Number) as [number, number])
  .chain(async (nodes) => {
    const [width, height] = nodes.transpose().map((v) => v.max()) as [
      number,
      number
    ];
    console.log(width, height);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(...nodes[0]);
    for (let x = 1; x < nodes.length; x++) {
      ctx.moveTo(...nodes[x]);
      ctx.stroke();
    }

    // ctx.fillRect(0, 0, width, height); // Fill the entire canvas blue

    // 6. Change color for the second shape
    // ctx.fillStyle = "red";

    // 7. Draw a smaller red rectangle in the center
    // const rectWidth = 150;
    // const rectHeight = 100;
    // const x = (width - rectWidth) / 2;
    // const y = (height - rectHeight) / 2;
    // ctx.fillRect(x, y, rectWidth, rectHeight);

    // // 8. Add some text
    // ctx.fillStyle = "white";
    // ctx.font = "24px sans-serif";
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText("Hello from Bun!", width / 2, height / 2);
    // --- End Drawing Operations ---

    // 9. Convert the canvas to a PNG buffer
    // The toBuffer() method is provided by the node-canvas library
    const buffer = canvas.toBuffer("image/png");

    // 10. Define the output path
    const outputPath = resolve("output.png");

    // 11. Write the buffer to a file using Bun's file I/O
    await Bun.write(outputPath, buffer);

    console.log(`Image saved to ${outputPath}`);
  });

// .combinations(2)
// .map(([a, b]) => Math.abs((1 + a[0] - b[0]) * (1 + a[1] - b[1])))
// .max()

// // so, we only need to actually check the edges of our rectangle rather than the inside? Maybe we should draw a picture to be sure

// // We could introduce a `.covers` to the Set? subset would be teh right term, so maybe is_subset? is_superset s
// // maybe covers just as without ruby's ? it all gets confusing
// .tap((v) => println(v));
