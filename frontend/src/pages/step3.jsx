function Formulaire2({ form, setform, nextStep, prevStep }) {
  const setvalues = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    
        <div className="bg-[#222834] p-8 rounded-3xl w-[600px] border border-[#FF6611]">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-2 text-white ">Votre organisation</h1>
        <h4 className="mb-6 text-[#94A3B8] text-sm">Parlez-nous de votre entreprise ou projet</h4>

        <div className="">
          <label htmlFor="Entreprise" className="text-white">Entreprise actuelle</label><br /><input
            type="text"
            name="Entreprise"
            placeholder="Ma super startup"
            required
            value={form.Entreprise}
            onChange={setvalues}
            className="p-3 rounded-xl mb-3 mt-1 placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white w-[300px]"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Localisation" className="text-white">Localisation</label><br /><input
            type="text"
            name="Localisation"
            placeholder="Tunis, Tunisie"
            required
            value={form.Localisation}
            onChange={setvalues}
            className="p-3 rounded-xl mb-1 mt-1 placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white w-[300px]"
          />
        </div>

        <div className="">
          <label htmlFor="Lien" className="text-white">Lien site web ou LinkedIn</label><br />
          <input
            type="text"
            name="Lien"
            placeholder="www.mystartup.com"
            required
            value={form.Lien}
            onChange={setvalues}
            className="w-[400px] mb-3 mt-1 p-3 rounded-xl placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white"
          />
        </div>

        <div className="">
          <label htmlFor="Description" className="text-white">Description</label><br /><input
            type="text"
            name="Description"
            placeholder="Décrivez brièvement votre activité"
            required
            value={form.Description}
            onChange={setvalues}
            className="w-[400px] mb-8 mt-1 h-[100px] pb-13 pl-3 rounded-xl placeholder-[#9093A3] border border-[#E5E7EB4D] focus:border-orange-500 focus:outline-none bg-[#333B4A] text-white "
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="text-white px-6 py-2 rounded-[10px] border border-orange-500 hover:bg-orange-500 transition w-[125px]"
          >
            ← Retour
          </button>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-[10px] "
          >
            Continuer →
          </button>
        </div>
      </form>
    </div>

  
    
  );
}

export default Formulaire2;