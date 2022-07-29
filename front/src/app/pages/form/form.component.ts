
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DiscosService } from 'src/app/services/disco.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public discoForm!: FormGroup;
  public submmited: boolean = false;
  public newDisco = this.discosService.discoData;
  public discoID = this.discosService.discoData.id;
  public newCarta = this.discosService.cartaData;
  

  constructor(private formBuilder: FormBuilder, private discosService: DiscosService, private router: Router) {  console.log(this.newCarta);
  }
  
  
  ngOnInit(): void {

    //Con esta función siempre tendremos el formulario desde el comienzo.
    this.discosService.clearDisco();

    this.discoForm = this.formBuilder.group({
      title: [this.newDisco.title, [Validators.required, Validators.minLength(3)]],
      author: [this.newDisco.author, [Validators.required, Validators.minLength(20)]],
      cover: [this.newDisco.cover, [Validators.required]],
      year: [this.newDisco.year, [Validators.required, Validators.maxLength(4)]]
    });

    //De esta forma añadimos al objeto por defecto de newComic los valores del formulario automaticamente según vayan cambiando.
    this.discoForm.valueChanges.subscribe((changes) => {
      this.newDisco = changes;
    })
  }

  public onSubmit() {
  //   //Si el comicID que he almacenado al principio es diferente que string vacio
    if (this.discoID !== "") {
  //     //Apuntas con el discoID al que quieres modificar, si estoy en el 1 es al 1, y le envio el contenido de mi formulario
     this.discosService.putDisco(this.discoID, this.newDisco).subscribe();
      
    // alert("Disco edited");
    } else {
      //Le mando newComic a través de la funcion postComic de mi servicio y me suscribo para que mande el nuevo comic
      this.discosService.postDisco(this.newDisco).subscribe();
      alert("Disco created");
    }
  //   //Reseteamos el formulario
     this.discoForm.reset();
  //   //Sacamos un mensaje por alerta de que hemos creado un comic.
  //   //Con el router que hemos importado en el constructor podemos indicarle como si fuera un routerLink que navegue a /comics para que nos saque del formulario.
     this.router.navigate(["/Albums"]);
     
     

   }

   public delete() {
  //   //Borramos el comic
   this.discosService.deleteDisco(this.newDisco.id).subscribe();
  //   //Reseteamos los datos del DiscoData
    this.discosService.clearDisco();
   alert("Disco deleted");
  //   //Volvemos a comics
   this.router.navigate(["/albums"]);
  }

}
