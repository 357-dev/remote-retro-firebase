import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'rr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.db.object('.info/connected').valueChanges().pipe(
      map(connected => {
        if (!connected) {
          this.snackBar.open('Connection lost! Please refresh!');
        }
      }));
  }
}
