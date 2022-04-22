import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from'@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  fluxForm !: FormGroup;
  actionBtn : string = "Enregistrer" ;
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.fluxForm = this.formBuilder.group({
      title : ['',Validators.required],   
      description : ['',Validators.required]

    });
    if(this.editData){
      this.actionBtn = "Modifier";
      
      this.fluxForm.controls['title'].setValue(this.editData.title);
      this.fluxForm.controls['description'].setValue(this.editData.description);

      /*
      console.log(this.editData);
      this.fluxForm.controls['pubDate'].setValue(this.editData.pubDate);
      this.fluxForm.controls['guid'].setValue(this.editData.guid);
      this.fluxForm.controls['link'].setValue(this.editData.link);
      this.fluxForm.controls['media'].setValue(this.editData.media);*/
    }
  }
  addFlux(){
    if(!this.editData){
      if(this.fluxForm.valid){
        this.api.postFlux(this.fluxForm.value)
        .subscribe({
          next:(res)=>{
            alert('flux ajouter avec succes');
            this.fluxForm.reset();
            this.dialogRef.close('enregistrer');
            
          },
          error:()=>{
            alert('Erreur')
          }
          
        })
      }
    }else{
      this.udateFlux();
    }
  }
  udateFlux(){
     this.api.putFlux(this.fluxForm.value,this.editData.id)
     .subscribe({
      next:(res)=>{
        alert('flux modifier avec succes');
        this.fluxForm.reset();
        this.dialogRef.close('modifier');
        
      },
      error:()=>{
        alert('Erreur');
      }
      
    })
  }

}
