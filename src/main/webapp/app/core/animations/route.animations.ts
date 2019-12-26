import { animate, query, style, transition, trigger, stagger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))])
]);

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0 }), stagger('120ms', animate('600ms ease-out', style({ opacity: 1 })))], { optional: true }),
    query(':leave', animate('200ms', style({ opacity: 0 })), { optional: true })
  ])
]);

export const transformAnimation = trigger('transformAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }), // initial
    animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 })) // final
  ])
]);
