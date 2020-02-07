import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';
 

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;

  usuario:Object={

    nombrecompleto:{
      nombre:"Cristian",
      apellido:"Rodriguez"
    },
    correo:"cgrodrig@msn.com",
    pasatiempos:['correr', 'leer', 'Ver Series']

  }


  constructor() {

    console.log(this.usuario);

    this.forma=new FormGroup({

        'nombrecompleto':new FormGroup({

        'nombre': new FormControl('', [Validators.required, 
                                      Validators.minLength(3),
                                      Validators.pattern("[a-zA-Z]*"),
                                      this.noCristian

                                  ]),

        'apellido': new FormControl('', [Validators.required,
                                         Validators.pattern("[a-zA-Z]*")]),
       }),

        
        'correo': new FormControl('', [Validators.required , 
                                      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
        ]),

        'pasatiempos': new FormArray([
          new FormControl('', Validators.required)
        ]),

        'username' : new FormControl('', Validators.required, this.existeUsuario ),
        'password1' : new FormControl('', Validators.required),
        'password2' : new FormControl()
    });

    // this.forma.setValue(this.usuario);

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

    //valueChanges detecta cambios en un campo del formulario (username)
    this.forma.controls['username'].valueChanges
            .subscribe(data=>{
            console.log(data);
    })

    // valueChanges detecta cambios en cualquier campo del formulario
    this.forma.valueChanges
            .subscribe(data=>{
            console.log(data);
    })
    
    //valueChanges detecta cambios del estado valido/invalido del formulario (username)
    this.forma.controls['username'].statusChanges
            .subscribe(data=>{
            console.log(data);
    })
    
   }

   agregarPasatiempo(){ //Arreglo de pasatiempos
     (<FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl('', Validators.required)
     )
   }



  //  <!-- Validacion personalizada< -->
   noCristian(control:FormControl):{[s:string]:boolean}{
      if(control.value==="Cristian"){
        return{
          noCristian:true
        }
      }
      return null;
   }



   //  <!-- Validacion personalizada< -->
   noIgual(control:FormControl):{[s:string]:boolean}{

     let forma:any=this;
    if(control.value !== forma.controls['password1'].value){
      return{
        noiguales:true
      }
    }
    return null;
 }

  existeUsuario( control: FormControl):Promise<any>|Observable<any>{

    let promesa = new Promise((resolve, reject)=>{

      setTimeout(()=>{
        if(control.value==="strider"){
          resolve({ existe: true})
        }else{
          resolve(null)
        }
      },3000)
    })
    return promesa;
  }
   

   guardarCambios(){
     console.log(this.forma.value);
     console.log(this.forma);

     this.forma.reset({//reseteo de campos para volver a estado pristine

      nombrecompleto:{
      nombre:"",
      apellido:""
      },

      correo:"",
      pasatiempos:[]
    });     
     
   }
     
}
