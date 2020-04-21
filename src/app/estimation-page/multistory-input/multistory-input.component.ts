import { Component, OnInit, Inject } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultiStory } from './multistory-input.model';

@Component({
  selector: 'rr-multistory-input',
  templateUrl: './multistory-input.component.html',
  styleUrls: ['./multistory-input.component.scss']
})
export class MultistoryInputComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER];
  newStory: string;

  constructor(private dialogRef: MatDialogRef<MultistoryInputComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MultiStory) { }

  ngOnInit(): void {
  }

  addStory(story: string) {
    this.data.stories.push(story.trim());
    this.newStory = '';
  }

  removeStory(story: string) {
    this.data.stories = this.data.stories.filter(s => s !== story);
  }

  onPaste(event: ClipboardEvent) {
    const text = event.clipboardData.getData('text');
    const splitText = text.split(/[\n,]/);
    splitText?.forEach(s => this.addStory(s));
    return false;
  }
  done() {
    this.dialogRef.close();
  }
}
