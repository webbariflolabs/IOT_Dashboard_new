import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css']
})
export class LoginPasswordComponent implements OnInit {
  
  
  isPasswordVisible = false;

  inputType='password'

  togglePassword(){

    this.isPasswordVisible = !this.isPasswordVisible;

   

    this.inputType=this.isPasswordVisible?'text' : 'password';

   

  }

  // loginForm:FormGroup;
  mobileno: any;
  password: any;
  hero: any;
  users:any;
  headers:any;
  errorMsg:boolean= false;

  email:any;

  constructor(private router:Router,private snackBar: MatSnackBar, private formBuilder: FormBuilder,private authService: AuthenticationService, private http:HttpClient, private dataSharingService: DataSharingService){
      // this.loginForm=this.formBuilder.group({
      //   mobileno:['',[Validators.required]],
      //   password:['',[Validators.required]]
      // })
 
  }
  ngOnInit(): void {
   const checkInput= (this.dataSharingService.getLogMob())
 
  
   if (typeof checkInput === "string" && /^\d+$/.test(checkInput)){
      this.mobileno = parseInt(checkInput);
      console.log(this.mobileno)

   }
   else{
    this.mobileno = this.dataSharingService.getLogMob();
   }



  }
  // getcsrf(){
  //   this.http.get("http://192.168.0.113:8000/get_csrf/").subscribe(
  //   (res) => {this.users=res;
  //             const csrfToken=this.users.csrf_token;
  //             console.log(csrfToken)
  //             this.headers = new HttpHeaders(
  //                          {'Content-Type':'application/json',
  //                           'X-CSRFToken':csrfToken,
  //                          });
  // })
  // console.log(this.headers)
  // return this.headers;
  // }

  value: string = 'hello';

  updateValue(newValue: string): void {
    this.value = newValue;
  }

  onBlur(): void {
    this.value = 'Noooo';
  }

  // onMobileNext(){
  //   console.log(this.mobileno);
  //   this.router.navigate(['./login-password'])
  // }

  onSubmit(){
         /* console.log(this.getcsrf());
          this.http.post("http://192.168.0.113:8000/login/",this.loginForm.value,{headers:this.headers}).subscribe(
                   (res)=>{console.log(res);
                           this.router.navigate(['dashboard'])})
            */
                           console.log(this.mobileno)

                          console.log(this.password)
                          
                  
                            this.authService.login(this.mobileno, this.password)
                              .subscribe(response => {
                                console.log(response)
                                // Handle successful login and navigation
                                if (response.message === "Login Successfull For 3D Admin" || response.message === "Login Successfull For waterbody Admin" || response.message === "Login Successfull For aqua Admin"){
                                  localStorage.setItem('logMob',JSON.stringify(response.mobno))
                                  this.dataSharingService.loginSetMob(response.mobno)
                                  console.log(response);
                                  this.router.navigate(['./admin-users'])
                                  this.errorMsg = false;
                                  const userName = response.username
                                  const UserDataSet = {userName}
                                  localStorage.setItem('userData',JSON.stringify(UserDataSet))

                                }
                                else if (response.message === "Login Successfull For 3D User" || response.message === "Login Successfull For waterbody User" || response.message === "Login Successfull For aqua User" )
                                
                               {
                                  localStorage.setItem('logMob',JSON.stringify(response.mobno))
                                  this.router.navigate(['./dashboard'])
                                  this.errorMsg = false;
                                  this.dataSharingService.setData(response.mobno)
                                  const userName=response.username
                                  const UserDataSet={mobileno:response.mobno,userName}
                                  localStorage.setItem('userData',JSON.stringify(UserDataSet))
                                  
                                }
                                else{
                                  // localStorage.setItem('logMob',JSON.stringify(mobileno))
                                  // this.dataSharingService.loginSetMob(mobileno)
                                  // this.router.navigate(['./dashboard'])
                                  alert(response.error)
                                  this.router.navigate(['./login'])
                                  this.errorMsg = true;
                                }
                               
                              },
                              error => {
                                // Handle login error
                                console.log(error);
                              });
                          
          }}

