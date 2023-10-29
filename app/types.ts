export enum LeaseAgreementTermType {
  Fixed = "Choice1",
  Monthly = "Choice2",
  Others = "Choice3",
}

export enum RentDue {
  First = "First",
  Second = "Second",
  Last = "Last",
}

export type LeaseAgreementDataType = {
  landlords: string[];
  tenants: {
    firstName: string;
    lastName: string;
  }[];
  unit?: string;
  streetNumber: string;
  streetName: string;
  city: string;
  postalCode: string;
  parking?: string;
  vehicleDescription?: string;
  isCondo: boolean;
  landLordAddress?: {
    unit?: string;
    streetNumber: string;
    streetName: string;
    city: string;
    postalCode: string;
    province: string;
  };
  landlordEmail?: string;
  tenantEmail?: string;
  landlordPhone?: string;
  tenantPhone?: string;
  agreementStart: string;
  termType: LeaseAgreementTermType;
  timeEnding?: string;
  baseRent: string;
  parkingFee?: string;
  rentPayeeName?: string;
  rentMethod?: string;
  rentDue: RentDue;
  partialMonth?: {
    partialRent: string;
    partialRentDate: string;
    coveredFrom: string;
    coveredTo: string;
  };
  rentDeposit?: string;
  keyDeposit?: string;
  tenantInsuranceNeeded?: boolean;
  additionalTerms?: string[];
  utilityIncluded: boolean;
  features?: string[];
};

export type LeaseFormFields = {
  landLordName: {
    first: string;
    last: string;
  }[];
  tenantName: {
    first: string;
    last: string;
  }[];
  additionalTerms: {
    value: string;
  }[];
  unit: string;
  streetNumber: string;
  streetName: string;
  city: string;
  province: string;
  postalCode: string;
  isCondoUnit: string;
  parkingSpace: number;
  parkingFee: number;
  parkingDescription: string;
  termType: string;
  baseRent: number;
  payee: string;
  paymentMethod: Array<{
    label: string;
    value: string;
  }> | null;
  tenantInsuranceRequired: boolean;
  rentDeposit: number;
  keyDeposit: number;
  partialMonthRent: null | number;
  landlordEmail: null | string;
  landlordPhone: null | string;
  tenantEmail: null | string;
  tenantPhone: null | string;
  landLordAddress?: {
    unit?: string;
    streetNumber: string;
    streetName: string;
    city: string;
    postalCode: string;
    province: string;
  };
};
