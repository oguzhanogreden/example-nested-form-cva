import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Week } from '../models/week.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  
  daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

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
    let data = this.getDummyData();
    
    this.formGroup.setValue(data);
  }
  
  // You would get this from an injected service.
  private getDummyData(): Week {
    let data = {
      'Monday': [{
        'interval': {
          'start': 12,
          'end': 17
        },
        'capacity': 10
      }],
      'Tuesday': [
        {
          'interval': {
            'start': 10,
            'end': 18
          },
          'capacity': 10
        },
        {
          'interval': {
            'start': 19,
            'end': 21
          },
          'capacity': 12
        }
      ],
      'Wednesday': [],
      'Thursday': [],
      'Friday': [],
      'Saturday': [],
      'Sunday': []
    };
    
    return data;
  }
}
