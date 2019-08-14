import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public set(obj: any, key: string) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  public get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
