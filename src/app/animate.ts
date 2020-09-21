import {trigger, state, style, animate, transition} from '@angular/animations';

export let fade = trigger('fade', [
  state('void', style({opacity: 0})),

  transition('void <=> *', [
    animate(1500)
  ])
]);

export let slideFromAbove = trigger('slideFromAbove', [
  transition(':enter', [
        style({transform: 'translateY(-20px)'}),
        animate('1s 1.5s ease-in')
    ])
]);
