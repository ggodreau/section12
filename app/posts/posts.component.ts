import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {PostsService} from '/app/posts/posts.service';
import {Spinner} from '/app/shared/spinner.component';

@Component({
    template: `
        <h1>PostsComponent</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <spinner [isVisible]="isLoading"></spinner>
                    <ul *ngIf="!isLoading" class="list-group">
                        <li *ngFor="#post of posts" class="list-group-item">{{ post.title }}</li>
                    </ul>
                </div>
                <div class="col-md-6 col-lg-3">
                    {{ posts | json }} 
                </div>
            </div>
        </div>
        `
        ,
    directives: [ROUTER_DIRECTIVES, Spinner],
    providers: [PostsService, HTTP_PROVIDERS]

})
export class Posts implements OnInit { 
    isLoading = true;
    posts: array;

    constructor(private _postsService: PostsService){}

    ngOnInit(){
        this._postsService.getPosts()
            .subscribe(res => {
                console.log("posts: ", res);
                this.posts = res;
                this.isLoading = false;});
    }

}
