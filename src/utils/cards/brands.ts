import { Ref, ref, watch } from 'vue';
import { Storage } from '@capacitor/storage';

const DEBUG = false;

class Brands {
  brands: Ref<Brand[]>;
  isBrand!: (name: string) => boolean;
  addBrand!: (brand: Brand) => void;
  removeBrand!: (name: string) => void;
  getBrand!: (name: string) => Brand | undefined;
  constructor() {
    this.brands = ref<Brand[]>([
      {
        name: "Pfizer",
        dosesToBeFullyVaccinated: 2
      },
      {
        name: "Moderna",
        dosesToBeFullyVaccinated: 2
      },
      {
        name: "J&J",
        dosesToBeFullyVaccinated: 1
      },
    ])

    Storage.get({ key: 'brands' }).then(resp => {
      if (typeof resp == "object")
        if (typeof resp.value == "string") {
          const brands = JSON.parse(resp.value)
          if (brands.length) this.brands.value = brands
        }
        else DEBUG && console.log('Saved brands not found')
      else DEBUG && console.log('Saved brands not object')
    });
  }

  get allBrands() {
    return this.brands.value;
  }

  get allBrandsNames() {
    return this.brands.value.map(brand => brand.name) as ReadonlyArray<string>;
  }

  get allBrandsForChipSelector() {
    return this.allBrandsNames.map(brand => {
      return {
        value: brand,
        disabled: false
      }
    })
  }

  saveBrands() {
    DEBUG && console.log('Brands changed, saving them')

    Storage.set({
      key: 'brands',
      value: JSON.stringify(this.brands.value)
    })
  }
}

Brands.prototype.isBrand = function (name: string): boolean {
  return this.brands.value.some(brand => brand.name === name);
}

Brands.prototype.getBrand = function (name: string): Brand | undefined {
  return this.brands.value.filter(brand => brand.name === name)[0];

}

Brands.prototype.addBrand = function (brand: Brand): void {
  if (!this.isBrand(brand.name)) this.brands.value.push(brand);
  this.saveBrands();
}

Brands.prototype.removeBrand = function (name: string): void {
  this.brands.value = this.brands.value.filter(brand => brand.name !== name)
  this.saveBrands();
}

export default Brands;

export interface Brand {
  name: string;
  dosesToBeFullyVaccinated: number;
}