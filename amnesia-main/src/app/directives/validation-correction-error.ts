import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValidationCorrectError]'
})
export class ValidationCorrectErrorDirective implements OnInit, OnChanges {
  @Input() appValidationCorrectError: any;
  @HostBinding('class')
  elementClass

  constructor() {
  }

  ngOnInit() {
    // console.log(this.appValidationCorrect);
    this.elementClass = (this.appValidationCorrectError=='true') ? 'is-valid' : 'is-invalid';
  }
  ngOnChanges() {
    // console.log("ASDF")
    // console.log(this.appValidationCorrect);
    this.elementClass = (this.appValidationCorrectError=='true') ? 'is-valid' : 'is-invalid';
    // console.log(this.elementClass);
  }

}
