export class Logger {
    public log(message: string): void {
        console.log(message);
    }

    public logMany(messages: string[]): void {
        for (const message of messages) {
            this.log(message);
        }
    }
}