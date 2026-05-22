import { writeFileSync } from "node:fs";

export class Logger {
  private lines: string[] = [];

  constructor(private printToConsole = true) {}

  log(message = "") {
    this.lines.push(message);

    if (this.printToConsole) {
      console.log(message);
    }
  }

  getLogs() {
    return this.lines;
  }

  saveToFile(fileName: string) {
    writeFileSync(fileName, this.lines.join("\n"), "utf8");
  }
}
