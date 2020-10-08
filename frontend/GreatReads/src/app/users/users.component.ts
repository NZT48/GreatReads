import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users;

  public sName: string;
  public sSurname: string;
  public sUsername: string;
  public sMail: string;
  public srchName: string;
  public srchSurname: string;
  public srchUsername: string;
  public srchMail: string;

  public searched: boolean;
  public exist: boolean;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.exist = true;
    this.searched = false;
    this.auth.getUsers().subscribe(
      response => {
        this.users = response;
      }
    )
  }

  search() {
    this.searched = true;
    this.exist = false;
    this.srchUsername = this.sUsername;
    this.srchSurname = this.sSurname;
    this.srchName = this.sName;
    this.srchMail = this.sMail;
    this.users.forEach(user => {
      if (((this.srchName != undefined && this.srchName != "") ? user.name.toLowerCase().includes(this.srchName.toLowerCase()) : true)
        && ((this.srchSurname != undefined && this.srchSurname != "") ? user.surname.toLowerCase().includes(this.srchSurname.toLowerCase()) : true)
        && ((this.srchUsername != undefined && this.srchUsername != "") ? user.username.toLowerCase().includes(this.srchUsername.toLowerCase()) : true)
        && ((this.srchMail != undefined && this.srchMail != "") ? user.email.toLowerCase().includes(this.srchMail.toLowerCase()) : true)) {
        this.exist = true;
      }
    });
  }

  checkForSearch(user) {
    if (!this.searched) {
      return true;
    } else {
      if (((this.srchName != undefined && this.srchName != "") ? user.name.toLowerCase().includes(this.srchName.toLowerCase()) : true)
        && ((this.srchSurname != undefined && this.srchSurname != "") ? user.surname.toLowerCase().includes(this.srchSurname.toLowerCase()) : true)
        && ((this.srchUsername != undefined && this.srchUsername != "") ? user.username.toLowerCase().includes(this.srchUsername.toLowerCase()) : true)
        && ((this.srchMail != undefined && this.srchMail != "") ? user.email.toLowerCase().includes(this.srchMail.toLowerCase()) : true)) {
        return true;
      } else
        return false;
    }
  }

}
