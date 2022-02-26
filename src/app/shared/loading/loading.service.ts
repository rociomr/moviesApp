import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * MainLoaderService
 */
@Injectable()
export class LoadingService {

  /**
   * loader BehaviorSubject
   */
  loader$ = new BehaviorSubject<any>({ show: false });

  /**
   * Constructor
   */
  constructor() { }

  /**
   * To get a observable of loader BehaviorSubject
   * 
   * @returns Observable<any>
   */
  public getSubscription(): Observable<any> {
    return this.loader$.asObservable();
  }

  /**
   * Emit true value show
   */
  public showLoader(): void {
      console.warn("showww")
    this.loader$.next({ show: true });
  }

  /**
   * Emit false value show
   */
  public hideLoader(): void {
    this.loader$.next({ show: false });
  }

}