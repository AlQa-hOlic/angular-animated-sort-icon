import { Component, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  animate,
  animateChild,
  query,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-sort-icon",
  standalone: true,
  imports: [CommonModule],
  template: `<div
      class="rounded-lg border-4 border-dotted border-slate-400 p-16"
    >
      <div
        class="animated-sort-icon"
        [@arrowOpacity]="state"
        [@allowChildren]="state"
      >
        <div class="animated-sort-icon-stem"></div>
        <div [@indicator]="getState()" class="animated-sort-icon-indicator">
          <div
            [@rightPointer]="getState()"
            class="animated-sort-icon-pointer-right"
          ></div>
          <div class="animated-sort-icon-pointer-middle"></div>
          <div
            [@leftPointer]="getState()"
            class="animated-sort-icon-pointer-left"
          ></div>
        </div>
      </div>
    </div>
    <p class="text-center">Hover/Click me</p>`,
  styleUrls: ["./sort-icon.styles.css"],
  animations: [
    trigger("indicator", [
      state("active-asc, asc", style({ transform: "translateY(0px)" })),
      state("active-desc, desc", style({ transform: "translateY(10px)" })),
      transition("asc <=> desc", animate("225ms cubic-bezier(0.4,0.0,0.2,1)")),
    ]),
    trigger("leftPointer", [
      state("active-asc, asc", style({ transform: "rotate(-45deg)" })),
      state("active-desc, desc", style({ transform: "rotate(45deg)" })),
      transition("asc <=> desc", animate("225ms cubic-bezier(0.4,0.0,0.2,1)")),
    ]),
    trigger("rightPointer", [
      state("active-asc, asc", style({ transform: "rotate(45deg)" })),
      state("active-desc, desc", style({ transform: "rotate(-45deg)" })),
      transition("asc <=> desc", animate("225ms cubic-bezier(0.4,0.0,0.2,1)")),
    ]),
    trigger("arrowOpacity", [
      state("desc, asc", style({ opacity: 1 })),
      state("hint", style({ opacity: 0.54 })),
      state("void", style({ opacity: 0 })),
      // Transition between all states except for immediate transitions
      transition("* => desc, * => void", animate("0ms")),
      transition("* <=> *", animate("225ms cubic-bezier(0.4,0.0,0.2,1)")),
    ]),
    trigger("allowChildren", [
      transition("* <=> *", [query("@*", animateChild(), { optional: true })]),
    ]),
  ],
})
export class SortIconComponent {
  // 225ms cubic-bezier(0.4,0.0,0.2,1)
  state: "asc" | "desc" | "hint" | "void" = "void";

  @HostListener("mouseover", ["$event.target"])
  onHover(_animatedSortIconDiv: HTMLDivElement) {
    if (this.state === "void") {
      this.state = "hint";
    }
  }

  @HostListener("mouseleave", ["$event.target"])
  onMouseLeave(_animatedSortIconDiv: HTMLDivElement) {
    if (this.state === "hint") {
      this.state = "void";
    }
  }

  @HostListener("click", ["$event.target"])
  onClick(_animatedSortIconDiv: HTMLDivElement) {
    if (this.state === "hint") {
      this.state = "asc";
    } else if (this.state === "asc") {
      this.state = "desc";
    } else if (this.state === "desc") {
      this.state = "hint";
    }
  }

  getState() {
    if (this.state === "hint") {
      return "active-asc";
    }

    if (this.state === "void") {
      return "active-desc";
    }
    return this.state;
  }
}
