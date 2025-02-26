// анимация при удалении и добавлении
export const beforeEnter = (el: Element) => {
    (el as HTMLElement).style.height = "0";
};

export const enter = (el: Element) => {
    (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + "px";
};

export const beforeLeave = (el: Element) => {
    (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + "px";
};

export const leave = (el: Element) => {
    (el as HTMLElement).style.height = "0";
};
// анимация при удалении и добавлении