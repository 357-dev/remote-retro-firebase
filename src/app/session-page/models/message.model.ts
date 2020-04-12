import { MessageCategories } from './message-categories.enum';

export interface Message {
    key: string;
    body: string;
    author: string;
    category: MessageCategories;
    votes: number;
}