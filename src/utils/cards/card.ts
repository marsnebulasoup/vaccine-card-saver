import Brands from './brands';
import { capitalizeFirstLetter, DateUtils } from "@/utils/other"
import { DoseNumbers } from '../other/DoseNumbersHandler';

const BRANDS = new Brands();


export function FormatVaccineCard(card: Card) {
  let { id, lastName, firstName, middleInitial, dob, patientNumber, fullyVaccinated, doses } = card
  firstName = capitalizeFirstLetter(firstName).trim();
  lastName = capitalizeFirstLetter(lastName).trim();

  // Capitalizes and adds a period to the end of the first initial of the middle name
  // Note that this adds a space to the end so that if it is added to `name`, it will be formatted properly
  middleInitial = `${middleInitial.slice(0, 1)}${middleInitial.length ? '. ' : ''}`.toLocaleUpperCase();

  card = {
    id: id,
    lastName: lastName,
    firstName: firstName,
    middleInitial: middleInitial,
    name: `${firstName} ${middleInitial || ""}${lastName}`,
    dob: DateUtils.isDate(dob) ? dob : "N/A",
    dobFormatted: DateUtils.formatDate(dob),
    patientNumber: patientNumber || "N/A",
    fullyVaccinated: fullyVaccinated,
    doses: doses,
  }
  return card
}



export class VaccineDose {
  id: number;
  doseNumber: string;
  brand: string;
  date: string;
  lot: string;
  dateFormatted: string;
  administeredByOrAt: string;
  constructor(
    { id, doseNumber, brand, date, administeredByOrAt, lot }:
      { id: number; doseNumber: string; brand: string; date: string; administeredByOrAt: string; lot: string }
  ) {
    this.id = id;
    this.doseNumber = doseNumber //this.processDoseNumber(doseNumber) || "N/A"
    this.brand = this.processBrands(brand)

    const isDate = DateUtils.isDate(date);
    this.date = isDate ? isDate.toISOString() : "";

    const formattedDate = DateUtils.formatDate(date)
    this.dateFormatted = formattedDate === "N/A" ? "" : formattedDate
    this.administeredByOrAt = administeredByOrAt || "";
    this.lot = lot || "";
  }

  processDoseNumber(doseNumber: string) {
    return Object.keys(DoseNumbers).includes(doseNumber)
      ? DoseNumbers[doseNumber as keyof typeof DoseNumbers]
      : undefined
  }

  processBrands(brand: string) {
    return BRANDS.isBrand(brand) ? brand : ""
  }

  get FormattedDose() {
    // const processedDoseNumber = this.processDoseNumber(this.doseNumber);
    const dose: Dose = {
      id: this.id,
      doseNumber: this.doseNumber as DoseNumbers || "N/A", //processedDoseNumber ? processedDoseNumber : DoseNumbers.Other,//this.doseNumber !== "N/A" ? this.doseNumber as DoseNumbers : DoseNumbers.Other,
      brand: this.brand || "N/A",
      date: this.date || "N/A",
      dateFormatted: this.dateFormatted || "N/A",
      administeredByOrAt: this.administeredByOrAt || "N/A",
      lot: this.lot || "N/A"
    }
    return dose;
  }
}


// Interfaces
export interface Card {
  id: number; 
  lastName: string;
  firstName: string;
  middleInitial: string;
  name: string;
  dob: string;
  dobFormatted: string;
  patientNumber: string;
  fullyVaccinated: boolean;
  doses: Dose[];
}



export interface Dose {
  id: number;
  doseNumber: DoseNumbers; // Hardcoded for now since the design of the card would have to change to add more doses
  brand: string;
  date: string;
  dateFormatted: string;
  administeredByOrAt: string;
  lot: string;
}




// Sample Card
// {
//   name: "Joel K. Foster",
//   dob: "2021-07-31T17:01:25.051Z",
//   dobFormatted: "7/31/2021",
//   fullyVaccinated: false,
//   patientNumber: "2837529873894",
//   doses: [
//     {
//       doseNumber: "1",
//       brand: "Pfizer",
//       date: "",
//       dateFormatted: "5/12/21",
//       administeredByOrAt: "CVS9999",
//       lot: "KS2384",
//     },
//   ],
// };