// анимация при удалении и добавлении
export const afterEnterCart = (o: Element) => {
    if (o instanceof HTMLElement) {
        o.style.height = "auto";
    }
};

export const leaveCart = (o: Element) => {
    if (o instanceof HTMLElement) {
        const height = getComputedStyle(o).height;
        o.style.height = height;
        requestAnimationFrame(() => {
            o.style.height = '0';
            o.style.margin = '0';
            o.style.padding = '0';
        });
    }
};
// анимация при удалении и добавлении