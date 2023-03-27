import { Injectable } from '@angular/core';
import { UUID } from './uuid';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  uuid : UUID | undefined;
  constructor() { }
}
