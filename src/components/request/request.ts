import { Platform, NavController } from 'ionic-angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'request',
  templateUrl: 'request.html'
})
export class RequestComponent {
  dir: boolean

  // this data values come from parent component : admin-orders or cleint orders
  @Input('requestDetails') requestDetails: any
  @Input('requestType') requestType: any
  @Input('userType') userType: any

  @Output() showRequestDetailsEvent = new EventEmitter<any>();


  constructor(private plt: Platform, private navCtrl: NavController, public translate: TranslateService,) {
    console.log('Hello RequestComponent Component');
    this.dir = this.plt.isRTL
  }

  showRequestDetails(request) {
    
    this.showRequestDetailsEvent.emit(request );

    if (this.userType == 'client') {
      this.navCtrl.push('ClientOrderDetailsPage',
        {
          'request_id': request.Request_ID,
          'request_type': this.requestType
        })
    } else if (this.userType == "admin") {

      this.navCtrl.push('AdminOrderDetailsPage',
      {
        'Request_ID':request.Request_ID,
        'Request_type':this.translate.instant(this.requestType)
      })
    }
  }



  ngAfterViewInit() {

   // console.log(JSON.stringify(this.requestDetails))
  //  console.log('request type is ' + this.requestType)
  //  console.log('userType is ' + this.userType)
  }

  ngOnChanges(){
    //console.log('---------component changes----------')
  }

  showDetails(requetsDetails, requestType, userType) {
    if (userType == 'client') {
      this.navCtrl.push('ClientOrderDetailsPage',
        {
          'request_id': requetsDetails.Request_ID,
          'request_type': requestType
        })
    } else if (userType == "admin") {

      this.navCtrl.push('AdminOrderDetailsPage',
      {
        'Request_ID':requetsDetails.Request_ID,
        'Request_type':this.translate.instant(requestType)
      })
    }
  }

  ngOnInit(){
  //  console.log('calling ngOnInit ')
  }

  ngOnDestroy	(){
   // console.log('calling ngOnDestroy	')
  }

  ionViewWillEnter	(){
  //  console.log('calling ionViewWillEnter	')
  }

  ionViewDidEnter	(){
  //  console.log('calling ionViewDidEnter	')
  }

  ionViewWillLeave	(){
    //console.log('caaling ionViewWillLeave	')
  }

  ionViewDidLeave	(){
  //  console.log('calling ionViewDidLeave	')
  }
}
