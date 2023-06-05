import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  template: `
    <h2>Congratulations!</h2>
    <p>Your account has been created:</p>
    <p>Username: {{ data.username }}</p>
    <p>Email: {{ data.email }}</p>
    <p>Password: {{ data.password }}</p>
    <button mat-raised-button color="primary" (click)="onClose()">Close</button>
  `,
})
export class SuccessDialogComponentComponent {

  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
  

}
