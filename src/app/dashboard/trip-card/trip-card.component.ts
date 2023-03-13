import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  @Input() trip: any;
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  editTripForm: FormGroup;
  isVisible: boolean;
  image: string;
  incorrectFile: boolean;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editTripForm = this.formBuilder.group({
      name: [this.trip.name, [Validators.required, Validators.minLength(6)]],
      country: [
        this.trip.country,
        [Validators.required, Validators.minLength(4)],
      ],
      rating: [
        this.trip.rating,
        [Validators.required, Validators.pattern(/^[1-5]$/)],
      ],
      expenses: [
        this.trip.expenses,
        [Validators.required, this.expensesValidator],
      ],
      notes: [this.trip.notes],
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
    }
  }

  showModal(): void {
    this.ngOnInit();
    this.isVisible = true;
  }

  modalCancel() {
    this.isVisible = false;
  }

  editTrip(): void {
    if (this.editTripForm.invalid) return;
    this.trip = {
      ...this.editTripForm.value,
      image: this.image || 'assets/default_image.png',
    };
    this.edit.emit(this.trip);
    this.isVisible = false;
  }
  deleteTrip() {
    this.delete.emit();
  }

  get name(): FormControl {
    return this.editTripForm.get('name') as FormControl;
  }

  get country(): FormControl {
    return this.editTripForm.get('country') as FormControl;
  }

  get rating(): FormControl {
    return this.editTripForm.get('rating') as FormControl;
  }

  get expenses(): FormControl {
    return this.editTripForm.get('expenses') as FormControl;
  }

  get notes(): FormControl {
    return this.editTripForm.get('notes') as FormControl;
  }
}
