import {
    Component,
    OnInit,
    AfterViewInit,
    OnChanges,
    Input,
    SimpleChanges
} from '@angular/core';
import { PlayState } from 'src/app/data/playstates';

@Component({
    selector: 'app-play-button',
    templateUrl: './play-button.component.html',
    styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent implements OnInit, AfterViewInit, OnChanges {
    PlayState = PlayState;
    @Input() playState: PlayState;
    constructor() {}

    ngOnInit() {
        console.log('play-button.component', 'ngOnInit', this.playState);
    }
    ngAfterViewInit() {
        console.log('play-button.component', 'ngAfterViewInit', this.playState);
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log('play-button.component', 'ngOnChanges', this.playState);
        console.log('play-button.component', 'ngOnChanges', changes);
    }
}
