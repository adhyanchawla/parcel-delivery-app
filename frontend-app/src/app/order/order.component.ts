// order estimates yet to be calculated
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, Validator } from '@angular/forms';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
import {Directive } from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import { Router } from '@angular/router';

// used this directive to upload an image
@Directive({
    selector: "input[type=file]",
    host : {
        "(change)" : "onChange($event.target.files)",
        "(blur)": "onTouched()"
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessor, multi: true }
    ]
})
export class FileValueAccessor implements ControlValueAccessor {
    value: any;
    onChange = (_) => {};
    onTouched = () => {};

    writeValue(value) {}
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
}

// used for validating the file
export class FileValidator implements Validator {
  static validate(c: FormControl): {[key: string]: any} {
      return c.value == null || c.value.length == 0 ? { "required" : true} : null;
  }

  validate(c: FormControl): {[key: string]: any} {
      return FileValidator.validate(c);
  }
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  
  @ViewChild("formDirective") formDirective: NgForm; // to send the data to other component
  @Output() createData: EventEmitter<FormData> = new EventEmitter(); 
  selectedFile: File = null;
  success = false;
  orderForm: FormGroup;
  response$: Observable<any>;
  orderTypes: any = [
    'Electronics',
    'Sports Equipment',
    'Apparel and Accessories',
    'Household Items',
    'Automotives',
  ]; //types of orders
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderForm = this.createFormGroup();
  }

  //creation of the form
  createFormGroup(): FormGroup {
    return new FormGroup({
      orderType: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required]),
      pickupAddress: new FormControl('', [Validators.required]),
      dropAddress: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      sampleFile: new FormControl('', [FileValidator.validate])
    });
  }

  // on uploading of file
  uploadFile(event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.orderForm.patchValue({
      sampleFile: file
    });
    this.orderForm.get('sampleFile').updateValueAndValidity();
  }

  // on submitting the order the form data is encapsulated in the variable fd
  order() {
    const fd = new FormData();
    fd.append('orderType', this.orderForm.get('orderType').value);
    fd.append('weight', this.orderForm.get('weight').value);
    fd.append('length', this.orderForm.get('length').value);
    fd.append('width', this.orderForm.get('width').value);
    fd.append('pickupAddress', this.orderForm.get('pickupAddress').value);
    fd.append('dropAddress', this.orderForm.get('dropAddress').value);
    fd.append('phone', this.orderForm.get('phone').value);
    fd.append('sampleFile', this.orderForm.get('sampleFile').value);
    this.response$ = this.orderService.uploadFormData(fd);
    localStorage.setItem("orderCreated", JSON.stringify(this.orderForm.getRawValue())); //stores the order info temporarily in local storage
    // console.log(this.response$);
    this.response$.subscribe(
      res => {
        if(res) {
          this.success = true;
          this.createData.emit(fd); 
          this.router.navigate(['/costestimates']); //navigate to cost estimates component
        }
      }
    )  
  }
}


