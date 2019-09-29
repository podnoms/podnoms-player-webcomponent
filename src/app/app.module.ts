import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { CommonModule } from '@angular/common';

import { createCustomElement } from '@angular/elements';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { VolumeSliderComponent } from './components/volume-slider/volume-slider.component';
import { AudioDurationPositionComponent } from './components/audio-duration-position/audio-duration-position.component';

@NgModule({
    declarations: [
        AudioPlayerComponent,
        PlayButtonComponent,
        VolumeSliderComponent,
        AudioDurationPositionComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        LoggerModule.forRoot({
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR
        })
    ],
    providers: [],
    entryComponents: [AudioPlayerComponent]
})
export class AppModule {
    constructor(private injector: Injector) {}
    ngDoBootstrap() {
        const el = createCustomElement(AudioPlayerComponent, {
            injector: this.injector
        });
        customElements.define('audio-player', el);
    }
}
