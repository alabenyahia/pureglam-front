import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteDialogComponent} from "../components/confirm-delete-dialog/confirm-delete-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    private dialog: MatDialog) { }

  openDeleteConfirmationDialog(message: string) {
    return this.dialog.open<ConfirmDeleteDialogComponent>(ConfirmDeleteDialogComponent, {
      data: { message } // Pass confirmation message to component
    }).afterClosed(); // Returns an Observable for confirmed/cancelled action
  }
}
