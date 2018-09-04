import { Component, OnInit} from '@angular/core';
import { NgxSmartLoaderService } from 'ngx-smart-loader';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.sass']
})
export class InboxComponent implements OnInit {
  constructor(
    private loader: NgxSmartLoaderService,
  ) { }

  ngOnInit() {
    this.loader.stop('appLoader')
  }
}
