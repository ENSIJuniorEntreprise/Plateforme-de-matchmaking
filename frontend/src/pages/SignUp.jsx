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
    <section className="page signup">
      <h2>Sign Up</h2>
      
    </section>
  )
}

export default SignUp
