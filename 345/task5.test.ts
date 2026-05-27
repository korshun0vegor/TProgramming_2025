import { expect, test } from "vitest";
import { Phone } from "./task5";

test("создает телефон с номером", () => {
    const phone = new Phone("Apple", "iPhone 17", "+7-999-123-45-67");

    expect(phone.getPhoneNumber()).toBe("+7-999-123-45-67");
});

test("изменяет номер телефона", () => {
    const phone = new Phone("Apple", "iPhone 17", "+7-999-123-45-67");

    phone.setPhoneNumber("+7-999-765-43-21");

    expect(phone.getPhoneNumber()).toBe("+7-999-765-43-21");
});

test("возвращает информацию о телефоне", () => {
    const phone = new Phone("Apple", "iPhone 17", "+7-999-123-45-67");

    expect(phone.getInfo()).toBe("Марка: Apple, модель: iPhone 17, номер: +7-999-123-45-67");
});
