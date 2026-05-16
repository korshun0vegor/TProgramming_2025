function calculateY(x: number): number {
    if (Math.abs(x) >= 1) {
        return Math.pow(1.2, x) - Math.pow(x, 1.2);
    } else {
        return Math.acos(x);
    }
}

console.log("Задание A:");
console.log(`x = ${0.2.toFixed(1)}, y = ${calculateY(0.2).toFixed(3)}`);
console.log(`x = ${0.6.toFixed(1)}, y = ${calculateY(0.6).toFixed(3)}`);
console.log(`x = ${1.0.toFixed(1)}, y = ${calculateY(1.0).toFixed(3)}`);
console.log(`x = ${1.4.toFixed(1)}, y = ${calculateY(1.4).toFixed(3)}`);
console.log(`x = ${1.8.toFixed(1)}, y = ${calculateY(1.8).toFixed(3)}`);
console.log(`x = ${2.2.toFixed(1)}, y = ${calculateY(2.2).toFixed(3)}`);

console.log("\nЗадание B:");
console.log(`x = ${0.1.toFixed(1)}, y = ${calculateY(0.1).toFixed(3)}`);
console.log(`x = ${0.9.toFixed(1)}, y = ${calculateY(0.9).toFixed(3)}`);
console.log(`x = ${1.2.toFixed(1)}, y = ${calculateY(1.2).toFixed(3)}`);
console.log(`x = ${1.5.toFixed(1)}, y = ${calculateY(1.5).toFixed(3)}`);
console.log(`x = ${2.3.toFixed(1)}, y = ${calculateY(2.3).toFixed(3)}`);