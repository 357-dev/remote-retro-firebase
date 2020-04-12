import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { SessionPage } from './models/session-page.model';
import { SessionPageService } from './session-page.service';
import { MessageCategories } from './models/message-categories.enum';
import { Message } from './models/message.model';
import { UserService } from '../common/user.service';
import { Action } from './models/action.model';

@Component({
  selector: 'rr-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss']
})
export class SessionPageComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER];
  categories = MessageCategories;
  model: SessionPage;

  startMessage: string;
  stopMessage: string;
  continueMessage: string;
  action: string;

  constructor(private route: ActivatedRoute,
              private service: SessionPageService, private userService: UserService,
              private snackBar: MatSnackBar) {
    this.model = this.route.snapshot.data.model;
  }

  ngOnInit(): void {
    this.model.messages.subscribe(() => { }, () => this.snackBar.open('Lost connection. Please refresh!'));
  }

  addMessage(category: MessageCategories) {
    let body = '';
    if (category === this.categories.CONTINUE) {
      body = this.continueMessage;
    } else if (category === this.categories.START) {
      body = this.startMessage;
    } else if (category === this.categories.STOP) {
      body = this.stopMessage;
    }

    const message: Message = { key: null, body, author: this.userService.getNickname(), category, votes: 0 };
    this.service.addMessage(this.model.sessionKey, message)
      .then(() => this.clearMessage(category))
      .catch(() => this.snackBar.open('Failed to add message. Try again please.'));
  }

  clearMessage(category: MessageCategories) {
    if (category === this.categories.CONTINUE) {
      this.continueMessage = '';
    } else if (category === this.categories.START) {
      this.startMessage = '';
    } else if (category === this.categories.STOP) {
      this.stopMessage = '';
    }
  }

  thumbsUp(message: Message) {
    this.service.thumbsUp(this.model.sessionKey, message)
      .catch(() => this.snackBar.open('Failed to upvote. Try again please.'));
  }

  thumbsDown(message: Message) {
    this.service.thumbsDown(this.model.sessionKey, message)
      .catch(() => this.snackBar.open('Failed to downvote. Try again please.'));
  }

  delete(message: Message) {
    this.service.deleteMessage(this.model.sessionKey, message)
      .catch(() => this.snackBar.open('Failed to remove message. Try again please.'));
  }

  isMine(message: Message): boolean {
    return this.userService.getNickname() === message.author;
  }

  addAction() {
    if (this.action) {
      this.service.addAction(this.model.sessionKey, { key: null, action: this.action.trim() })
        .then(() => this.action = '')
        .catch(() => this.snackBar.open('Failed to add action. Try again please.'));
    }
  }

  removeAction(action: Action) {
    this.service.deleteAction(this.model.sessionKey, action)
      .catch(() => this.snackBar.open('Failed to remove action. Try again please.'));
  }
}
