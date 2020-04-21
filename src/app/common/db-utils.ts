export class DbUtils {
    static teamsUrl(): string {
        return `teams`;
    }

    static teamUrl(teamKey: string): string {
        return `teams/${teamKey}`;
    }

    static sprintsUrl(teamKey: string): string {
        return `teams/${teamKey}/sprints`;
    }

    static sprintUrl(teamKey: string, sprintKey: string): string {
        return `teams/${teamKey}/sprints/${sprintKey}`;
    }

    static estimationsUrl(sprintKey: string): string {
        return `estimations/${sprintKey}`;
    }

    static estimationUrl(estimationKey: string, storyKey: string): string {
        return `estimations/${estimationKey}/${storyKey}`;
    }

    static estimationVotesUrl(estimationKey: string, storyKey: string): string {
        return `${this.estimationUrl(estimationKey, storyKey)}/votes`;
    }

    static actionsUrl(sprintKey: string): string {
        return `actions/${sprintKey}`;
    }

    static actionUrl(sprintKey: string, actionKey: string): string {
        return `actions/${sprintKey}/${actionKey}`;
    }

    static messagesUrl(sprintKey: string): string {
        return `messages/${sprintKey}`;
    }

    static messageUrl(sprintKey: string, messageKey: string): string {
        return `messages/${sprintKey}/${messageKey}`;
    }
}