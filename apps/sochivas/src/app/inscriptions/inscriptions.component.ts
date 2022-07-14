import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sochivas-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss'],
})
export class InscriptionsComponent implements OnInit {

  body = {
    full_name: '',
    email: '',
    password: '',
    profile_type: null,
    contact_type: 'Inscripción'
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  register() {
    console.log(this.body);
    this.http.post('/api/users', this.body).subscribe( res => {
      console.log(res);
    });
    this.body = {
      full_name: '',
      email: '',
      password: '',
      profile_type: null,
      contact_type: 'Inscripción'
    }
  }

  setContactType(contact_type: any) {
    this.body.contact_type = contact_type;
  }
}
