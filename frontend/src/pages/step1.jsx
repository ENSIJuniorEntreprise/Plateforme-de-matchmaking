import { useState } from "react";

const options = [
  {
    id: "startup",
    label: "StartUp",
    description: "Je cherche des talents ou des investisseurs.",
    borderColor: "border-orange-500",
    bgColor: "bg-[#F97316]",
    img: "/startup.png",
  },
  {
    id: "talent",
    label: "Talent",
    description: "Je cherche des opportunités dans des StartUps.",
    borderColor: "border-cyan-400",
    bgColor: "bg-[#33BBFF]",
    img: "/talent.png",
  },
  {
    id: "investisseur",
    label: "Investisseur",
    description: "Je cherche des talents ou des StartUps.",
    borderColor: "border-green-400",
    bgColor: "bg-[#00FF80]",
    img: "/investisseur.png",
  },
  {
    id: "incubateur",
    label: "Incubateur",
    description: "Je souhaite accompagner et soutenir des Startups.",
    borderColor: "border-yellow-400",
    bgColor: "bg-[#FFEE33]",
    img: "/incubat.png",
  },
];

export default function Choose({ nextStep, form, setform }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    setform((prev) => ({ ...prev, role: id }));
  };

  return (
    <div className="bg-[#222834] p-8 rounded-2xl mt-15 w-[900px] ">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Bienvenue sur <span className="text-[#F97316]">MatchHub</span>
        </h1>
        <p className="text-[#94A3B8] text-sm">
          Qui êtes-vous ? Cela nous aidera à personnaliser votre expérience.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`relative flex flex-col items-center text-center p-4 rounded-4xl border-2 cursor-pointer transition-all duration-200
                ${isSelected
                  ? `${option.borderColor} ${option.bgColor} scale-105`
                  : `${option.borderColor} bg-[#222834] hover:bg-[#222834]/80`
                }`}
            >
              <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                ${isSelected ? "border-white bg-white/20" : "border-gray-600"}`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>

              <img
                src={option.img}
                className="w-22 h-22 object-contain mb-3 mt-2"
              />

              <h3 className={`font-bold text-sm mb-1 ${isSelected ? "text-black" : "text-white"}`}>
                {option.label}
              </h3>
              <p className={`text-xs leading-snug ${isSelected ? "text-black/70" : "text-gray-400"}`}>
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={nextStep}
          disabled={!selected}
          className={`border border-[#F97316] text-white px-6 py-2 rounded-[10px] transition
            }`}
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}