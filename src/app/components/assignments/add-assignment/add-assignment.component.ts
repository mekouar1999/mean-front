import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Assignment } from '../assignment.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

// Pour le formulaire
nomDevoir = "";
dateDeRendu!:Date;
nomEleve = "";
Remarque = "";

  constructor(private assignmentsService:AssignmentsService,
              private router: Router,
              private toastr: ToastrService

              ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("onSubmit : " + this.nomDevoir +
                " date de rendu : " + this.dateDeRendu);

    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.id = Math.floor(Math.random()*1000);
    // le tableau est chez le papa comment faire ?
    //this.assignments.push(nouvelAssignment);

    //this.nouvelAssignment.emit(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe((reponse) => {
      console.log(reponse.message);


      this.router.navigate(['assignments'])
      this.toastr.success(' Le devoir a été ajouté avec succés ' ,'Félicitation !',
      { positionClass : 'toast-top-right',
      timeOut:5000,
    })


      ;});




  }

}
