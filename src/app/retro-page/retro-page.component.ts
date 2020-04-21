import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageCategories } from './models/message-categories.enum';
import { RetroPage } from './models/retro-page.model';
import { RetroPageService } from './retro-page.service';
import { UserService } from '../common/user.service';
import { Message } from './models/message.model';
import { Action } from './models/action.model';
import { NavUtils } from '../common/nav-utils';

@Component({
  selector: 'rr-retro-page',
  templateUrl: './retro-page.component.html',
  styleUrls: ['./retro-page.component.scss']
})
export class RetroPageComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER];
  categories = MessageCategories;
  model: RetroPage;

  startMessage: string;
  stopMessage: string;
  continueMessage: string;
  action: string;

  messagesLoading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RetroPageService,
    private userService: UserService,
    private snackBar: MatSnackBar) {
    this.model = this.route.snapshot.data.model;
  }

  ngOnInit(): void {
    this.messagesLoading = true;
    this.model.messages.subscribe(() => this.messagesLoading = false);
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
    this.service.addMessage(this.model.sprintKey, message)
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
    this.service.thumbsUp(this.model.sprintKey, message)
      .catch(() => this.snackBar.open('Failed to upvote. Try again please.'));
  }

  thumbsDown(message: Message) {
    this.service.thumbsDown(this.model.sprintKey, message)
      .catch(() => this.snackBar.open('Failed to downvote. Try again please.'));
  }

  delete(message: Message) {
    message.beingDeleted = true;
    setTimeout(() => this.service.deleteMessage(this.model.sprintKey, message)
      .catch(() => this.snackBar.open('Failed to remove message. Try again please.')), 1000);
  }

  isMine(message: Message): boolean {
    return this.userService.getNickname() === message.author;
  }

  addAction() {
    if (this.action) {
      this.service.addAction(this.model.sprintKey, { key: null, action: this.action.trim() })
        .then(() => this.action = '')
        .catch(() => this.snackBar.open('Failed to add action. Try again please.'));
    }
  }

  removeAction(action: Action) {
    this.service.deleteAction(this.model.sprintKey, action)
      .catch(() => this.snackBar.open('Failed to remove action. Try again please.'));
  }

  goToTeam() {
    this.router.navigate(NavUtils.teamUrl(this.model.teamKey));
  }

  deleteRetro() {
    this.service.deleteRetro(this.model.sprintKey)
      .then(() => this.goToTeam());
  }
}
