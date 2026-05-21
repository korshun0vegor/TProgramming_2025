class Phone {
    // Переменные класса
    brand: string;
    model: string;
    phoneNumber: string;

    // Конструктор
    constructor(brand: string, model: string, phoneNumber: string) {
        this.brand = brand;
        this.model = model;
        this.phoneNumber = phoneNumber;
    }

    // Метод для получения номера вызываемого абонента
    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    // Метод для изменения номера вызываемого абонента
    setPhoneNumber(newNumber: string): void {
        this.phoneNumber = newNumber;
    }

    // Метод для получения полной информации о телефоне
    getInfo(): string {
        return `Марка: ${this.brand}, Модель: ${this.model}, Номер: ${this.phoneNumber}`;
    }
}

// Создание объекта
const myPhone = new Phone("Apple", "Iphone 17", "+7-999-123-45-67");

// Вывод информации
console.log("Начальная информация:");
console.log(myPhone.getInfo());

// Получение номера
console.log("Текущий номер:", myPhone.getPhoneNumber());

// Изменение номера
myPhone.setPhoneNumber("+7-999-765-43-21");

// Вывод обновлённой информации
console.log("После изменения номера:");
console.log(myPhone.getInfo());