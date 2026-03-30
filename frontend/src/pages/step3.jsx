function Formulaire2({ form, setform, nextStep, prevStep }) {
  const setvalues = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="bg-[#222834] p-4 md:p-8 rounded-3xl mt-6 md:mt-15 w-full border border-[#FF6611]">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Votre organisation</h1>
        <h4 className="mb-6 text-[#94A3B8] text-sm">Parlez-nous de votre entreprise ou projet</h4>

        <div className="mb-4">
          <label className="text-white">Entreprise actuelle</label>
          <input
            type="text"
            name="Entreprise"
            placeholder="Ma super startup"
            required
            value={form.Entreprise}
            onChange={setvalues}
            className="w-full p-3 rounded-xl mt-1 placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white"
          />
        </div>

        <div className="mb-4">
          <label className="text-white">Localisation</label>
          <input
            type="text"
            name="Localisation"
            placeholder="Tunis, Tunisie"
            required
            value={form.Localisation}
            onChange={setvalues}
            className="w-full p-3 rounded-xl mt-1 placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white"
          />
        </div>

        <div className="mb-4">
          <label className="text-white">Lien site web ou LinkedIn</label>
          <input
            type="url"
            name="Lien"
            placeholder="www.mystartup.com"
            required
            value={form.Lien}
            onChange={setvalues}
            className="w-full p-3 rounded-xl mt-1 placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white"
          />
        </div>

        <div className="mb-8">
          <label className="text-white">Description</label>
          <textarea
            name="Description"
            placeholder="Décrivez brièvement votre activité"
            required
            value={form.Description}
            onChange={setvalues}
            rows={4}
            className="w-full p-3 rounded-xl mt-1 placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white resize-none"
          />
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

export default Formulaire2;