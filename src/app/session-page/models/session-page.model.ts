import { Observable } from 'rxjs';
import { Message } from './message.model';
import { Session } from 'src/app/common/session.model';
import { Action } from './action.model';

export interface SessionPage {
    sessionKey: string;
    session: Observable<Session>;
    messages: Observable<Message[]>;
    actions: Observable<Action[]>;
}
