export class NavUtils {
    static teamUrl(teamKey: string): string[] {
        return ['teams', teamKey];
    }

    static teamsUrl(): string[] {
        return ['teams'];
    }

    static estimationUrl(teamKey: string, sprintKey: string): string[] {
        return ['teams', teamKey, 'sprints', sprintKey, 'estimations'];
    }

    static retroUrl(teamKey: string, sprintKey: string): string[] {
        return ['teams', teamKey, 'sprints', sprintKey, 'retros'];
    }
}
