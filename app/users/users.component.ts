import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {UsersService} from '/app/users/users.service';

@Component({
    template: `
        <h1>UsersComponent</h1>
        <p>
            <a [routerLink]="['UserForm', { id: 'new' }]" class="btn btn-primary">Add User</a>
        </p>
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#user of users">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td style="text-align: center">
                        <a [routerLink]="['UserForm', { id: user.id, name: user.name }]">
                            <i class="glyphicon glyphicon-edit"></i>
                        </a>
                    </td>
                    <!-- also works, but doesn't show hand with hover -->
                    <!-- <td><i class="glyphicon glyphicon-edit" [routerLink]="['UserForm', { id: 'new' }]"></i></td> -->
                    <td style="text-align: center">
                       <i 
                           (click)="delUser(user.id)" 
                           class="glyphicon glyphicon-remove"i
                           role="button">
                       </i>
                    </td>
                </tr>
            </tbody>
        </table>
        `,
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersService, HTTP_PROVIDERS]

})
export class Users implements OnInit { 
    isLoading = true;
    users;
    newId = "new";

    constructor(private _usersService: UsersService){}

    ngOnInit(){
        this._usersService.getUsers()
            .subscribe(users => {
                this.isLoading = false;
                this.users = users;
                });
    }

    delUser(userId){
        this._usersService.deleteUser(userId)
            .subscribe(res => console.log("response: ", res));
    }
}
