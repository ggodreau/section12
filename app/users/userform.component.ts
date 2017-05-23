import {Component, OnInit, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES, CanDeactivate, Router, RouteParams} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {CustomValidators} from '/app/shared/customvalidators';
import {HTTP_PROVIDERS} from 'angular2/http';
import {UsersService} from '/app/users/users.service';

@Component({
    templateUrl: '/app/users/userform.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersService, HTTP_PROVIDERS]
})
export class UserForm implements CanDeactivate, OnInit { 
    signupForm: ControlGroup;
    submitted = false;
    @Input() routeParams = [];

    constructor(
        fb: FormBuilder, 
        private _usersService: UsersService,
        private _router: Router,
        private _routeParams: RouteParams){
            this.signupForm = fb.group({
                name: ['', Validators.required],
                email: ['', Validators.compose([
                       Validators.required,
                       CustomValidators.validateEmail,
                       CustomValidators.isBlank
                       ])],
                phone: [],
                address: fb.group({
                    street: [],
                    suite: [],
                    city: [],
                    zipcode: []
                })
            });
    }

    log(x){
        console.log(x);
    }

    submit(){
    //        console.log(this.signupForm);
        this.submitted = true;
        console.log(this.signupForm.value);
        this._usersService.postUsers(this.signupForm.value)
            .subscribe(x => { 
                console.log("new ID of user is:", JSON.stringify(x));
                console.log("returned");
                this._router.navigate(['Users']);});
    }

    routerCanDeactivate(next, previous){
        if(this.signupForm.dirty)
            return confirm("Are you sure?");
    }

    ngOnInit(){
        console.log(this._routeParams.params.id);
        this.routeParams = this._routeParams.params;
    }

}
