import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoadingComponent } from "../loading/loading.component";
import { CBEsService } from '../../services/CBEs.service';
import CBEs from '../../models/CBEs';
import Response from '../../models/response';
@Component({
  selector: 'cbescreate-page',
  standalone: true,
  templateUrl: './cbescreate.component.html',
  styleUrls: ['./cbescreate.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, LoadingComponent],
  providers: [DatePipe],
})
export class CBEsCreateComponent implements OnInit{
  id : number | undefined = 0
  datafromapi = false
  CBEs = new CBEs
  constructor(private router: Router,
    private route: ActivatedRoute,
    private cbesService : CBEsService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam !== null ? +idParam : 0; // Convert string to number
      console.log('id receive : ', this.id);
    });

    if(this.id != 0 && this.id != undefined && this.id != null){
      this.cbesService.GetByID(this.id).subscribe((result:Response)=>{
        this.CBEs = result.data
        console.log("✉ DATA FATCH API :" , this.CBEs)
        this.datafromapi = true
      })
    }else{
      this.datafromapi = true
    }
  }

  onSubmit(){
    console.log("login button work !")
  }
}
