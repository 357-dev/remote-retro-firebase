import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';

import { EstimationPage } from './models/estimation-page.model';
import { Sprint } from '../common/sprint.model';
import { Story } from './models/story.model';
import { map } from 'rxjs/internal/operators/map';
import { DbUtils } from '../common/db-utils';

@Injectable({
    providedIn: 'root'
})
export class EstimationPageResolver implements Resolve<EstimationPage> {

    constructor(private db: AngularFireDatabase) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<EstimationPage> {
        const teamKey = route.paramMap.get('teamKey');
        const sprintKey = route.paramMap.get('sprintKey');

        const sprint = this.db.object<Sprint>(DbUtils.sprintUrl(teamKey, sprintKey)).valueChanges();
        const stories = this.db.list<Story>(DbUtils.estimationsUrl(sprintKey))
            .snapshotChanges()
            .pipe(map(changes =>
                changes.map(m => ({
                    key: m.key,
                    description: m.payload.val().description,
                    votesVisible: m.payload.val().votesVisible,
                    votes: m.payload.val().votes,
                    selected: m.payload.val().selected
                }))
            ));

        return of({ teamKey, sprintKey, sprint, stories });
    }
}
