import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IUser } from "./User";
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    // specify the url
    private usersUrl = 'https://localhost:5001/Users';

    getUsers(): Observable<IUser[]> {
        // We call the pip method to specify a set of operator
        return this.http.get<IUser[]>(this.usersUrl).pipe(
            tap(d => console.log('response' , JSON.stringify(d))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        console.log(err);
        return throwError(errorMessage);
    }
}