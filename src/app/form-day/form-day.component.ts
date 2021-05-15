import { ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Form, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimePeriod } from '../models/time-period.model';

@Component({
  selector: 'app-form-day',
  templateUrl: './form-day.component.html',
  styleUrls: ['./form-day.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDayComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormDayComponent),
      multi: true
    }
  ]
})
export class FormDayComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input()
  DayOfWeek: string;
  
  formGroup: FormGroup;

  onChange: any = () => {};
  onTouched: any = () => {};

  private onDestroy= new Subject();

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.formGroup = this.fb.group({
      timePeriods: this.fb.array([], [this.totalCapacityValidator])
    });
   }
   
  get timePeriods(): FormArray {
    return this.formGroup.get('timePeriods') as FormArray;
  }
  
  set value(obj: any) {
    this.timePeriods.setValue(obj);
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(_ => {
        this.onChange(this.timePeriods.value);
      })
      
  }
  
  ngOnDestroy() {
    this.onDestroy.next();
  }
  
  onAddNew() {
    // This will cause initialization of a new FormPeriodComponent
    this.timePeriods.push(this.fb.control(null));

    // The initialised child component may change state of parent if the child
    // is invalid upon initialisation.
    this.cd.detectChanges();
  }

  writeValue(obj: any): void {
    if (obj) {
      obj.forEach(() => this.timePeriods.push(this.fb.control(null)));
      
      this.value = obj;
    } else {
      this.timePeriods.reset();
    }
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  
  validate() {
    return this.formGroup.valid ? null : {'formDayInvalid': true};
  }
  
  private totalCapacityValidator(control: AbstractControl): ValidationErrors | null  {
    const value = control.value as TimePeriod[];
    
    const totalCapacity = value
    .filter(x => x)
    .reduce((prev, curr) => prev + curr.capacity, 0);
    
    const valid = totalCapacity <= 20;
    
    return valid ? null : {'capacity': true};
  }
}
