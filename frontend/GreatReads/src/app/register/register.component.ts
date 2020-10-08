import { Component, OnInit, EventEmitter, NgZone } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3800/api/upload_image',
    itemAlias: 'image'
  });

  public msg: string;

  public captchaPassed: boolean = false;

  public confirm_pass: string;

  public status: string;
  public reCaptcha: any[];
  public user: User;
  public imgTest: string;

  psswdPattern = "^([a-z](?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{3,})|([A-Z](?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{4,})$";
  mailRgxPattern = "^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,4}$";
  public rgxPswd;


  constructor(
    private auth: AuthService,
    private router: Router) {
    this.user = new User("", "", "", "", "", 1, "", "", "", null, false, null);
  }

  ngOnInit(): void {
    this.rgxPswd = new RegExp(this.psswdPattern);

    this.uploader.onAfterAddingFile = function (item) {
      item.withCredentials = false;

      var fileExtension = '.' + item.file.name.split('.').pop();
      this.imgTest = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
      item.file.name = this.imgTest;
    };

  }




  onSubmit(form) {
    if (this.user.password != this.confirm_pass) {
      this.status = 'error';
      this.msg = 'passwords are not same';
      return;
    }
    if (this.uploader.queue[0] != undefined) {
      this.imgTest = this.uploader.queue[0].file.name;
      this.user.image = this.imgTest;
    } else
      this.user.image = '';
    this.auth.register(this.user).subscribe(
      response => {
        if (response.name && response.username) {
          this.status = 'succes';
          this.uploader.uploadAll();
          form.reset();
          this.router.navigate(['/home']);
        }
        else if (response.username_used) {
          this.msg = 'username alredy in use';
          this.status = 'error';
        } else if (response.mail_used) {
          this.msg = 'mail alredy in use';
          this.status = 'error';
        } else {
          this.status = 'error';
          this.msg = 'something went wrong'
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  async resolved(captchaResponse: string) {
    //console.log(`Resolved response token: ${captchaResponse}`);
    await this.sendTokenToBackend(captchaResponse);
  }


  //function to send the token to the node server
  sendTokenToBackend(tok) {
    //calling the service and passing the token to the service
    this.auth.sendToken(tok).subscribe(
      response => {
        if (response.success)
          this.captchaPassed = true;
        else
          this.status = 'error';
      },
      err => {
        console.log(err)
      },
      () => { }
    );
  }

}
