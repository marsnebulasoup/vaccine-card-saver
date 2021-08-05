import Brands from './brands';
import { capitalizeFirstLetter, DateUtils } from "@/utils/other"


export class VaccineCard {
  id: number;
  name: string;
  dob: string;
  dobFormatted: string;
  patientNumber: string;
  fullyVaccinated: boolean;
  doses: VaccineDose[];
  constructor(
    { id, lastName, firstName, middleInitial, dob, patientNumber, fullyVaccinated, doses }:
      { id: number; lastName: string; firstName: string; middleInitial: string; dob: string; patientNumber?: string; fullyVaccinated: boolean; doses: VaccineDose[]; }
  ) {
    this.id = id;
    this.name = this.#processName(lastName, firstName, middleInitial);
    this.dob = DateUtils.isDate(dob) ? dob : "N/A";
    this.dobFormatted = DateUtils.formatDate(dob);
    this.patientNumber = patientNumber || "N/A";
    this.fullyVaccinated = fullyVaccinated;
    this.doses = doses;
  }

  #processName(last: string, first: string, middle: string) {
    first = capitalizeFirstLetter(first).trim();
    last = capitalizeFirstLetter(last).trim();

    // Capitalizes and adds a period to the end of the first initial of the middle name
    // Note that this adds a space to the end so that if it is added to `name`, it will be formatted properly
    middle = `${middle.slice(0, 1)}${middle.length ? '.' : ''} `.toLocaleUpperCase();

    return `${first} ${middle !== "" ? middle : ""}${last}`;
  }

  get FormattedCard() {
    const card: Card = {
      id: 2345,
      name: this.name,
      dob: this.dob,
      dobFormatted: this.dobFormatted,
      patientNumber: this.patientNumber,
      fullyVaccinated: this.fullyVaccinated,
      doses: this.doses.map(dose => dose.FormattedDose)
    }
    return card
  }

}

export class VaccineDose {
  doseNumber: Dose["doseNumber"];
  brand: string;
  date: string;
  lot: string;
  dateFormatted: string;
  administeredByOrAt: string;
  constructor(
    { doseNumber, brand, date, administeredByOrAt, lot }:
      { doseNumber: Dose["doseNumber"]; brand: string; date: string; administeredByOrAt: string; lot: string; }
  ) {
    this.doseNumber = doseNumber;
    this.brand = this.#processBrands(brand)
    this.date = date;
    this.dateFormatted = DateUtils.formatDate(date)
    this.administeredByOrAt = administeredByOrAt;
    this.lot = lot || "N/A"
  }

  #processBrands(brand: string) {
    const { isBrand } = new Brands();
    return isBrand(brand) ? brand : "N/A"
  }

  get FormattedDose() {
    const dose: Dose = {
      doseNumber: this.doseNumber,
      brand: this.brand,
      date: this.date,
      dateFormatted: this.dateFormatted,
      administeredByOrAt: this.administeredByOrAt,
      lot: this.lot
    }
    return dose;
  }
}


// Interfaces

export interface Card {
  id: number; // TODO: figure out how to work with these ids
  name: string;
  dob: string;
  dobFormatted: string;
  patientNumber: string;
  fullyVaccinated: boolean;
  doses: Dose[];
}

export interface Dose {
  doseNumber: "1" | "2" | "Other"; // Hardcoded for now since the design of the card would have to change to add more doses
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