import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Assignment } from '../assignment.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

// Pour le formulaire
dateDeRendu!:Date;
nom = "";
remarques = "";
matiere = "";
imgProf = "";
imgMatiere = "";
auteur = "";
note="";
rendu!:boolean;


  assignments: any;
  nouvelAssignment: any;

  isLinear = false

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
 
  thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });
nomEleve: any;

  constructor(private assignmentsService: AssignmentsService,
    private router: Router,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder

              ) { }

  ngOnInit(): void {
  }

  onSubmit(){

    if(this.matiere === 'Big data') {
      this.imgProf = 'https://univ-cotedazur.fr/medias/photo/rs9100-buffa-michel-scr_1623769953324-jpg?ID_FICHE=1094906';
      this.imgMatiere = 'https://thumbs.dreamstime.com/z/codage-de-site-web-technologie-l-information-124596813.jpg';}
   
    else if (this.matiere === 'Innovation') {
      this.imgProf = 'https://univ-cotedazur.fr/medias/photo/anblandel_1655915226640-jpg?ID_FICHE=1094906';
      this.imgMatiere = 'https://img.freepik.com/photos-gratuite/concept-rpa-ecran-tactile-flou-main_23-2149311914.jpg?w=996&t=st=1673553791~exp=1673554391~hmac=e0128d9da518076a0e2a1e4cbd56aabc602847414d40131e294ff56b6294db6e';
    }
    else {
      this.imgProf = 'https://univ-cotedazur.fr/medias/photo/rs9100-buffa-michel-scr_1623769953324-jpg?ID_FICHE=1094906';
      this.imgMatiere = 'https://thumbs.dreamstime.com/z/codage-de-site-web-technologie-l-information-124596813.jpg';
    }

  

    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.id = 1000 + Math.floor(Math.random()*1000);
    nouvelAssignment.remarques = this.remarques;
    nouvelAssignment.matiere = this.matiere;
    nouvelAssignment.imgProf = this.imgProf;
    nouvelAssignment.imgMatiere = this.imgMatiere;
    nouvelAssignment.auteur = this.auteur;
    nouvelAssignment.note = this.note;

//    this.assignments.push(nouvelAssignment);

    //this.nouvelAssignment.emit(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe((reponse: { message: any; }) => {
      console.log(reponse.message);
      console.log("devoir ajouté : " + nouvelAssignment.nom)

      this.router.navigate(['assignments'])
      this.toastr.success(' Le devoir a été ajouté avec succés ' ,'Félicitation !',
      { positionClass : 'toast-top-right',
      timeOut:5000,
    });

});     

  }

}
