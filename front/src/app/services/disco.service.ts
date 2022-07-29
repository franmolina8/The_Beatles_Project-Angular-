import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscosService {

  constructor(private httpClient: HttpClient) { }

  public discoData = {
    id: "",
    author: "",
    title: "",
    year: "",
    cover: ""
  }
  public cartaData = {
    id: "test",
    author: "test",
    title: "",
    year: "",
    cover: ""

  }


  public getDiscos() {
    return this.httpClient.get("http://localhost:3000/albums")
  }

  public clearDisco() {
    this.discoData = {
      id: "",
      author: "",
      title: "",
      year: "",
      cover: ""
    }
  }
  public postDisco(newDisco: any) {
    return this.httpClient.post("http://localhost:3000/albums", newDisco)
  }

  public putDisco(discoID: any, editedDisco: any) {
    return this.httpClient.put("http://localhost:3000/albums/" + discoID, editedDisco)
  }

  public deleteDisco (discoID: any){
    this.discoData = discoID;
   return this.httpClient.delete("http://localhost:3000/albums/" + discoID)
    
  }
  public editItem(item: any) {
    this.discoData = item;
  }
  public soloUno(discoId:any){
    return this.httpClient.get("http://localhost:3000/albums/" + discoId)
  }

}


