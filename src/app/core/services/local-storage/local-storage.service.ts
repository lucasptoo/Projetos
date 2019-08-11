import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private keys = {
    key: 'aux.teste',
    key2: 'aux.teste2'
  };

  constructor() { }

  public set(obj: any) {
    localStorage.setItem(this.keys.key, 'OBJETO');
  }

  public get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
