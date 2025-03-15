
// Хелпер для получения и установки текущей темы
export const useTheme = () => {
    const themeCookie = useCookie('theme'); // Используем встроенную утилиту useCookie

    // Получение текущей темы
    const getTheme = (): string => {
        return themeCookie.value || 'light'; // По умолчанию используется светлая тема
    };

    // Установка новой темы
    const setTheme = (theme: string) => {
        themeCookie.value = theme;
    };

    return { getTheme, setTheme };
};