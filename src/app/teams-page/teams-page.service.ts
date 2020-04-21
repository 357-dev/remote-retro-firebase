import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Team } from './models/team.model';
import { DbUtils } from '../common/db-utils';

@Injectable({
  providedIn: 'root'
})
export class TeamsPageService {

  constructor(private db: AngularFireDatabase) { }

  createTeam(name: string) {
    const team: Team = { key: null, name };
    return this.db.list(DbUtils.teamsUrl()).push(team);
  }
}
