import { AssignmentsComponent } from './components/assignments/assignments.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';




// import auth guards for secure routes

import { AuthGuard } from './services/auth.guard';

// router module

import { RouterModule , Routes} from '@angular/router';


// import services

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AddAssignmentComponent } from './components/assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './components/assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './components/assignments/edit-assignment/edit-assignment.component';


const appRoutes : Routes = [

  {path:'',component: HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'register',component: RegisterComponent},
  {path:'login',component: LoginComponent},
  {path:'sidebar',component: SidebarComponent},

  {path:'assignments',component: AssignmentsComponent,canActivate: [AuthGuard]},
  {
    path: 'add',
    component: AddAssignmentComponent
  },
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent
  },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate:[AuthGuard]
  } // peut avoir acces que si l'utilisateur est connecté

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AssignmentsComponent,
    HomeComponent,
    EditAssignmentComponent,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    SidebarComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule,
    MatCheckboxModule, MatSlideToggleModule,
    FormsModule  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
