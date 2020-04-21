import { Observable } from 'rxjs';
import { Sprint } from '../../common/sprint.model';

export interface TeamPage {
    key: string;
    sprints: Observable<Sprint[]>;
}
