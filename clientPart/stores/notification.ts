type notifications = {
    id: number,
    name: string
}

type State = {
    notifications: notifications[];
    idCount: number;
}

export const useNotificationStore = defineStore('notificationStore', {
    state: (): State => ({
        notifications: [],
        idCount: 1,
    }),

    actions: {
        addNotification(item: string) {
            this.notifications.push({
                id: this.idCount,
                name: item
            });

            setTimeout(() => {
                this.notifications.splice(0, 1)
            }, 5000);

            this.idCount++;
        }
    }
})

