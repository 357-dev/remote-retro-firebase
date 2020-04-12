import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setNickname(nickname: string) {
    sessionStorage.setItem('nickname', nickname);
  }

  getNickname(onlySession: boolean = false) {
    const sessionNickname = sessionStorage.getItem('nickname');
    return onlySession ? sessionNickname : sessionNickname ?? 'Anonymous';
  }
}
