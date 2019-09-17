import {
    Component,
    ViewEncapsulation,
    ChangeDetectorRef,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var pnplayer_init: any;

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class AudioPlayerComponent implements AfterViewInit {
    pcm: string = '';
    initialised: boolean = false;

    @ViewChild('player', { static: true })
    player: ElementRef;

    @Input() audioUrl: string;
    @Input() pcmUrl: string;
    @Input() imageUrl: string;
    @Input() title: string;
    @Input() target: string;
    @Input() subTitle: string;
    @Input() titleColour: string;
    @Input() subTitleColour: string;
    @Input() backgroundColour: string;
    @Input() volumeColour: string;
    @Input() waveColour: string = '222222';
    @Input() waveColourProgress: string = 'ea8c52';

    @Output() audioStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() connected: EventEmitter<any> = new EventEmitter<any>();
    @Output() audioplay: EventEmitter<any> = new EventEmitter<any>();
    @Output() audiopause: EventEmitter<any> = new EventEmitter<any>();
    @Output() audioend: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private httpClient: HttpClient,
        private cdRef: ChangeDetectorRef,
        private elem: ElementRef,
    ) {}

    ngAfterViewInit() {
        console.log('audio-player.component', 'ngAfterViewInit', this.audioStart);

        if (this.audioUrl) {
            this.httpClient.get<string>(this.pcmUrl).subscribe(r => {
                this.pcm = r['data'].toString();
                this._startPlayerSetupHook();
            });
        }
    }
    debugClick() {
        this.connected.emit('arse');
    }
    _startPlayerSetupHook() {
        this.cdRef.detectChanges();
        setTimeout(() => this._setupPlayer(), 1000);
    }
    _setupPlayer() {
        const settings_ap = {
            disable_volume: 'off',
            autoplay: 'off',
            design_skin: 'skin-wave',
            design_wave_color_bg: this.waveColour,
            design_wave_color_progress: this.waveColourProgress,
            skinwave_wave_mode: 'canvas',
            skinwave_mode: 'small',
            action_audio_play: e => this.audioplay.emit(e),
            action_audio_pause: e => this.audiopause.emit(e),
            action_audio_end: e => this.audioend.emit(e),
        };
        if (!this.initialised) {
            pnplayer_init(this.player.nativeElement, settings_ap);
            this.initialised = true;
            this.connected.emit();
        } else {
            alert('Should do something here....');
            // this.player.nativeElement.api_change_media(null, {
            //     type: 'audio',
            //     fakeplayer_is_feeder: 'off',
            //     artist: this.nowPlaying.entry.podcastTitle,
            //     source: `${this.nowPlaying.entry.audioUrl}?ngsw-bypass`,
            //     song_name: this.nowPlaying.entry.title,
            //     autoplay: 'on',
            //     thumb: this.nowPlaying.entry.thumbnailUrl,
            //     pcm: '[' + this.pcm + ']',
            // });
        }
    }
}
