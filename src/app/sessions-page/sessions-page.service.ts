import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SessionsPageService {

  constructor(private db: AngularFireDatabase) { }

  createRetroSession(title: string) {
     return this.db.list('sessions').push({ title, created: moment().format('Do MMM YYYY') });
  }
}
