import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Team } from './models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsPageService {

  constructor(private db: AngularFireDatabase) { }

  createTeam(name: string) {
    const team: Team = { key: null, name };
    return this.db.list('teams').push(team);
  }
}
