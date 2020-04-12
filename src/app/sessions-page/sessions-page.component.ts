import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionsPage } from './models/sessions-page.model';
import { SessionsPageService } from './sessions-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'rr-sessions-page',
  templateUrl: './sessions-page.component.html',
  styleUrls: ['./sessions-page.component.scss']
})
export class SessionsPageComponent implements OnInit {

  newSession: string;
  model: SessionsPage;
  constructor(private router: Router, private route: ActivatedRoute, private service: SessionsPageService,
    private snackBar: MatSnackBar) {
    this.model = this.route.snapshot.data.model;
  }

  ngOnInit(): void {
  }

  clearSession() {
    this.newSession = '';
  }

  createRetroSession() {
    if (this.newSession) {
      this.service.createRetroSession(this.newSession)
        .then(() => this.newSession = '')
        .catch(() => this.snackBar.open('Error create retro session. Try again please.'));
    }
  }

  joinRetroSession(key: string) {
    this.router.navigate(['sessions', key]);
  }
}
