import { Component, OnInit } from '@angular/core';
import { EstimationPage } from './models/estimation-page.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EstimationPageService } from './estimation-page.service';
import { UserService } from '../common/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Story } from './models/story.model';
import { MultistoryInputComponent } from './multistory-input/multistory-input.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'rr-estimation-page',
  templateUrl: './estimation-page.component.html',
  styleUrls: ['./estimation-page.component.scss']
})
export class EstimationPageComponent implements OnInit {
  displayedColumns: string[] = ['description', 'delete'];

  loading: boolean;
  model: EstimationPage;
  newStory: string;
  newStories: string[];
  selectedStory: Story;
  allStoryKeys: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: EstimationPageService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.model = this.route.snapshot.data.model;
  }

  ngOnInit(): void {
    this.loading = true;
    this.model.stories.subscribe(stories => {
      this.loading = false;
      this.selectedStory = stories.find(s => s.selected);
      this.allStoryKeys = stories.map(s => s.key);
    });
  }

  clearStory() {
    this.newStory = '';
  }

  addStory(story: string) {
    if (story) {
      this.service.addStory(this.model.sprintKey, story)
        .then(() => this.clearStory())
        .catch(() => this.snackBar.open('Error adding story. Please try again!'));
    }
  }

  addStories() {
    this.newStories = [];
    const dialogRef = this.dialog.open(MultistoryInputComponent, {
      width: '75vw',
      data: { stories: this.newStories }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.newStories.forEach(s => this.addStory(s));
    });

  }

  deleteStory(story: Story) {
    story.beingDeleted = true;

    setTimeout(() => this.service.deleteStory(this.model.sprintKey, story.key)
      .catch(() => this.snackBar.open('Error deleting story. Please try again!')), 500);

    return false;
  }

  vote(voteValue: string) {
    this.service.addVote(this.model.sprintKey, this.selectedStory.key, this.userService.getNickname(), voteValue);
  }

  selectStory(story: Story) {
    this.service.selectStory(this.model.sprintKey, story.key, this.allStoryKeys)
      .catch(() => this.snackBar.open('Error selected story. Please try again!'));

    return false;
  }

  showVotes() {
    this.service.showVotes(this.model.sprintKey, this.selectedStory.key)
      .catch(() => this.snackBar.open('Error showing votes. Please try again!'));
  }

  goToTeam() {
    this.router.navigate(['teams', this.model.teamKey]);
  }

  deleteEstimation() {
    this.service.deleteEstimation(this.model.sprintKey)
      .then(() => this.goToTeam());
  }
}
