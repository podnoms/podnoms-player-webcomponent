import { TestBed } from '@angular/core/testing';

import { PlayerRendererService } from './player-renderer.service';

describe('PlayerRendererService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerRendererService = TestBed.get(PlayerRendererService);
    expect(service).toBeTruthy();
  });
});
