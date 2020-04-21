import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Story } from './models/story.model';

@Injectable({
  providedIn: 'root'
})
export class EstimationPageService {
  constructor(private db: AngularFireDatabase) { }

  addStory(estimationKey: string, description: string) {
    const story: Story = { key: null, description, votes: [], votesVisible: false, selected: false };
    return this.db.list(`estimations/${estimationKey}`).push(story);
  }

  deleteStory(estimationKey: string, storyKey: string) {
    return this.db.object(`estimations/${estimationKey}/${storyKey}`).remove();
  }

  addVote(estimationKey: string, storyKey: string, nickname: string, voteValue: string) {
    const vote = {};
    vote[nickname] = voteValue;
    return this.db.object(`estimations/${estimationKey}/${storyKey}/votes`).update(vote);
  }

  showVotes(estimationKey: string, storyKey: string) {
    return this.db.object(`estimations/${estimationKey}/${storyKey}`).update({ votesVisible: true });
  }

  selectStory(estimationKey: string, selectedStoryKey: string, allStoryKeys: string[]) {
    const notSelectedStories: string[] = allStoryKeys.filter(s => s !== selectedStoryKey);
    const promises: Promise<void>[] = notSelectedStories
      .map(storyKey => this.db.object(`estimations/${estimationKey}/${storyKey}`).update({ selected: false }));
    return Promise.all(promises)
      .then(() => this.db.object(`estimations/${estimationKey}/${selectedStoryKey}`).update({ selected: true }));
  }

  deleteEstimation(estimationKey: string) {
    return this.db.object(`estimations/${estimationKey}`).remove();
  }
}
