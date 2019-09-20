import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { createCustomElement } from '@angular/elements';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { CommonModule } from '@angular/common';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { VolumeSliderComponent } from './components/volume-slider/volume-slider.component';

@NgModule({
    declarations: [AudioPlayerComponent, PlayButtonComponent, VolumeSliderComponent],
    imports: [BrowserModule, HttpClientModule, CommonModule],
    providers: [],
    entryComponents: [AudioPlayerComponent],
})
export class AppModule {
    constructor(private injector: Injector) {}
    ngDoBootstrap() {
        const el = createCustomElement(AudioPlayerComponent, { injector: this.injector });
        customElements.define('audio-player', el);
    }
}
