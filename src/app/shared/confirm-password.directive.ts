import { Directive, Attribute  } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';


@Directive({
  selector: '[confirmPassword][ngModel],[confirmPassword][formControl],[confirmPassword][formControlName]',
  providers:[{provide:NG_VALIDATORS, useExisting:ConfirmPasswordDirective, multi:true}]
})
export class ConfirmPasswordDirective implements Validator{
constructor( @Attribute('confirmPassword') public confirmPassword: string) {}
  validate(control:AbstractControl):{[key:string]:any}{
      const password  = control.root.get(this.confirmPassword).value;
      const repassword  =  control.value;
     if(!password){
     	return null;
     }else{
     	return (repassword && repassword == password)?null:{'confirmPassword':true};
     }
  	
  }

}
