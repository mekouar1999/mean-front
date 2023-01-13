export class Assignment {
  static nom(nom: any) {
    throw new Error('Method not implemented.');
  }
  _id?:string;
  id!:number;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  note!: string;
  remarques!: string;
  matiere!: string;
  imgProf!:String;
  imgMatiere!:String;
  //matiere!: { imgMat: string; intitulé: string; imgProf: string; };
  auteur!: string;

}
export class Matieres {
  intitulé!: string;
  imgMat!: string;
  imgProf!: string;

}
