import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss'],
})
export class AddTripComponent implements OnInit {
  @Input() tripInfo: any;
  @Output() add = new EventEmitter<any>();

  addTripForm: FormGroup;
  isVisible: boolean;
  image: string;
  incorrectFile: boolean;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addTripForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      country: [null, [Validators.required, Validators.minLength(4)]],
      rating: [null, [Validators.required, Validators.pattern(/^[1-5]$/)]],
      expenses: [null, [Validators.required, this.expensesValidator]],
      notes: [null, [Validators.required, Validators.minLength(16)]],
    });
  }

  expensesValidator(control: AbstractControl) {
    const expenses = control.value;
    if (!Number.isNaN(+expenses) && +expenses >= 0) {
      return null;
    }
    return { expenses: true };
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const isImage = /\.(jpe?g|png|gif)$/i.test(file.name);
      if (isImage) {
        this.incorrectFile = false;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          if (e.target != null) this.image = e.target.result as string;
        };
      } else {
        this.incorrectFile = true;
      }
    } else {
      this.incorrectFile = false;
      this.image = '';
    }
  }

  showModal(): void {
    this.ngOnInit();
    this.isVisible = true;
  }

  modalCancel() {
    this.isVisible = false;
  }

  addTrip(): void {
    if (this.addTripForm.invalid) return;
    this.tripInfo = {
      ...this.addTripForm.value,
      image: this.image || 'assets/default_image.png',
    };
    this.add.emit(this.tripInfo);
    this.image = '';
    this.isVisible = false;
  }

  get name(): FormControl {
    return this.addTripForm.get('name') as FormControl;
  }

  get country(): FormControl {
    return this.addTripForm.get('country') as FormControl;
  }

  get rating(): FormControl {
    return this.addTripForm.get('rating') as FormControl;
  }

  get expenses(): FormControl {
    return this.addTripForm.get('expenses') as FormControl;
  }

  get notes(): FormControl {
    return this.addTripForm.get('notes') as FormControl;
  }
}
