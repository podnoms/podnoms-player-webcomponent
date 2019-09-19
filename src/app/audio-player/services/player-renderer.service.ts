import { Injectable, ElementRef } from '@angular/core';

import * as WaveSurfer from 'wavesurfer.js';

@Injectable({
    providedIn: 'root'
})
export class PlayerRendererService {
    constructor() {}
    renderPlayer(player: ElementRef<any>) {
        requestAnimationFrame(() => {
            const wavesurfer = WaveSurfer.create({
                container: '#myWavesurferContainer',
                waveColor: 'violet',
                progressColor: 'purple'
            });
        });
    }
}
