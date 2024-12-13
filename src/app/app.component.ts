import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlaylistComponent],
  template: '<app-playlist></app-playlist>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'playlist-app';
}
