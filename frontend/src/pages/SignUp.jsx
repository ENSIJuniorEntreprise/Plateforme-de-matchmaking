import { useState } from "react";
import Formulaire from "./step2";
import Formulaire2 from "./step3";
import Update from "./step4";
import Choose from "./step1";

function ProgressBar({ step }) {
  const totalSteps = 4;
  const percentage = Math.round((step / totalSteps) * 100);

  const widthMap = {
    1: "w-1/4",
    2: "w-2/4",
    3: "w-3/4",
    4: "w-full",
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-sm">Étape {step} sur {totalSteps}</span>
        <span className="text-orange-500 font-semibold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-2">
        <div className={`bg-orange-500 h-2 rounded-full ${widthMap[step]}`}></div>
      </div>
    </div>
  );
}

function FormWizard({ onLogin }) {
  const [step, setStep] = useState(1);

  const [form, setform] = useState({
    role :"",
    Prenom: "",
    Nom: "",
    Email: "",
    Mot_de_passe: "",
    Entreprise: "",
    Localisation: "",
    Lien: "",
    Description: "",
    interests: []
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="bg-[#20222C] w-screen min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-[850px] px-4">
        <ProgressBar step={step} />
        {step === 1 && <Choose form={form} setform={setform} nextStep={nextStep} />}
        {step === 2 && <Formulaire form={form} setform={setform} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Formulaire2 form={form} setform={setform} prevStep={prevStep} nextStep={nextStep}/>}
        {step === 4 && <Update form={form} setform={setform} prevStep={prevStep} onLogin={onLogin} />}
      </div>
    </div>
  );
}
export default FormWizard;