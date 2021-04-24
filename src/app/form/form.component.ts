import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    let validators = [Validators.min(0), Validators.max(20)];

    this.formGroup = this.fb.group({
      'Monday': [null, validators],
      'Tuesday': [null, validators],
      'Wednesday': [null, validators],
      'Thursday': [null, validators],
      'Friday': [null, validators],
      'Saturday': [null, validators],
      'Sunday': [null, validators],
    })
   }

  ngOnInit(): void {
  }

}
