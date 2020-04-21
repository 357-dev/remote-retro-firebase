import { Observable } from 'rxjs';
import { Story } from './story.model';
import { Sprint } from '../../common/sprint.model';

export interface EstimationPage {
    sprintKey: string;
    teamKey: string;
    sprint: Observable<Sprint>;
    stories: Observable<Story[]>;
}
