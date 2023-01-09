import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../../services/assignments.service';
import { Assignment } from './assignment.model';

import { AuthService } from '../../services/auth.service'



@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs";
  assignmentSelectionne!:Assignment;
  search!:String;

  assignments:Assignment[] = [];


  page: number=1;
  limit: number=10;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;

  constructor(private assignmentsService:AssignmentsService,private router: Router,
    private authService:AuthService) { }

   ngOnInit(): void {
    console.log("appelé à l'initialisation du composant");
    this.assignmentsService.getAssignments()
    .subscribe(assignments => this.assignments = assignments);


    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });

  }


  assignmentClique(assignment:Assignment){
    console.log("assignmentClique : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }
  PeuplerBD(){

    this.assignmentsService.peuplerBD()

         console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES,ON RE-AFFICHE LA LISTE");
         //this.router.navigate(["/home"], {replaceUrl:true});

  }
   premierePage() {
    this.router.navigate(['/assignments'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
    /*
    this.page = this.nextPage;
    this.getAssignments();*/
    this.router.navigate(['/assignments'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/assignments'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/assignments'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

}
