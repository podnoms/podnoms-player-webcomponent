import { Component, Input } from '@angular/core';
import { PlayState } from 'src/app/data/playstates';

@Component({
    selector: 'pnp-play-button',
    templateUrl: './play-button.component.html',
    styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {
    PlayState = PlayState;
    @Input() playState: PlayState;
    constructor() {}
}
