// анимация при удалении и добавлении
export const afterEnter = (o: HTMLElement) => {
    o.style.height = "auto";
};

export const leave = (o: HTMLElement) => {
    const height = getComputedStyle(o).height;
    o.style.height = height;
    requestAnimationFrame(() => {
        o.style.height = '0';
        o.style.margin = '0';
        o.style.padding = '0';
    });
};
// анимация при удалении и добавлении