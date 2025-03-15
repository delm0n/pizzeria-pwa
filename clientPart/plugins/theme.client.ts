import { useTheme } from '~/utils/theme';

export default defineNuxtPlugin(() => {
    const { getTheme } = useTheme();
    const theme = useState<string>('theme', () => getTheme());

    // Применяем тему на стороне клиента
    if (process.client) {
        document.documentElement.setAttribute('data-theme', theme.value);
    }
});