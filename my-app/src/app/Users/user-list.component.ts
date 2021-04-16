import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "./User";
import { UserService } from "./user.service";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    // providers: [UserService]
})

export class UserListComponent implements OnInit,  OnDestroy {
    pageTitle: string = "User List Title";
    filteredUser: IUser[] = []; 
    users: IUser[] = [];
    phoneNumberVisible : boolean = false;
    errMessage: string = '';
    private _listFilter: string = '';
    sub: Subscription;

    constructor(private userService: UserService) {
    }

    get listFiler(): string {
        return this._listFilter;
    }

    set listFiler(value: string){
        this._listFilter = value;
        // Adding the filtration process 
        this.filteredUser = this.performFiltration(value);
    }

    // Defining a new method
    showNumbers(): void {
        this.phoneNumberVisible = !this.phoneNumberVisible;
    }

    ngOnInit(): void {
        console.log("I am loading on ngOnInit");
        this.listFiler = '';
        
        // here we assign the users variable with the values that our service provide
        this.userService.getUsers().subscribe({
            next: users => {
                this.users = users;

                // since we are binding to our filtered users we need to make the user list available
                this.filteredUser = this.users;
            },
            error: err => this.errMessage = err
        });
        
        
    }

    performFiltration(filterBy: string) : IUser[] {
        filterBy = filterBy.toLowerCase();
        return this.users.filter((user: IUser) => user.fullName.toLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string) : void {
        this.pageTitle = 'User list ' + message;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}