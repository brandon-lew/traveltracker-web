import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  isScrolling = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event?: Event) {
    if (window.scrollY === 0) {
      this.isScrolling = false;
    } else if (window.scrollY > 0) {
      this.isScrolling = true;
    }
  }
}
