import { Observable } from 'rxjs';
import { Team } from './team.model';

export interface TeamsPage {
    teams: Observable<Team[]>;
}
