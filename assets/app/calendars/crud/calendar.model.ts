export class Calendar {
    description: string;
    username: string;
    calendarId?: string;
    userId?: string;

    constructor(description: string, username: string, calendarId?: string, userId?: string) {
        this.description = description;
        this.username = username;
        this.calendarId = calendarId;
        this.userId = userId;
    }
}