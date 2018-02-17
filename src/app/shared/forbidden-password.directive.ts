import { Directive, Attribute } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';



@Directive({
  selector: '[forbiddenPassword][ngModel],[forbiddenPassword][formControl],[forbiddenPassword][formControlName]',
  providers:[{provide:NG_VALIDATORS, useExisting:ForbiddenPasswordDirective, multi:true}]
})
export class ForbiddenPasswordDirective implements Validator{
  constructor( @Attribute('forbiddenPassword') public forbiddenPassword: number) {}
  validate(control:AbstractControl):{[key:string]:any}{
    const name = control.value;
    if(!name){
      return null;
    }
    const n: number = this.forbiddenPassword;
    let nameRe:RegExp;
    if(n==1){
      //Minimum eight characters, at least one letter and one number:
      nameRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
    }else if(n==2){
      //Minimum eight characters, at least one letter, one number and one special character
       nameRe = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i;
    }else if(n==3){
     //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
      nameRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
     }else if(n==4){
     //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      nameRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/i;
    }else if(n==5){
     //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
      nameRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/i;
    }
    const no = nameRe.test(name);
    return no ? null:{'forbiddenPassword': true};

  }
}
