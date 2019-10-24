import {
    Component,
    ViewEncapsulation,
    AfterViewInit,
    Input,
    Output,
    EventEmitter} from '@angular/core';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'audio-player',
    templateUrl: './audio-player-wrapper.component.html',
    styleUrls: ['./audio-player-wrapper.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AudioPlayerWrapperComponent implements AfterViewInit {
    @Input() audioUrl: string;
    @Input() pcmUrl: string;
    @Input() imageUrl: string;
    @Input() title: string;
    @Input() target: string;
    @Input() subTitle: string;
    @Input() autoPlay: boolean;
    @Input() titleColour: string;
    @Input() subTitleColour: string;
    @Input() backgroundColour: string;
    @Input() volumeColour: string;
    @Input() waveColour: string;
    @Input() waveColourProgress: string;
    @Input() barWidth: number = 2.3;
    @Input() barWidthScalingFactor: number = 128;
    @Input() reflectScale: number = 0.32;

    @Output() audioStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() connected: EventEmitter<any> = new EventEmitter<any>();
    @Output() audioplay: EventEmitter<any> = new EventEmitter<any>();
    @Output() audiopause: EventEmitter<any> = new EventEmitter<any>();
    @Output() audioend: EventEmitter<any> = new EventEmitter<any>();
    @Output() audioProgress: EventEmitter<any> = new EventEmitter<any>();
    @Output() destroy: EventEmitter<any> = new EventEmitter<any>();
    
    ngAfterViewInit(): void {
    }
}
