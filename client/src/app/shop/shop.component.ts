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
  shopParams: ShopParams;
  totalCount: number;

  sortOption = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]

  constructor(private shopService: ShopService) {
    this.shopParams = shopService.getShopParams();
   }

  ngOnInit(): void {
    this.getProduct(true);
    this.getBrands();
    this.getTypes();
  }

  getProduct(useCache = false){
    this.shopService.getProducts(useCache)
      .subscribe(response =>{
      this.products = response.data;
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
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProduct();
  }

  onTypeIdSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProduct();
  }

  onSortSelected(sort:string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProduct();
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if(params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProduct(true);
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProduct();
  }

  onRest(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProduct()
  }
}
