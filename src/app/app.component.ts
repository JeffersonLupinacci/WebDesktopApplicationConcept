import { Component } from '@angular/core';
import { WallpaperService } from './core/wallpaper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [WallpaperService],
})
export class AppComponent {

  title = 'Application :: v1.0';

  constructor(private wallpaperService: WallpaperService) {
    wallpaperService.setWallpaper();
  }

}
