import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../../services/assignments.service';
import { Assignment } from './assignment.model';

import { AuthService } from '../../services/auth.service'
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des devoirs';
  assignmentSelectionne!: Assignment;
  search!:String;
  assignmentTransmis!: Assignment ;
  searchItem!:string;



  //Pour la pagination
  page!: number;
  limit: number = 20;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;



  assignments: Assignment[] = [];

  constructor(
    private assignmentsService: AssignmentsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}


  ngOnInit(): void {
    this.getAssignments();
  }



  getAssignments() {
    console.log("appelé à l'initialisation du composant");
    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit)
      .subscribe((data: { docs: Assignment[]; page: number; limit: number; totalDocs: number; totalPages: number; hasPrevPage: boolean; prevPage: number; hasNextPage: boolean; nextPage: number; }) => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log('données reçues');
      });
  }

  assignmentClique(assignment: Assignment) {
    console.log('assignmentClique : ' + assignment.nom);
    this.assignmentSelectionne = assignment;
  }


  PeuplerBD(){

    this.assignmentsService.peuplerBD()

         console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES,ON RE-AFFICHE LA LISTE");
         //this.router.navigate(["/home"], {replaceUrl:true});

  }

  

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  pageSuivante() {
    if (this.hasNextPage) {
      this.page = this.nextPage;
      this.getAssignments();
    }
  }

  filtreRendu(){

    console.log("FILTRE RENDU ?");
   
}

  pagePrecedente() {
    if (this.hasPrevPage) {
      this.page = this.prevPage;
      this.getAssignments();
    }
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }
}