import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly anonymous: string = 'Anonymous';
  readonly nicknameKey: string = 'nickname';

  constructor() { }

  setNickname(nickname: string) {
    localStorage.setItem(this.nicknameKey, nickname);
  }

  getNickname(): string {
    return localStorage.getItem(this.nicknameKey) ?? this.anonymous;
  }

  getAnonymous(): string {
    return this.anonymous;
  }
}
