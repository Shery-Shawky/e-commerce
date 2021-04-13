import { Directive , ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFormValidation]'
})
export class FormValidationDirective  implements OnInit, OnChanges {
  @Input() appFormValidation: any;
  @HostBinding('class')
  elementClass
  constructor() { }
  ngOnInit() {
    this.elementClass = (this.appFormValidation=='true') ? 'is-valid' : 'is-invalid';
  }
  ngOnChanges() {
    this.elementClass = (this.appFormValidation=='true') ? 'is-valid' : 'is-invalid';
  }
}
