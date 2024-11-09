export const formTovar = (num: number) => {
    let wordForm;

    // Определяем форму слова на основе числа
    if (num % 10 === 1 && num % 100 !== 11) {
        wordForm = "товар"; // Именительный падеж для 1, 21, 31,
    } else if (
        num % 10 >= 2 &&
        num % 10 <= 4 &&
        (num % 100 < 10 || num % 100 >= 20)
    ) {
        wordForm = "товара"; // Именительный падеж для 2, 3, 4, 22, 23, 24, ...
    } else {
        wordForm = "товаров"; // Именительный падеж для остальных
    }

    return `${num} ${wordForm}`;
}; 