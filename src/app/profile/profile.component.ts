import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from'@angular/forms';
import {ProductService} from '../product.service'
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  login;
  prod;
  repoprod;
  length;
  nopages
  pagesarray=[]
  currentpage=1;
  finalprod=[];
  constructor(private productservice:ProductService,private router:Router,private activatedroute:ActivatedRoute) { 
    this.login=this.activatedroute.snapshot.params.id
    this.productservice.getProfile(this.login).subscribe((data)=>{
      console.log(data)
      this.prod = data
    })

    this.productservice.getRepos(this.login).subscribe((repodata)=>{
      console.log(repodata)
      this.repoprod=repodata
      this.length=this.repoprod.length;
      if(this.length!=0)
      {
      this.nopages=Math.floor(this.length/10)+1
      if(this.length%10!=0)
      this.nopages+=1
      this.pagesarray=[];
      for(var i=1;i<this.nopages;i++)
      {
        this.pagesarray.push(i)
      }
      this.applyPage();

    }
    })
  }

  ngOnInit(): void {
  }
   myFunction() {
     console.log("filter")
    // Declare variables
    
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    console.log(input.value)
    if(input.value.length !=0)
    this.finalprod=this.repoprod
    if(input.value.length==0)
    {
    
    this.applyPage();
    }
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  applyPage()
{
 
  var start= this.currentpage*10-10;
  var end;
  if(this.pagesarray.includes(this.currentpage+1))
  end = start+10
  else
  {
    if(this.length%10==0)
    {
      end = start+10
    }
    else
    end = start+this.length%10
  }
  console.log(start)
  console.log(end)
  this.finalprod=[]
  for(var i=start;i<end;i++)
  {
    this.finalprod.push(this.repoprod[i])
  }

}
setCurrentPage(pagenumber)

{
  this.currentpage= pagenumber;
  this.applyPage();


}

}
