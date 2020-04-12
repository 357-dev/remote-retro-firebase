import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Message } from './models/message.model';
import { Action } from './models/action.model';

@Injectable({
  providedIn: 'root'
})
export class SessionPageService {

  constructor(private db: AngularFireDatabase) { }

  addMessage(sessionKey: string, message: Message) {
    return this.db.list(`messages/${sessionKey}`).push(message);
  }

  deleteMessage(sessionKey: string, message: Message) {
    return this.db.object(`messages/${sessionKey}/${message.key}`).remove();
  }

  thumbsUp(sessionKey: string, message: Message) {
    return this.db.object(`messages/${sessionKey}/${message.key}`).update({ votes: ++message.votes });
  }

  thumbsDown(sessionKey: string, message: Message) {
    return this.db.object(`messages/${sessionKey}/${message.key}`).update({ votes: --message.votes });
  }

  addAction(sessionKey: string, action: Action) {
    return this.db.list(`actions/${sessionKey}`).push(action);
  }

  deleteAction(sessionKey: string, action: Action) {
    return this.db.object(`actions/${sessionKey}/${action.key}`).remove();
  }
}
