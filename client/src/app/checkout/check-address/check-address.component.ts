import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-check-address',
  templateUrl: './check-address.component.html',
  styleUrls: ['./check-address.component.scss']
})
export class CheckAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value).subscribe(()=>{
      this.toastr.success('Address saved');
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }
}
