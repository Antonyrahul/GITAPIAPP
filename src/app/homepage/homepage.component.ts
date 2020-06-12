import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from'@angular/forms';
import {ProductService} from '../product.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  searchform;
  prod;
  finalprod = [];
  length;
  nopages;
  pagesarray =[];
  currentpage =1;
    constructor(private productservice:ProductService) {
      this.searchform = new FormGroup({
        
        searchtext:new FormControl('',[Validators.required]),
        filter:new FormControl('',[Validators.required])
       
       
        
      })
     }
  
  ngOnInit(): void {
  }
  processdata()
  {
    this.currentpage=1
    console.log("in")
    if(this.searchform.valid)
    console.log(this.searchform.value)
    this.productservice.getSearchResult(this.searchform.value).subscribe((data)=>{
      console.log(data)
      console.log(data.items)
      this.prod=data.items
      this.length=this.prod.length;
      this.nopages=Math.floor(this.length/10)+1
      if(this.length%10!=0)
      this.nopages+=1
      this.pagesarray=[];
      for(var i=1;i<this.nopages;i++)
      {
        this.pagesarray.push(i)
      }
      this.applyPage();


  })
}

setCurrentPage(pagenumber)

{
  this.currentpage= pagenumber;
  this.applyPage();


}
applyPage()
{
 
  var start= this.currentpage*10-10;
  
  if(this.pagesarray.includes(this.currentpage+1))
  var end = start+10
  else
  {
    end = start+this.length%10
  }
  console.log(start)
  console.log(end)
  this.finalprod=[]
  for(var i=start;i<end;i++)
  {
    this.finalprod.push(this.prod[i])
  }

}


}
