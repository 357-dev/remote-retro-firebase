import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Message } from './models/message.model';
import { Action } from './models/action.model';
import { DbUtils } from '../common/db-utils';

@Injectable({
  providedIn: 'root'
})
export class RetroPageService {

  constructor(private db: AngularFireDatabase) { }

  addMessage(retroKey: string, message: Message) {
    return this.db.list(DbUtils.messagesUrl(retroKey)).push(message);
  }

  deleteMessage(retroKey: string, message: Message) {
    return this.db.object(DbUtils.messageUrl(retroKey, message.key)).remove();
  }

  thumbsUp(retroKey: string, message: Message) {
    return this.db.object(DbUtils.messageUrl(retroKey, message.key)).update({ votes: ++message.votes });
  }

  thumbsDown(retroKey: string, message: Message) {
    return this.db.object(DbUtils.messageUrl(retroKey, message.key)).update({ votes: --message.votes });
  }

  addAction(retroKey: string, action: Action) {
    return this.db.list(DbUtils.actionsUrl(retroKey)).push(action);
  }

  deleteAction(retroKey: string, action: Action) {
    return this.db.object(DbUtils.actionUrl(retroKey, action.key)).remove();
  }

  deleteRetro(retroKey: string) {
    return this.db.object(DbUtils.messagesUrl(retroKey)).remove()
      .then(() => this.db.object(DbUtils.actionsUrl(retroKey)).remove());
  }
}
