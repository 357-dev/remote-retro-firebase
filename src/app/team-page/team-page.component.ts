import { Component, OnInit } from '@angular/core';
import { TeamPage } from './models/team-page.model';
import { TeamPageService } from './team-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sprint } from '../common/sprint.model';
import { NavUtils } from '../common/nav-utils';

@Component({
  selector: 'rr-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'created', 'estimation', 'retro'];

  loading: boolean;
  newSprint: string;

  model: TeamPage;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TeamPageService,
    private snackBar: MatSnackBar) {
    this.model = this.route.snapshot.data.model;
  }

  ngOnInit(): void {
    this.loading = true;
    this.model.sprints.subscribe(() => this.loading = false);
  }

  createSprint() {
    if (this.newSprint) {
      this.service.createSprint(this.model.key, this.newSprint)
        .then(() => this.clearSprint())
        .catch(() => this.snackBar.open('Error create retro session. Try again please.'));
    }
  }

  clearSprint() {
    this.newSprint = '';
  }

  goToEstimation(sprint: Sprint) {
    this.router.navigate(NavUtils.estimationUrl(this.model.key, sprint.key));
  }

  goToRetro(sprint: Sprint) {
    this.router.navigate(NavUtils.retroUrl(this.model.key, sprint.key));
  }

  goToTeams() {
    this.router.navigate(NavUtils.teamsUrl());
  }

  deleteTeam() {
    this.service.deleteTeam(this.model.key)
      .then(() => this.goToTeams());
  }
}
