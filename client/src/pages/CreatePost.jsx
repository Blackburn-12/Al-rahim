import React, { useState } from "react";
import { Loader, Navbar, Footer } from "../components/index";
import {
  EventSelectionForm,
  ProductDetailsForm,
  ProblemDiscussionForm,
  RcaFor6MsForm,
  CorrectiveActionForm,
  PreventiveActionForm,
} from "../components/index";
import { useDispatch } from "react-redux";

const CreatePost = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rootCause: "",
    causeCategory: "",
    customer: "",
    brand: "",
    productType: "",
    towelType: "",
    article: "",
    size: "",
    color: "",
    design: "",
    productId: "",
    sos: "",
    customerPO: "",
    dateOccurred: "",
    problemStatement: "",
    containmentAction: "",
    memberRCA: "",
    method: [""],
    material: [""],
    machine: [""],
    manpower: [""],
    measurement: [""],
    milieu: [""],
    detection: "",
    occurrence: "",
    correctiveActionDate: "",
    preventiveActionDate: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <>
      <Navbar />
      <div className="">
        <div>
          {step === 1 && (
            <EventSelectionForm
              formData={formData}
              setFormData={setFormData}
              navigate={nextStep}
            />
          )}
          {step === 2 && (
            <ProductDetailsForm
              formData={formData}
              setFormData={setFormData}
              navigate={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <ProblemDiscussionForm
              formData={formData}
              setFormData={setFormData}
              navigate={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 4 && (
            <RcaFor6MsForm
              formData={formData}
              setFormData={setFormData}
              navigate={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 5 && (
            <CorrectiveActionForm
              formData={formData}
              setFormData={setFormData}
              navigate={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 6 && (
            <PreventiveActionForm
              formData={formData}
              setFormData={setFormData}
              prevStep={prevStep}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
