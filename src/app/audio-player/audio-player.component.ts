import {
    Component,
    ViewEncapsulation,
    ChangeDetectorRef,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerRendererService } from './services/player-renderer.service';

import * as WaveSurfer from 'wavesurfer.js';
import { PlayState } from '../data/playstates';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AudioPlayerComponent implements AfterViewInit {
    playState: PlayState = PlayState.Stopped;

    wavesurfer: any;
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
        private renderer: PlayerRendererService
    ) {}

    ngAfterViewInit() {
        console.log(
            'audio-player.component',
            'ngAfterViewInit',
            this.audioStart
        );
        requestAnimationFrame(() => {
            this.wavesurfer = WaveSurfer.create({
                container: this.player.nativeElement,
                height: 58,
                normalize: true,
                barWidth: 3,
                scrollable: false,
                mediaControls: false,
                backend: 'MediaElement',
                progressColor: this._generateColourWithReflect(this.waveColour),
                waveColor: this._generateColourWithReflect(
                    this.waveColourProgress
                ),
                reflection: false
            });

            // this.wavesurfer.load(this.audioUrl);
            this.httpClient.get<any>(this.pcmUrl).subscribe(r => {
                this.wavesurfer.backend.peaks = r.data.map(p => p / 128);
                this.wavesurfer.drawBuffer();
                this.wavesurfer.load(
                    this.audioUrl,
                    this.wavesurfer.backend.peaks,
                    'none'
                );
            });
        });
    }
    play() {
        if (this.wavesurfer) {
            if (
                this.playState === PlayState.Paused ||
                this.playState === PlayState.Stopped
            ) {
                this.wavesurfer.play();
                this.playState = PlayState.Playing;
            } else {
                this.wavesurfer.pause();
                this.playState = PlayState.Paused;
            }
        }
    }
    _generateColourWithReflect(colour: string): CanvasGradient {
        const ctx = document.createElement('canvas').getContext('2d');
        const reflectScale = 0.4;

        const rgba = this._cssColorToRgba(colour);
        const rgbaReflect = this._cssColorToRgba(
            this._alterColorForReflect(colour, 40)
        );
        const waveformGradient = ctx.createLinearGradient(0, 0, 0, 103);
        waveformGradient.addColorStop(
            reflectScale,
            `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 1.000)`
        );
        waveformGradient.addColorStop(
            reflectScale,
            `rgba(${rgbaReflect[0]}, ${rgbaReflect[1]}, ${rgbaReflect[2]}, 1.000)`
        );
        return waveformGradient;
    }

    _alterColorForReflect(colour: string, amt: number) {
        let useHash = false;

        if (colour[0] === '#') {
            colour = colour.slice(1);
            useHash = true;
        }

        const num = parseInt(colour, 16);

        let r = (num >> 16) + amt;

        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        let b = ((num >> 8) & 0x00ff) + amt;

        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }

        let g = (num & 0x0000ff) + amt;

        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }

        return (useHash ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }
    _cssColorToRgba(color: string) {
        if (!color) {
            return;
        }
        if (color.toLowerCase() === 'transparent') {
            return [0, 0, 0, 0];
        }
        if (color[0] === '#') {
            if (color.length < 7) {
                // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
                color =
                    '#' +
                    color[1] +
                    color[1] +
                    color[2] +
                    color[2] +
                    color[3] +
                    color[3] +
                    (color.length > 4 ? color[4] + color[4] : '');
            }
            return [
                parseInt(color.substr(1, 2), 16),
                parseInt(color.substr(3, 2), 16),
                parseInt(color.substr(5, 2), 16),
                color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1
            ];
        }
        if (color.indexOf('rgb') === -1) {
            // convert named colors
            const temp_elem = document.body.appendChild(
                document.createElement('fae3df2a-ecd1-437a-b127-f32a9524a362')
            ); // intentionally use unknown tag to lower chances of css rule override with !important
            const flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
            temp_elem.style.color = flag;
            if (temp_elem.style.color !== flag) {
                return;
            } // color set failed - some monstrous css rule is probably taking over the color of our object
            temp_elem.style.color = color;
            if (
                temp_elem.style.color === flag ||
                temp_elem.style.color === ''
            ) {
                return;
            } // color parse failed
            color = getComputedStyle(temp_elem).color;
            document.body.removeChild(temp_elem);
        }
        if (color.indexOf('rgb') === 0) {
            if (color.indexOf('rgba') === -1) {
                color += ',1';
            } // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
            return color.match(/[\.\d]+/g).map(function(a) {
                return +a;
            });
        }
    }
}
