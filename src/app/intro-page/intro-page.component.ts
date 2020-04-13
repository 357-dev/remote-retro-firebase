import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/user.service';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'rr-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent implements OnInit {
  anonymous: boolean;
  nickname: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.nickname = this.userService.getNickname();
  }

  clearNickname() {
    this.nickname = '';
  }

  pickSession() {
    this.userService.setNickname(this.nickname);
    this.router.navigate(['sessions']);
  }

  anonymousChanged(event: MatCheckboxChange) {
    this.anonymous = event.checked;
    if (event.checked) {
      this.nickname = this.userService.getAnonymous();
    }
  }
}
