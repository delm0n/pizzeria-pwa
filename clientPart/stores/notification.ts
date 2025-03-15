type notifications = {
    title: string;
    text: string;
}

type State = {
    notifications: notifications[];
}

export const useNotificationStore = defineStore('notificationStore', {
    state: (): State => ({
        notifications: [],
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
        }
    }
})

