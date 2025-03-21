type notifications = {
    title: string;
    text: string;

}

type State = {
    notifications: notifications[];

    isPermissionGranted: boolean;
}

export const useNotificationStore = defineStore('notificationStore', {
    state: (): State => ({
        notifications: [],

        isPermissionGranted: false,
    }),

    actions: {
        addNotification(itemTitle: string, itemText: string) {
            this.notifications.push({
                title: itemTitle,
                text: itemText
            });

            setTimeout(() => {
                this.notifications.splice(0, 1)
            }, 4000);
        },

        // Запрос разрешения на показ уведомлений
        async requestPermission() {
            if (!('Notification' in window)) {
                // Ваш браузер не поддерживает уведомления 
                return;
            }

            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.isPermissionGranted = true;
            } else {
                // Разрешение не получено
            }
        }
    },


})

