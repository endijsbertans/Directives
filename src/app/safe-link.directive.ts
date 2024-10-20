import {Directive, ElementRef, inject, input} from "@angular/core";
import {LogDirective} from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective{
  queryParam = input('myapp', {alias: 'appSafeLink'});
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  onConfirmLeavePage(event: MouseEvent){
    const wantsToLeave = window.confirm('Do you want to leave this site?');
    if(wantsToLeave) {
      const adddress = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = adddress + '?from=' + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}
