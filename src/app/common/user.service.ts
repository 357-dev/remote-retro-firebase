import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setNickname(nickname: string) {
    sessionStorage.setItem('nickname', nickname);
  }

  getNickname() {
    const sessionNickname = sessionStorage.getItem('nickname');
    return sessionNickname ?? 'Anonymous';
  }
}
