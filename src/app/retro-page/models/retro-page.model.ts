import { Observable } from 'rxjs';
import { Message } from './message.model';
import { Action } from './action.model';
import { Sprint } from '../../common/sprint.model';

export interface RetroPage {
    sprintKey: string;
    teamKey: string;
    sprint: Observable<Sprint>;
    messages: Observable<Message[]>;
    actions: Observable<Action[]>;
}
