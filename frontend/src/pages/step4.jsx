import { useState } from "react";

function Update({ prevStep, form, setform }) {
  const domains = [
    "Tech", "FinTech", "HealthTech", "EdTech", "GreenTech", "AI/ML",
    "Ecommerce", "SaaS", "Crypto/Web", "Gaming", "LegalTech", "FoodTech", "AgriTech"
  ];

  const [selected, setSelected] = useState(form.interests || []);

  const domselect = (item) => {
    let domsel;
    if (selected.includes(item)) {
      domsel = selected.filter(i => i !== item);
    } else {
      domsel = [...selected, item];
    }
    setSelected(domsel);
    setform({ ...form, interests: domsel });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="bg-[#222834] p-4 md:p-8 mt-6 md:mt-15 rounded-2xl w-full border border-[#FF6611]">
      <form onSubmit={submit}>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Vos centres d'intérêt</h1>
        <h4 className="mb-6 text-[#94A3B8] text-sm">Sélectionnez les secteurs qui vous intéressent</h4>

        <div className="flex flex-wrap gap-2 mb-4">
          {domains.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => domselect(item)}
              className={`px-3 py-1 rounded border cursor-pointer hover:scale-105 transition ${
                selected.includes(item)
                  ? "bg-[#FF6611] text-white border-[#FF6611]"
                  : "bg-[#2D3548] text-white border-[#94A3B8]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="mb-4 text-[#94A3B8] text-center">{selected.length} secteur(s) sélectionné(s)</p>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={prevStep}
            className="text-white px-6 py-2 rounded-[10px] border border-orange-500 hover:bg-orange-500 hover:scale-105 cursor-pointer transition"
          >
            ← Retour
          </button>
          <button
            type="submit"
            disabled={selected.length === 0}
            className="bg-orange-500 text-white px-6 py-2 rounded-[10px] hover:scale-105 cursor-pointer transition "
          >
            Créer mon compte
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;