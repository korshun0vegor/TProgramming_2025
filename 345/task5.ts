export class Phone {
    brand: string;
    model: string;
    phoneNumber: string;

    constructor(brand: string, model: string, phoneNumber: string) {
        this.brand = brand;
        this.model = model;
        this.phoneNumber = phoneNumber;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    setPhoneNumber(newNumber: string): void {
        this.phoneNumber = newNumber;
    }

    getInfo(): string {
        return `Марка: ${this.brand}, модель: ${this.model}, номер: ${this.phoneNumber}`;
    }
}

const myPhone = new Phone("Apple", "iPhone 17", "+7-999-123-45-67");

console.log("Начальная информация:");
console.log(myPhone.getInfo());

console.log("Текущий номер:", myPhone.getPhoneNumber());

myPhone.setPhoneNumber("+7-999-765-43-21");

console.log("После изменения номера:");
console.log(myPhone.getInfo());
