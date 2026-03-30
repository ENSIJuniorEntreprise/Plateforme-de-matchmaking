import { useState } from "react";

function Formulaire({ form, setform, nextStep, prevStep }) {
  const [cvName, setCvName] = useState(null);

  const setvalues = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleCV = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvName(file.name);
      setform({ ...form, CV: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="bg-[#222834] p-4 md:p-8 rounded-2xl mt-6 md:mt-15 w-full border border-[#FF6611]">
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl md:text-2xl font-bold mb-1 text-white">Créez votre compte</h1>
        <h4 className="mb-6 text-[#94A3B8] text-sm">Quelques informations pour commencer</h4>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-white font-semibold">Nom</label>
            <input
              type="text"
              name="Nom"
              placeholder="Jean"
              required
              value={form.Nom}
              onChange={setvalues}
              className="p-3 rounded-xl placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-white font-semibold">Prénom</label>
            <input
              type="text"
              name="Prenom"
              placeholder="Dupont"
              required
              value={form.Prenom}
              onChange={setvalues}
              className="p-3 rounded-xl placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-white font-semibold">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="jean@startup.com"
              required
              value={form.Email}
              onChange={setvalues}
              className="p-3 rounded-xl placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-white font-semibold">CV</label>
            <label className="p-3 rounded-xl border border-[#E5E7EB4D] bg-[#333B4A] cursor-pointer flex items-center gap-2">
              {cvName ? (
                <span className="text-[#F97316] truncate"> {cvName}</span>
              ) : (
                <span className="text-[#9093A3]">Déposez votre CV</span>
              )}
              <input name="CV" type="file" onChange={handleCV} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label className="text-white font-semibold">Mot de passe</label>
          <input
            type="password"
            name="Mot_de_passe"
            placeholder="***********"
            required
            minLength={6}
            value={form.Mot_de_passe}
            onChange={setvalues}
            className="p-3 rounded-xl placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white"
          />
          <span className="text-xs text-[#94A3B8] mt-1">Minimum 6 caractères</span>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="text-white px-6 py-2 rounded-[10px] border border-orange-500 hover:bg-orange-500 hover:scale-105 cursor-pointer transition"
          >
            ← Retour
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-[10px] hover:scale-105 cursor-pointer transition"
          >
            Continuer →
          </button>
        </div>
      </form>
    </div>
  );
}

export default Formulaire;