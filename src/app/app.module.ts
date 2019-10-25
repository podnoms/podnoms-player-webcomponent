import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { CommonModule } from '@angular/common';

import { createCustomElement } from '@angular/elements';
import { AudioPlayerWrapperComponent } from './audio-player/audio-player-wrapper.component';
import { NgxAudioplayerModule } from '@podnoms/ngx-audioplayer';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [AudioPlayerWrapperComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        LoggerModule.forRoot({
            level: !environment.production
                ? NgxLoggerLevel.DEBUG
                : NgxLoggerLevel.OFF,
            // serverLogLevel
            serverLogLevel: NgxLoggerLevel.OFF
        }),
        NgxAudioplayerModule
    ],
    providers: [],
    entryComponents: [AudioPlayerWrapperComponent]
})
export class AppModule {
    constructor(private injector: Injector) {}
    ngDoBootstrap() {
        const el = createCustomElement(AudioPlayerWrapperComponent, {
            injector: this.injector
        });
        customElements.define('audio-player', el);
    }
}
