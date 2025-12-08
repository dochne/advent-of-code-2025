import { stdin, stdout, write } from "bun";

export const readStdin = async () => {
  let data = "";
  for await (const chunk of stdin.stream()) {
    data += Buffer.from(chunk).toString();
  }
  return data;
};

export const print = async (value: any) => {
  if (typeof value === "object") {
    value = JSON.stringify(value, null, 2);
  }
  await write(stdout, value);
};

export const println = async (value: any) => {
  if (typeof value === "object") {
    value = JSON.stringify(value, null, 2);
  }
  await write(stdout, value + "\n");
};

export const exit = async () => {
  process.exit(0);
};

export const isExample = () => {
  return process.env.filename === "example.txt";
};
