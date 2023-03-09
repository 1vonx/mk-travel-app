import { CampsService } from './../../../../service/camps/camps.service';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CAMPS } from 'src/app/data/camps';
import { Camp } from 'src/app/models/camp';

@Component({
  selector: 'app-camp-detail',
  templateUrl: './camp-detail.component.html',
  styleUrls: ['./camp-detail.component.css']
})
export class CampDetailComponent {
  camps: Camp[] = CAMPS;
  camp?: Camp;
  categories?: any;
  
  startDate: string | undefined;
  endDate: string | undefined;
  iframeSrc: string | undefined
  trustedUrl: SafeUrl | undefined

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private service: CampsService) {
    this.camp = this.service.getCampById(route.snapshot.paramMap.get('id')!);
    this.categories = this.camp?.categories.split(',');
    this.iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=17.638549804687504%2C40.204050425113294%2C24.1754150390625%2C42.956422511073335&amp&layer=mapnik&marker=${this.camp?.longitude}%2C${this.camp?.latitude}`
    this.trustedUrl = this.sanitizeUrl(this.iframeSrc);

    if (this.router.getCurrentNavigation()?.extras.state) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { startDate: string, endDate: string };
      this.startDate = state?.startDate
      this.endDate = state?.endDate
      // this.startDate = new Date(this.startDate)
      // this.endDate = new Date(this.endDate)
      // let difference = date_2.getTime() - this.startDate.getTime()
      // let days = Math.abs(Math.ceil(difference / (1000 * 3600 * 24)));

      // this.cars.forEach(car => {
      //   car.totalPrice = days * car.priceForADay
      //   car.totalRating = (car.sumRating/car.numReviews).toPrecision(3)
      //  })
    } else {
      // todo
    }
  }

  sanitizeUrl(original: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(original);
  }

}
