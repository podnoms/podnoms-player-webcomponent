import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    AfterViewInit
} from '@angular/core';

@Component({
    selector: 'pnp-audio-duration-position',
    templateUrl: './audio-duration-position.component.html',
    styleUrls: ['./audio-duration-position.component.scss']
})
export class AudioDurationPositionComponent
    implements AfterViewInit, OnChanges {
    @Input() top: number;
    @Input() right: number;

    @Input() value: number = 0;
    normalisedValue: string = '00:00';

    @Input() background: string;
    @Input() colour: string;

    constructor() {}
    ngAfterViewInit() {
        console.log(
            'audio-duration-position.component',
            'ngAfterViewInit',
            this.value
        );
        this.normalisedValue = this._formatTime(this.value);
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.value) {
            this.normalisedValue = this._formatTime(this.value);
        }
    }
    _formatTime(seconds: number) {
        const flooredSeconds = Math.floor(seconds);
        const h = Math.floor(flooredSeconds / 3600);
        const m = Math.floor((flooredSeconds % 3600) / 60);
        const s = flooredSeconds % 60;
        return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
            .filter(a => a)
            .join(':');
    }
}
