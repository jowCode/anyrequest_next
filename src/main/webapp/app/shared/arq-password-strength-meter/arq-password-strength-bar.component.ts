import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-password-strength-bar-v2',
  templateUrl: 'arq-password-strength-bar.component.html',
  styleUrls: ['arq-password-strength-bar.scss']
})
export class ArqPasswordStrengthBarComponent {
  public currentClassName = 'empty-meter';

  constructor() {}

  measureStrength(p: string): number {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_`[\]]/g; // "
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    const flags = [lowerLetters, upperLetters, numbers, symbols];
    const passedMatches = flags.filter((isMatchedFlag: boolean) => {
      return isMatchedFlag;
    }).length;

    force += 2 * p.length + (p.length >= 10 ? 1 : 0);
    force += passedMatches * 10;

    // penalty (short password)
    force = p.length <= 6 ? Math.min(force, 10) : force;

    // penalty (poor variety of characters) only applied if too short
    if (p.length <= 16) {
      force = passedMatches === 1 ? Math.min(force, 10) : force;
      force = passedMatches === 2 ? Math.min(force, 20) : force;
      force = passedMatches === 3 ? Math.min(force, 40) : force;
    } else {
      force = 41;
    }

    return force;
  }

  getClassName(s: number): string {
    let className: string;
    if (s <= 10) {
      className = 'worst blink-fast';
    } else if (s <= 20) {
      className = 'bad blink-med';
    } else if (s <= 30) {
      className = 'weak blink-med';
    } else if (s <= 40) {
      className = 'good blink-slow';
    } else if (s > 40) {
      className = 'strong';
    } else {
      className = 'empty-meter';
    }
    return className;
  }

  @Input()
  set passwordToCheck(password: string) {
    if (password) {
      this.currentClassName = this.getClassName(this.measureStrength(password));
    }
  }
}
