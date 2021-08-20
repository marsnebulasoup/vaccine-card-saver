export const inputs = {
  lastName: 'Smith',
  firstName: 'John',
  middleInitial: 'R',
  patientNumber: '1234567890',
  fullyVaccinated: true,
  doses: [
    {
      doseNumber: "First",
      brand: "Pfizer",
      administeredByOrAt: "Dr. Sammy Sample",
      lot: "XX0001"
    },
    {
      doseNumber: "Second",
      brand: "Pfizer",
      administeredByOrAt: "Dr. Sammy Sample",
      lot: "XX0002"
    },
    {
      doseNumber: "Other",
      brand: "Pfizer",
      administeredByOrAt: "Dr. Sammy Sample",
      lot: "XX0003"
    },
  ]
}


export const differentInputs = {
  lastName: 'Different',
  firstName: 'Ian',
  middleInitial: 'Q',
  patientNumber: '0987654321',
  fullyVaccinated: true, // tests will not edit the fully vaccinated checkbox currently, so it must be the same as in `inputs`
  doses: [
    {
      doseNumber: "Second",
      brand: "Moderna",
      administeredByOrAt: "Barber Joe",
      lot: "XX0001"
    },
    {
      doseNumber: "First",
      brand: "Moderna",
      administeredByOrAt: "Barber Joe",
      lot: "XX0002"
    },
    {
      doseNumber: "Other",
      brand: "Moderna",
      administeredByOrAt: "Barber Joe",
      lot: "XX0003"
    },
  ]
}