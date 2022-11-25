import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SortIconComponent } from "./components/sort-icon/sort-icon.component";

@Component({
  standalone: true,
  selector: "app-root",
  template: `<div class="flex min-h-screen items-center justify-center">
      <app-sort-icon></app-sort-icon>
    </div>
    <router-outlet></router-outlet> `,
  styles: [],
  imports: [CommonModule, RouterModule, SortIconComponent],
})
export class AppComponent {}
