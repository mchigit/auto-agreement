import axios from "axios";
import { API_URL } from "./constants";
import {
  LeaseAgreementDataType,
  LeaseAgreementTermType,
  LeaseFormFields,
  RentDue,
} from "./types";

import { saveAs } from "file-saver";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const formatTermType = (termType: string) => {
  switch (termType) {
    case "monthly":
      return LeaseAgreementTermType.Monthly;
    case "fixed":
      return LeaseAgreementTermType.Fixed;
    default:
      return LeaseAgreementTermType.Monthly;
  }
};

const formatRentMethod = (
  rentMethod: Array<{
    label: string;
    value: string;
  }>
) => {
  return rentMethod.map((method) => method.value).join(", ");
};

export const cleanupLeaseFormData = (
  data: LeaseFormFields,
  dates: Record<string, Date | null>
): LeaseAgreementDataType => {
  return {
    landlords: data.landLordName.map(
      (landlord) => `${landlord.first} ${landlord.last}`
    ),
    tenants: data.tenantName.map((tenant) => ({
      firstName: tenant.first,
      lastName: tenant.last,
    })),
    unit: data.unit || undefined,
    streetNumber: data.streetNumber,
    streetName: data.streetName,
    city: data.city,
    postalCode: data.postalCode,
    parking: data.parkingSpace.toString() || "0",
    vehicleDescription: data.parkingDescription || undefined,
    isCondo: data.isCondoUnit === "yes",
    // landLordAddress:
    agreementStart: formatDate(new Date()),
    termType: formatTermType(data.termType),
    baseRent: data.baseRent.toString(),
    parkingFee: data.parkingFee.toString() || undefined,
    rentPayeeName: data.payee || undefined,
    rentMethod: data.paymentMethod
      ? formatRentMethod(data.paymentMethod)
      : "Post-dated cheques",
    rentDue: RentDue.First,
    rentDeposit: data.rentDeposit?.toString() || undefined,
    keyDeposit: data.keyDeposit?.toString() || undefined,
    tenantInsuranceNeeded: data.tenantInsuranceRequired || false,
    additionalTerms: data.additionalTerms || [],
    ...dates,
  };
};

export const generateLeaseAgreement = async (data: LeaseAgreementDataType) => {
  try {
    const resp = await axios.post(`${API_URL}/leaseAgreement`, data, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
      },
    });

    // console.log(resp.data);

    // saveAs(resp.data, "lease-agreement.pdf");

    const blob = new Blob([resp.data], {
      type: "application/pdf;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  } catch (error) {
    console.error(error);
  }
};
