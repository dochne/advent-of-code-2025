import { stdin, stdout, write } from "bun";

export const readStdin = async () => {
  let data = "";
  for await (const chunk of stdin.stream()) {
    data += Buffer.from(chunk).toString();
  }
  return data;
};

export const print = async (value: any) => {
  await write(stdout, value);
};
