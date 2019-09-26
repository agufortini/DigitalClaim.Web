import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titlePage: string;
  subtitlePage: string;

  constructor(private router: Router, private title: Title) {

    this.getDataRoute().subscribe(data => {
      this.titlePage = data.titulo;
      this.subtitlePage = data.subtitulo;
    });

  }

  ngOnInit() {
  }

  getDataRoute() {

    return this.router.events.pipe(

      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)

    );

  }



}
