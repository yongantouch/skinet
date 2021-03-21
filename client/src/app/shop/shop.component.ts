import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{ static: false }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams;
  totalCount: number;

  sortOption = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getBrands();
    this.getTypes();
  }

  getProduct(){
    this.shopService.getProducts(this.shopParams)
      .subscribe(response =>{
      this.products = response.data;
      this.shopParams.pageNumber = response.index;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(repsonse =>{
      this.brands = [{id:0, name: 'All'}, ...repsonse];
    }, error => {
      console.log(error);
    });
  }
  getTypes(){
    this.shopService.getTypes().subscribe(repsonse =>{
      this.types = [{id:0, name: 'All'}, ...repsonse];
    }, error => {
      console.log(error);
    });
  }

  onBrandIdSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onTypeIdSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onSortSelected(sort:string){
    this.shopParams.sort = sort;
    this.getProduct();
  }

  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProduct();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onRest(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProduct()
  }
}
