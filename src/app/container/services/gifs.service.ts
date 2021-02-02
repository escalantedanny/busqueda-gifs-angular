import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _hitorial: string[] = [];
  private apikey:string = 'BRVhYZcN2IRdRRwWasj9nzUYFLlRibOM';
  private urlGif:string = 'https://api.giphy.com/v1/gifs/search';
  private limit:number=15;

  public resultados: Gif[] = [];
  
  public get historial() : string[ ] {
    this._hitorial = this._hitorial.splice(0,10);
    return [...this._hitorial];
  }


  constructor( private http:HttpClient) {
    if( localStorage.getItem('historial' ) ){
      this._hitorial = JSON.parse( localStorage.getItem('historial')! )
    }
    if( localStorage.getItem('resultados' ) ){
      this.resultados = JSON.parse( localStorage.getItem('resultados')! )
    }
  }

  buscarGifs( query:string ){

    query = query.trim().toLowerCase();
    if ( !this._hitorial.includes( query )  ) {
      this._hitorial.unshift( query );
      this._hitorial = this._hitorial.splice(0,10);
      localStorage.setItem( 'historial', JSON.stringify( this._hitorial ) );
    }

    const params = new HttpParams()
        .set( 'api_key', this.apikey )
        .set( 'limit', this.limit.toString() )
        .set( 'q', query );

    this.http.get<SearchGifsResponse>(`${this.urlGif}`, { params }).subscribe( (resp: SearchGifsResponse) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados) );
    })

  }
  
}
