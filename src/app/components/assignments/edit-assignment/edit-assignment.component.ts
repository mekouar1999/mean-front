import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Assignment } from '../assignment.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment!:Assignment|undefined;

  // Pour les champs de formulaire

  nomAssignment:string="";
  dateDeRendu!:Date;
  note:string="";
  remarques:string="";
  matiere:string="";
  auteur:string="";




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
  route: any;

  constructor(private assignmentsService: AssignmentsService,
    private router: Router,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder

              ) { }

  ngOnInit(): void {
    // Exemple de récupération de ce qui suit le ? dans l'URL
    const nom = this.route.snapshot.queryParams['nom'];
    const age = this.route.snapshot.queryParams['age'];
    // fragment (ce qui suit le # dans l'URL)
    const fragment = this.route.snapshot.fragment;

    console.log("nom: " + nom);
    console.log("age: " + age);
    console.log("fragment: " + fragment);
    console.log(this.route.snapshot.queryParams);

    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans l'url
    // Le + force la conversion en number
    const id:number = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
    .subscribe((assignment) => {
      if(!assignment) return;

      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.note= assignment.note;
      this.remarques= assignment.remarques;
      this.auteur= assignment.auteur;
      this.matiere= assignment.matiere;






    });
  }
  onSaveAssignment() {
    if(!this.nomAssignment ||
      !this.dateDeRendu ||
      !this.note ||
      !this.remarques||
      !this.matiere ||
      !this.auteur



      ) return;
    if(!this.assignment) return;

    // On modifie l'assignment
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.note= this.note;
    this.assignment.remarques= this.remarques;
    this.assignment.matiere= this.matiere;
    this.assignment.auteur= this.auteur;









    // On envoie l'assignment modifié au service
    // qui va faire la requête HTTP
    // On va naviguer vers la page d'accueil
    this.assignmentsService.updateAssignment(this.assignment)
    .subscribe((reponse) => {
      console.log(reponse.message);
      // et on navigue vers la page d'accueil qui affiche
      // la liste des assignments
      this.router.navigate(['assignments'])
      this.toastr.success(' Le devoir a été modifié avec succés ' ,'Félicitation !',
      { positionClass : 'toast-top-right',
      timeOut:5000,
    })
    });
  }
}
