#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const value = (await readStdin()).trim().split("\n");

println(value);
