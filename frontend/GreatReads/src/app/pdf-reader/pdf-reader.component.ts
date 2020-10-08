import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../global';



@Component({
  selector: 'app-pdf-reader',
  templateUrl: './pdf-reader.component.html',
  styleUrls: ['./pdf-reader.component.css']
})
export class PdfReaderComponent implements OnInit {

  public page = 1;
  public name: string;
  public pageLabel: string;
  public url: string;
  public bookName: string;


  constructor(
    private route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }



  ngOnInit(): void {

    this.bookName = this.route.snapshot.paramMap.get('name');

    this.name = this.url + "get_pdf/" + this.bookName;

  }


}
