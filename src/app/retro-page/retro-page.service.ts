import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Message } from './models/message.model';
import { Action } from './models/action.model';

@Injectable({
  providedIn: 'root'
})
export class RetroPageService {

  constructor(private db: AngularFireDatabase) { }

  addMessage(retroKey: string, message: Message) {
    return this.db.list(`messages/${retroKey}`).push(message);
  }

  deleteMessage(retroKey: string, message: Message) {
    return this.db.object(`messages/${retroKey}/${message.key}`).remove();
  }

  thumbsUp(retroKey: string, message: Message) {
    return this.db.object(`messages/${retroKey}/${message.key}`).update({ votes: ++message.votes });
  }

  thumbsDown(retroKey: string, message: Message) {
    return this.db.object(`messages/${retroKey}/${message.key}`).update({ votes: --message.votes });
  }

  addAction(retroKey: string, action: Action) {
    return this.db.list(`actions/${retroKey}`).push(action);
  }

  deleteAction(retroKey: string, action: Action) {
    return this.db.object(`actions/${retroKey}/${action.key}`).remove();
  }

  deleteRetro(retroKey: string) {
    return this.db.object(`messages/${retroKey}`).remove()
      .then(() => this.db.object(`actions/${retroKey}`).remove());
  }
}
