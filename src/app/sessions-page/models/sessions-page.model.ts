import { Session } from '../../common/session.model';
import { Observable } from 'rxjs';

export class SessionsPage {
    constructor(public sessions: Observable<Session[]>) { }
}
