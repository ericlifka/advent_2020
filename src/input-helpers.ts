import fs from "fs"
import { parseInteger } from "./converters"

export const getLines = (day) =>
  fs.readFileSync(`data/${day}.dat`, { encoding: "utf8" }).split("\n").slice(0, -1)

export const getLine = (day) => getLines(day)[0]

export const getNumberArray = (day) =>
  getLine(day).split(",").map(parseInteger)
