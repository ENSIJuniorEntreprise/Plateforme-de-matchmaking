const byPrefixAndName = {
  fas: {
    briefcase: { prefix: 'fas', iconName: 'briefcase' },
    'dollar-sign': { prefix: 'fas', iconName: 'dollar-sign' },
    rocket: { prefix: 'fas', iconName: 'rocket' },
    'user-group': { prefix: 'fas', iconName: 'user-group' },
  },
}

const FontAwesomeIcon = ({ icon, style }) => {
  if (icon?.prefix === 'fas' && icon?.iconName === 'briefcase') {
    return (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor" aria-hidden="true" style={style}>
        <path d="M9 5.5A2.5 2.5 0 0 1 11.5 3h1A2.5 2.5 0 0 1 15 5.5V7h3.25A1.75 1.75 0 0 1 20 8.75v2.1h-6.75v1a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75v-1H4V8.75A1.75 1.75 0 0 1 5.75 7H9V5.5Zm1.5 0V7h3V5.5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1Z" />
        <path d="M4 12.35h6.75v.9a.75.75 0 0 0 .75.75h1a.75.75 0 0 0 .75-.75v-.9H20v3.15a1.75 1.75 0 0 1-1.75 1.75H5.75A1.75 1.75 0 0 1 4 15.5v-3.15Z" />
      </svg>
    )
  }

  if (icon?.prefix === 'fas' && icon?.iconName === 'dollar-sign') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={style}
      >
        <path d="M12 3.5v17" />
        <path d="M16.3 7.2c0-1.7-1.9-3-4.3-3-2.2 0-4 1.1-4 2.8 0 1.8 1.6 2.6 4.2 3.2 2.8.6 4.5 1.4 4.5 3.4 0 1.8-1.9 3.2-4.5 3.2-2.5 0-4.5-1.3-4.5-3.1" />
      </svg>
    )
  }

  if (icon?.prefix === 'fas' && icon?.iconName === 'rocket') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill="currentColor"
        aria-hidden="true"
        style={style}
      >
        <path d="M14.2 3.2c2.7.2 4.9 2.4 5.1 5.1l-2.5 2.5c-.4.4-.8.9-1 1.5l-.7 2.1a1 1 0 0 1-.6.6l-2.1.7c-.6.2-1.1.6-1.5 1L8.4 19c-2.7-.2-4.9-2.4-5.1-5.1l3.1-3.1c.4-.4.8-.9 1-1.5l.7-2.1a1 1 0 0 1 .6-.6l2.1-.7c.6-.2 1.1-.6 1.5-1l1.9-1.7Z" />
        <path d="M8.6 14.8 5 18.4a.8.8 0 1 0 1.1 1.1l3.6-3.6-1.1-1.1Z" />
        <circle cx="15.3" cy="8.7" r="1.25" fill="#20222C" />
      </svg>
    )
  }

  if (icon?.prefix === 'fas' && icon?.iconName === 'user-group') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="currentColor"
        aria-hidden="true"
        style={style}
      >
        <path d="M8.2 11.3a3.15 3.15 0 1 0 0-6.3 3.15 3.15 0 0 0 0 6.3Z" />
        <path d="M3.7 18.4c0-2.3 2.4-4.25 5.35-4.25s5.35 1.95 5.35 4.25c0 .47-.38.85-.85.85H4.55a.85.85 0 0 1-.85-.85Z" />
        <path d="M16.55 10.35a2.55 2.55 0 1 0 0-5.1 2.55 2.55 0 0 0 0 5.1Z" />
        <path d="M13.8 18.25c.18-1.9 2.13-3.45 4.7-3.45 2.15 0 4 .95 4.7 2.35.32.64-.16 1.4-.88 1.4h-8.52Z" />
      </svg>
    )
  }

  return null
}

const steps = [
  { id: 1, label: 'Type de profil', active: true },
  { id: 2, label: 'Criteres' },
  { id: 3, label: 'Resultats' },
]

const profileOptions = [
  {
    id: 'startup',
    title: 'Startup',
    description: 'Startup innovantes en recherche de talents ou de financement.',
    accent: 'text-[#FF7033]',
    icon: (
      <FontAwesomeIcon
        icon={byPrefixAndName.fas['briefcase']}
        style={{ color: 'rgb(255, 112, 51)' }}
      />
    ),
  },
  {
    id: 'investisseur',
    title: 'Investisseur',
    description: 'Investisseurs et VCs prets a financer votre projet.',
    accent: 'text-[#00FF80]',
    icon: (
      <FontAwesomeIcon
        icon={byPrefixAndName.fas['dollar-sign']}
        style={{ color: 'rgb(0, 255, 128)' }}
      />
    ),
  },
  {
    id: 'incubateur',
    title: 'Incubateur',
    description: "Structures d'accompagnement offrant mentorat.",
    accent: 'text-[#FFEE33]',
    icon: (
      <FontAwesomeIcon
        icon={byPrefixAndName.fas['rocket']}
        style={{ color: 'rgb(255, 238, 51)' }}
      />
    ),
  },
  {
    id: 'talent',
    title: 'Talent',
    description: 'Professionnels qualifies pour rejoindre votre equipe.',
    accent: 'text-[#33BBFF]',
    icon: (
      <FontAwesomeIcon
        icon={byPrefixAndName.fas['user-group']}
        style={{ color: 'rgb(51, 187, 255)' }}
      />
    ),
  },
]

const Matchmaking = () => {
  return (
    <section className="page matchmaking min-h-screen bg-[#20222C] px-6 py-12 text-white sm:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <header className="max-w-4xl text-center">
          <h1 className="text-[2.9rem] font-bold tracking-[-0.03em] text-white sm:text-[4rem] lg:text-[4.25rem]">
            Trouvez votre{' '}
            <span className="bg-linear-to-r from-[#FF7033] to-[#FF9A1D] bg-clip-text text-transparent">
              match parfait
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-snug text-[#8F929F] sm:text-2xl">
            Definissez vos criteres et laissez notre algorithme intelligent trouver les meilleures
            correspondances.
          </p>
        </header>

        <div className="mt-12 flex w-full max-w-5xl items-center justify-between gap-4 overflow-x-auto px-1 pb-2">
          {steps.map((step) => (
            <div key={step.id} className="flex min-w-fit flex-1 items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  step.active ? 'bg-[#FF7033] text-white' : 'bg-[#2F3241] text-[#8F929F]'
                }`}
              >
                {step.id}
              </div>
              <span className={`text-sm font-semibold ${step.active ? 'text-white' : 'text-[#8F929F]'}`}>
                {step.label}
              </span>
              <div className="h-[2px] flex-1 min-w-16 bg-[rgba(143,146,159,0.15)]" />
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-center text-2xl font-semibold sm:text-[2rem]">
          Quel type de profil recherchez-vous?
        </h2>

        <div className="mt-12 grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {profileOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className="group h-[250px] w-full rounded-[2rem] border border-transparent bg-[#2F3241] px-7 py-10 text-center shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#FF7033] hover:bg-[rgba(255,112,51,0.10)]"
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center ${option.accent}`}>
                  {option.icon}
                </div>
                <h3 className="mt-5 text-[2rem] font-semibold leading-none text-white">{option.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#8F929F]">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Matchmaking
