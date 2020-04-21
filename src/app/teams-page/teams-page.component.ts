import { Component, OnInit } from '@angular/core';
import { TeamsPageService } from './teams-page.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamsPage } from './models/teams-page.model';

@Component({
  selector: 'rr-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss']
})
export class TeamsPageComponent implements OnInit {

  teamsLoading: boolean;
  newTeam: string;
  model: TeamsPage;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TeamsPageService,
    private snackBar: MatSnackBar) {
    this.model = this.route.snapshot.data.model;
  }

  ngOnInit(): void {
    this.teamsLoading = true;
    this.model.teams.subscribe(() => this.teamsLoading = false);
  }

  createTeam() {
    if (this.newTeam) {
      this.service.createTeam(this.newTeam)
        .then(() => this.newTeam = '')
        .catch(() => this.snackBar.open('Error creating team. Try again please.'));
    }
  }

  clearSession() {
    this.newTeam = '';
  }

  goToTeam(teamKey: string) {
    this.router.navigate(['teams', teamKey]);
  }
}
