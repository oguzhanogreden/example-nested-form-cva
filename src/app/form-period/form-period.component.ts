import { ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimePeriod } from '../models/time-period.model';

@Component({
  selector: 'app-form-period',
  templateUrl: './form-period.component.html',
  styleUrls: ['./form-period.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPeriodComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormPeriodComponent),
      multi: true
    }
  ]
})
export class FormPeriodComponent implements OnInit, ControlValueAccessor, OnDestroy {
  formGroup: FormGroup;

  onChange: any = () => {};
  onTouched: any = () => {};
  
  private onDestroy = new Subject();

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      'startTime': fb.control(null),
      'endTime': fb.control(null),
      'capacity': fb.control(null),
    }, {
      validators: [this.startEndTimeValidator]
    })
   };

  private get startTime(): number {
    return this.formGroup.get('startTime').value;
  }

  private get endTime(): number {
    return this.formGroup.get('endTime').value;
  }
   
  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.handleValueChanges());
  }
  
  ngOnDestroy() {
    this.onDestroy.next();
  }
   
  writeValue(obj: TimePeriod): void {
    if (obj) {
      this.formGroup.setValue(this.mapToComponent(obj))
    } else {
      // reset?
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate() {
    return this.formGroup.valid ? null : {'formPeriodInvalid': true};
  }
  
  private handleValueChanges() {
    let obj = this.mapToObject(this.formGroup.value);

    this.onChange(obj);
    this.onTouched();
  }
  
  private startEndTimeValidator(control: AbstractControl): ValidationErrors | null {
    console.log(control);
    const startTime = control.get('startTime').value
    const endTime = control.get('endTime').value
    const valid = startTime && endTime && startTime < endTime;
    
    return valid ? null : {'startTimeNotLater': true};
  }
  
  private mapToComponent(obj: TimePeriod): any {
    return {
      'startTime': obj.interval.start,
      'endTime': obj.interval.end,
      'capacity': obj.capacity
    };
  }
  
  private mapToObject(value: any): TimePeriod {
    return {
      'interval': {
        'start': value['startTime'],
        'end': value['endTime'],
      },
      'capacity': value['capacity']
    };
  }
}
