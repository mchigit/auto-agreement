"use client";

import {
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  Textarea,
  Typography,
  Option,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { LeaseFormFields } from "../types";
import { cleanupLeaseFormData, generateLeaseAgreement } from "../utils";
import RichEditor from "./Editor";
import { EditorState } from "draft-js";

const paymentOptions = [
  { value: "Post-dated Cheques", label: "Post-dated Cheques" },
  { value: "EMT", label: "EMT" },
  { value: "Cash", label: "Cash" },
];

export default function LeaseAgreementForm() {
  const [startdate, setStartDate] = useState<Date>(new Date());
  const [partialRentDate, setPartialRentDate] = useState<Date>(new Date());
  const [additionalTerms, setAdditionalTerms] = useState(
    EditorState.createEmpty()
  );

  const [accordions, setAccordions] = useState<Record<string, boolean>>({
    communication: false,
    peopleInfo: false,
    propertyForRent: false,
    parking: false,
    leaseInfo: false,
    partialMonths: false,
    additionalTerms: false,
  });

  const toggleAccordion = (accordion: string) => {
    setAccordions((prev) => ({
      ...prev,
      [accordion]: !prev[accordion],
    }));
  };

  const { register, getValues, control, watch } = useForm<LeaseFormFields>({
    defaultValues: {
      landLordName: [
        {
          first: "",
          last: "",
        },
      ],
      tenantName: [
        {
          first: "",
          last: "",
        },
      ],
      unit: "",
      streetNumber: "",
      streetName: "",
      city: "",
      province: "Ontario",
      postalCode: "",
      isCondoUnit: "",
      parkingSpace: 0,
      parkingFee: 0,
      parkingDescription: "",
      termType: "",
      baseRent: 0,
      payee: "",
      paymentMethod: null,
      tenantInsuranceRequired: true,
      rentDeposit: 0,
      keyDeposit: 0,
      partialMonthRent: null,
      landlordEmail: null,
      landlordPhone: null,
      tenantEmail: null,
      tenantPhone: null,
    },
  });

  const termTypeValue = watch("termType");

  const { fields: landlordFields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "landLordName", // unique name for your Field Array
    rules: {
      required: true,
    },
  });

  const { fields: tenantFields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "tenantName", // unique name for your Field Array
    rules: {
      required: true,
    },
  });

  const onSubmit = async () => {
    const data = getValues();

    const dataForPost = cleanupLeaseFormData(data, startdate);

    await generateLeaseAgreement(dataForPost);
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h3" color="blue-gray">
        Auto-generate Lease Agreement
      </Typography>
      <Typography color="gray" className="mt-2font-normal">
        Fill out the form, and we will generate Ontario Standard Lease Agreement
        based on the information you provided.
      </Typography>
      <form className="mt-12 mb-2 w-full">
        <Accordion open={accordions.peopleInfo} className="mt-6 mb-6">
          <AccordionHeader onClick={() => toggleAccordion("peopleInfo")}>
            Landlord/Tenant Info
          </AccordionHeader>
          <AccordionBody>
            <div className="w-full mt-4 mb-4">
              {landlordFields.map((item, index) => {
                return (
                  <div key={item.id} className="grid grid-cols-2 gap-x-4 ">
                    <Input
                      size="lg"
                      crossOrigin=""
                      label="Landlord First Name"
                      {...register(`landLordName.${index}.first`)}
                    />
                    <Input
                      size="lg"
                      crossOrigin=""
                      label="Landlord Last Name"
                      {...register(`landLordName.${index}.last`)}
                    />
                  </div>
                );
              })}

              <div className="col-span-2 flex justify-end mt-2 mb-6">
                + Add new Landlord
              </div>

              {tenantFields.map((item, index) => {
                return (
                  <div key={item.id} className="grid grid-cols-2 gap-x-4 ">
                    <Input
                      size="lg"
                      crossOrigin=""
                      label="Tenant First Name"
                      {...register(`tenantName.${index}.first`)}
                    />
                    <Input
                      size="lg"
                      crossOrigin=""
                      label="Tenant Last Name"
                      {...register(`tenantName.${index}.last`)}
                    />
                  </div>
                );
              })}

              <div className="col-span-2 flex justify-end mt-2 mb-6">
                + Add new Tenant
              </div>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={accordions.propertyForRent} className="mt-6 mb-6">
          <AccordionHeader onClick={() => toggleAccordion("propertyForRent")}>
            Property For Rent
          </AccordionHeader>
          <AccordionBody>
            <div className="grid grid-cols-4 gap-6 mt-4">
              <Input
                crossOrigin=""
                label="Unit"
                {...register("unit", { required: false })}
              />
              <Input
                crossOrigin=""
                label="Street Number"
                {...register("streetNumber", { required: true })}
              />
              <div className="col-span-2 w-full">
                <Input
                  crossOrigin=""
                  label="Street Name"
                  {...register("streetName", { required: true })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4">
              <Input
                crossOrigin=""
                {...register("city", { required: true })}
                label="City"
              />
              <Input
                crossOrigin=""
                {...register("province", { required: true })}
                label="Province"
              />
              <Input
                crossOrigin=""
                {...register("postalCode", { required: true })}
                label="Postal Code"
              />
            </div>
            <div className="grid grid-cols-4 gap-6 mt-3">
              <Controller
                name="isCondoUnit"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select label="Condo Unit?" {...field}>
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                )}
              ></Controller>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={accordions.communication} className="mt-6 mb-6">
          <AccordionHeader onClick={() => toggleAccordion("communication")}>
            Communication (Optional)
          </AccordionHeader>
          <AccordionBody>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Input
                crossOrigin=""
                label="Landlord Email"
                {...register("landlordEmail", { required: false })}
              />
              <Input
                crossOrigin=""
                label="Landlord Phone"
                {...register("landlordPhone", { required: false })}
              />
              <Input
                crossOrigin=""
                label="Tenant Email"
                {...register("tenantEmail", { required: false })}
              />
              <Input
                crossOrigin=""
                label="Tenant Phone"
                {...register("tenantPhone", { required: false })}
              />
            </div>
            <Typography variant="small" color="black" className="font-bold">
              Address for Giving Notices or Documents to the Landlord
            </Typography>
            <div className="grid grid-cols-4 gap-6 mt-4">
              <Input
                crossOrigin=""
                label="Unit"
                {...register("landLordAddress.unit", { required: false })}
              />
              <Input
                crossOrigin=""
                label="Street Number"
                {...register("landLordAddress.streetNumber", {
                  required: false,
                })}
              />
              <div className="col-span-2 w-full">
                <Input
                  crossOrigin=""
                  label="Street Name"
                  {...register("landLordAddress.streetName", {
                    required: false,
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4">
              <Input
                crossOrigin=""
                {...register("landLordAddress.city", { required: false })}
                label="City"
              />
              <Input
                crossOrigin=""
                {...register("landLordAddress.province", { required: false })}
                label="Province"
              />
              <Input
                crossOrigin=""
                {...register("landLordAddress.postalCode", { required: false })}
                label="Postal Code"
              />
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={accordions.parking} className="mt-6 mb-6">
          <AccordionHeader onClick={() => toggleAccordion("parking")}>
            Parking
          </AccordionHeader>
          <AccordionBody>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <Input
                min={0}
                crossOrigin=""
                type="number"
                label="# of Parking spots"
                {...register("parkingSpace", { required: true })}
              />
              <Input
                min={0}
                crossOrigin=""
                type="number"
                label="Parking Fee/month"
                {...register("parkingFee", { required: false })}
              />
              <div className="col-span-2">
                <Textarea
                  {...register("parkingDescription", { required: false })}
                  label="Parking Description (Optional)"
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={accordions.leaseInfo} className="mt-6 mb-6">
          <AccordionHeader onClick={() => toggleAccordion("leaseInfo")}>
            Lease Info
          </AccordionHeader>
          <AccordionBody>
            <div className="grid grid-cols-3 gap-6 mt-4 items-center">
              <DatePicker
                selected={startdate}
                onChange={(date) => {
                  if (date) setStartDate(date);
                }}
                wrapperClassName="w-full"
                customInput={<Input crossOrigin="" label="Lease Start Date" />}
              />
              <Controller
                name="termType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select label="Lease Terms" {...field}>
                    <Option value="fixed">Fixed Term</Option>
                    <Option value="monthly">Monthly</Option>
                    {/* <Option value="other">Other</Option> */}
                  </Select>
                )}
              ></Controller>
              {termTypeValue === "fixed" ? (
                <DatePicker
                  selected={startdate}
                  onChange={(date) => {
                    if (date) setStartDate(date);
                  }}
                  wrapperClassName="w-full"
                  customInput={<Input crossOrigin="" label="Lease End Date" />}
                />
              ) : null}
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4 items-center">
              <Input
                min={0}
                crossOrigin=""
                type="number"
                label="Rent"
                {...register("baseRent", { required: true })}
              />
              <Input
                crossOrigin=""
                label="Pay to"
                {...register("payee", { required: true })}
              />
              <Controller
                name="paymentMethod"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactSelect
                    placeholder="Payment Method"
                    options={paymentOptions as any}
                    closeMenuOnSelect={false}
                    isMulti
                    {...field}
                  />
                )}
              ></Controller>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4 items-center">
              <Input
                min={0}
                crossOrigin=""
                type="number"
                label="Rent Deposit"
                {...register("rentDeposit", { required: false })}
              />
              <Input
                min={0}
                crossOrigin=""
                type="number"
                label="Key Deposit"
                {...register("keyDeposit", { required: false })}
              />
              <Checkbox
                label="Tenant Insurance Required"
                {...register("tenantInsuranceRequired", { required: true })}
                crossOrigin=""
              />
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion open={accordions.partialMonths} className="mt-6 mb-6">
          <AccordionHeader onClick={() => toggleAccordion("partialMonths")}>
            Partial Months
          </AccordionHeader>
          <AccordionBody>
            <Typography variant="small" color="blue-gray" className="mt-2">
              Ignore if your lease starts on the first of the month.
            </Typography>
            <div className="mt-4 flex flex-col">
              <p>
                If the first rental period (e.g., month) is a partial period,
                the tenant will pay a partial rent of:
              </p>

              <Input
                min={0}
                crossOrigin=""
                type="number"
                label="Partial Month Rent"
                className="mt-2"
                {...register("partialMonthRent", { required: false })}
              />
              <p className="mt-4">on:</p>
              <DatePicker
                selected={partialRentDate}
                onChange={(date) => {
                  if (date) setPartialRentDate(date);
                }}
                wrapperClassName="mt-2"
                customInput={
                  <Input crossOrigin="" label="Partial Month Date" />
                }
              />
              <p className="mt-4">
                This partial rent covers the rental of the unit from
              </p>
              <div>
                <DatePicker
                  selected={partialRentDate}
                  onChange={(date) => {
                    if (date) setPartialRentDate(date);
                  }}
                  wrapperClassName="w-1/3 mt-2 mr-4"
                  customInput={<Input crossOrigin="" label="Covers from" />}
                />
                <DatePicker
                  selected={partialRentDate}
                  onChange={(date) => {
                    if (date) setPartialRentDate(date);
                  }}
                  wrapperClassName="w-1/3 mt-2"
                  customInput={<Input crossOrigin="" label="Covers to" />}
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion open={accordions.additionalTerms} className="mt-6 mb-6">
          <AccordionHeader onClick={() => toggleAccordion("additionalTerms")}>
            Additional Terms
          </AccordionHeader>
          <AccordionBody>
            <Typography variant="small" color="blue-gray" className="mt-2">
              If you wish to include any additional terms to the lease, please
              enter them below.
            </Typography>
            <div className="my-6">
              <RichEditor
                setEditorState={setAdditionalTerms}
                editorState={additionalTerms}
              />
            </div>
          </AccordionBody>
        </Accordion>

        <div className="mt-12 w-full flex items-center justify-center">
          <Button onClick={onSubmit}>Generate Lease Agreement</Button>
        </div>
      </form>
    </Card>
  );
}
