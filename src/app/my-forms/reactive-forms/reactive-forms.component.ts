import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface AddressFormGroup {
  address: FormControl<string | null>;
}

interface UserModel {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  phone : FormControl<string | null>;
  city: FormControl<string | null>;
  zip: FormControl<string | null>;
  state: FormControl<string | null>;
  addresses: FormArray<FormGroup<AddressFormGroup>>;
}

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent {

  /**
   * FormControl
   * Manejar el valor de una propiedad en especifico.
   * Se vinculan directamente con los inputs, selects, textareas del html
   */
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  surnameControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  emailControl = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  phoneControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  cityControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  zipControl = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  stateControl = new FormControl('', [Validators.required]);


  /**
   * FormArray
   * Agrupan FormControl, FormArray y FromGroup
   * A modo de array []
   */


  // FormArray<FormGroup<AddressFormGroup>>
  // Aqui lo que decimos que dentro del FormArray
  // Va a haber FormGroups, que dentro van a tener una prop "address"
  // Que va a ser de tipo FromControl<string | null>
  addresesFormArray = new FormArray<FormGroup<AddressFormGroup>>([
    new FormGroup({
      address: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    }),
  ]);


  /**
   * Los FormGroup agrupar FormControl, FormArray y FromGroup
   * A modo de objeto {}
   *
   * {
   *    email: '',
   *    password: '',
   *    city: '',
   * }
   */
  userModel: FormGroup<UserModel> = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    phone: this.phoneControl,
    city: this.cityControl,
    zip: this.zipControl,
    state: this.stateControl,
    addresses: this.addresesFormArray,
  });

  constructor(private fb: FormBuilder) {
  }

  addAddressControl(): void {
    this.addresesFormArray.push(
      this.fb.group({
        address: ['', [Validators.required, Validators.maxLength(20)]],
      })
    )
  }

  deleteFormGroupFromAddressesFormArray(index: number): void {
    this.addresesFormArray.removeAt(index);
  }

//No se avlidan ni Estado ni direcciones

  login(): void {
    if(this.userModel.controls.name.value != "" &&
      this.userModel.controls.surname.value != "" &&
      this.userModel.controls.email.value != "" &&
      this.userModel.controls.password.value != "" &&
      this.userModel.controls.phone.value != "" &&
      this.userModel.controls.city.value != "" &&
      this.userModel.controls.zip.value != "" &&
      this.userModel.controls.state.value != ""){
        alert("Logueo exitoso!");
        console.log("Logueo exitoso!");
    }else{
      alert("El formulario no se completo correctamente!");
      console.log("El formulario no se completo correctamente!");
    }
  }

}
