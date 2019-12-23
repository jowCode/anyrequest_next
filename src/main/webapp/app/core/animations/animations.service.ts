import { Injectable } from '@angular/core';

@Injectable()
export class AnimationsService {
  private static routeAnimationType: RouteAnimationType = 'PAGE';

  constructor() {
    AnimationsService.routeAnimationType = 'PAGE';
  }

  static isRouteAnimationsType(type: RouteAnimationType) {
    return AnimationsService.routeAnimationType === type;
  }

  /*  updateRouteAnimationType(
    pageAnimations: boolean,
    elementsAnimations: boolean
  ) {
    AnimationsService.routeAnimationType =
      pageAnimations && elementsAnimations
        ? 'ALL'
        : pageAnimations
        ? 'PAGE'
        : elementsAnimations
          ? 'ELEMENTS'
          : 'NONE';
  }*/
}

export type RouteAnimationType = 'ALL' | 'PAGE' | 'ELEMENTS' | 'NONE';
