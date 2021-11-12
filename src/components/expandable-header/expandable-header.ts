import { Component, Input, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;

  newHeaderHeight: any;

  constructor(public element: ElementRef, public renderer: Renderer) {

  }

  ngOnChanges(){
  console.log('haeder height is ...'+this.headerHeight)
  }

  ngOnInit(){

    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.scrollArea.ionScroll.subscribe((ev) => {
      console.log('ionscroll event : '+JSON.stringify(ev))
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev){

    ev.domWrite(() => {

      this.newHeaderHeight = this.headerHeight - ev.scrollTop;
       console.log('new header height  :  '+this.newHeaderHeight)
       
      if(this.newHeaderHeight < 0){
        this.newHeaderHeight = 0;
      }   

      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');

      console.log('this.element.nativeElement.children  : '+JSON.stringify(this.element.nativeElement.children))

      for(let headerElement of this.element.nativeElement.children){
        console.log('header element all object : '+JSON.stringify(headerElement))
        console.log('headerElement.offsetTop :  '+headerElement.offsetTop)
        console.log('headerElement.clientHeight : '+headerElement.clientHeight)
       
        let totalHeight =  headerElement.clientHeight - headerElement.offsetTop;

        if(totalHeight > this.newHeaderHeight && !headerElement.isHidden){
          headerElement.isHidden = true;
          this.renderer.setElementStyle(headerElement, 'opacity', '0');
        } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
          headerElement.isHidden = false;
          this.renderer.setElementStyle(headerElement, 'opacity', '1');
        }

      }

      

    });

  }

}