import { Injectable, ɵɵNgOnChangesFeature } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../components/assignments/assignment.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments } from '../shared/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  assignments:Assignment[] = []
  Matieres = [{
    "imgMat": "https://robohash.org/laboreodiomaiores.png?size=50x50&set=set1",
    "intitulé": "TechnoWeb",
    "imgProf": "https://robohash.org/voluptateetpraesentium.png?size=50x50&set=set1"
    },
    {
      "imgMat": "https://robohash.org/laboreodiomaiores.png?size=50x50&set=set1",
      "intitulé": "Bases de données",
      "imgProf": "https://robohash.org/voluptateetpraesentium.png?size=50x50&set=set1"
      },
      {
        "imgMat": "https://robohash.org/laboreodiomaiores.png?size=50x50&set=set1",
        "intitulé": "Grails",
        "imgProf": "https://robohash.org/voluptateetpraesentium.png?size=50x50&set=set1"
        },
        {
          "imgMat": "https://robohash.org/laboreodiomaiores.png?size=50x50&set=set1",
          "intitulé": "Gestion de projet",
          "imgProf": "https://robohash.org/voluptateetpraesentium.png?size=50x50&set=set1"
          }, ];
  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  uri = "https://api-back-mean.herokuapp.com/api/assignments";

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }


  getAssignment(id:number):Observable<Assignment|undefined> {
    /*const a:Assignment|undefined =
           this.assignments.find(a => a.id === id);

    return of(a);*/
    return this.http.get<Assignment>(`${this.uri}/${id}`)

    .pipe(map(a => {
      a.nom +="";
      return a;
    }),
    tap(_ => {
      console.log("tap: assignment avec id =" +id + "requête GET envoyée sur mongo cloud");
  }),
  catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
  );

  }
  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri+"?page="+page + "&limit="+limit);
  }
  private handleError<T>(operation: string , result?:T){
    return(error:any) : Observable<T> => {
      console.log(error);
      console.log(operation + "a échoué " + error.message);

      return of(result as T)
    };
  }
  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    // ex utilisation du service de log
    this.loggingService.log(assignment.nom, "ajouté");

    //return of("Assignment ajouté");
    return this.http.post(this.uri, assignment, this.httpOptions);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*const position = this.assignments.indexOf(assignment);
    this.assignments.splice(position,1);
  */
      // ex utilisation du service de log
      this.loggingService.log(assignment.nom, "supprimé");

    //return of("Assignment supprimé");
    return this.http.delete<string>(`${this.uri}/${assignment._id}`);

  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // Rien à faire pour le moment, plus tard
    // il faudra faire une requête HTTP PUT
    // sur un web service distant etc.

      // ex utilisation du service de log
      this.loggingService.log(assignment.nom, "modifié");


    //return of("Assignment modifié");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  peuplerBD() {
    bdInitialAssignments.forEach((a: {
      note: string;
      remarques: string;
      matiere: string;
      auteur: string;
      id: number;
      nom: string;
      dateDeRendu: string | number | Date;
      rendu: boolean;
}) => {

      //const randomMatieres = Math.floor(Math.random()*this.Matieres.length)
      let nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarques = a.remarques;
      nouvelAssignment.matiere = a.matiere;
      //nouvelAssignment.matiere = this.Matieres[randomMatieres];
      nouvelAssignment.auteur = a.auteur;

      this.addAssignment(nouvelAssignment)
      .subscribe(msg => {
        console.log(msg);
      })
    })
  }
}
