export interface Story {
    key: string;
    description: string;
    votesVisible: boolean;
    votes: any;
    selected: boolean;

    // Used for animations
    beingDeleted?: boolean;
}
