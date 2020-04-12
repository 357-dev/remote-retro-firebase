import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rr-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent implements OnInit {
  nickname: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.nickname = this.userService.getNickname(true);
  }

  clearNickname() {
    this.nickname = '';
  }

  pickSession() {
    this.userService.setNickname(this.nickname);
    this.router.navigate(['sessions']);
  }
}
