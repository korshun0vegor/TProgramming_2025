export function calculateY(x: number): number {
    if (Math.abs(x) >= 1) {
        return Math.pow(1.2, x) - Math.pow(x, 1.2);
    }

    return Math.acos(x);
}

const xn = 0.2;
const xk = 2.2;
const dx = 0.4;

console.log("Задание A:");

for (let x = xn; x <= xk; x += dx) {
    console.log(`x = ${x.toFixed(1)}, y = ${calculateY(x).toFixed(3)}`);
}

const values = [0.1, 0.9, 1.2, 1.5, 2.3];

console.log();
console.log("Задание B:");

for (let i = 0; i < values.length; i++) {
    const x = values[i];

    console.log(`x = ${x.toFixed(1)}, y = ${calculateY(x).toFixed(3)}`);
}
