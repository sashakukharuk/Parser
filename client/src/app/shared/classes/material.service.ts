import {ElementRef} from '@angular/core'


declare var M

export class MaterialService {
  static initializeFormSelect(ref: ElementRef) {
    M.FormSelect.init(ref.nativeElement)
  }
}
