import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService} from '../services/dish.service'
import { Promotion } from '../shared/promotion';
import { PromotionService} from '../services/promotion.service'
import { Leader } from '../shared/leader';
import { LeaderService} from '../services/leader.service'
import { flyInOut,expand } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]  
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leader!: Leader;
  dishErrMess!:string;
  promotionErrMess!:string;
  leaderErrMess!:string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmess => this,this.dishErrMess = <any>this.dishErrMess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      errmess => this,this.promotionErrMess = <any>this.promotionErrMess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader =leader,
      errmess => this,this.leaderErrMess = <any>this.leaderErrMess);
  }

}
