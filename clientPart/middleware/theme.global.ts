import { useTheme } from '~/utils/theme';

export default defineNuxtRouteMiddleware((to, from) => {
    const { getTheme } = useTheme();
    const theme = getTheme();

    // Устанавливаем тему в HTML-атрибуты для SSR
    useHead({
        htmlAttrs: {
            'data-theme': theme,
        },
    });
});