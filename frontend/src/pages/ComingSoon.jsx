// Placeholder partagé pour les destinations pas encore construites (settings, verify-email, ...).
// Évite qu'un lien retombe silencieusement sur l'accueil en attendant la page réelle.
export default function ComingSoon({ title = 'Bientôt disponible', onNavigate }) {
  return (
    <div
      className="font-inter flex w-full items-center justify-center bg-[#161822] px-4 text-center"
      style={{ minHeight: 'calc(100vh - 90px)' }}
    >
      <div>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(255,84,11,0.15)] text-2xl">
          🚧
        </div>
        <h1 className="mb-2 text-2xl font-extrabold text-white">{title}</h1>
        <p className="mb-6 max-w-sm text-sm font-medium text-[#8A8FA8]">
          Cette fonctionnalité est en cours de construction et arrivera prochainement.
        </p>
        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="cursor-pointer rounded-[50px] bg-[#FF540B] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#e84a00]"
        >
          Retour au dashboard
        </button>
      </div>
    </div>
  )
}
