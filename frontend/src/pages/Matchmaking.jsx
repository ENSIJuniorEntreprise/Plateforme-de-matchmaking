import { useEffect, useRef, useState } from 'react'

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
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor" aria-hidden="true" style={style}>
        <path d="M14.2 3.2c2.7.2 4.9 2.4 5.1 5.1l-2.5 2.5c-.4.4-.8.9-1 1.5l-.7 2.1a1 1 0 0 1-.6.6l-2.1.7c-.6.2-1.1.6-1.5 1L8.4 19c-2.7-.2-4.9-2.4-5.1-5.1l3.1-3.1c.4-.4.8-.9 1-1.5l.7-2.1a1 1 0 0 1 .6-.6l2.1-.7c.6-.2 1.1-.6 1.5-1l1.9-1.7Z" />
        <path d="M8.6 14.8 5 18.4a.8.8 0 1 0 1.1 1.1l3.6-3.6-1.1-1.1Z" />
        <circle cx="15.3" cy="8.7" r="1.25" fill="#20222C" />
      </svg>
    )
  }

  if (icon?.prefix === 'fas' && icon?.iconName === 'user-group') {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true" style={style}>
        <path d="M8.2 11.3a3.15 3.15 0 1 0 0-6.3 3.15 3.15 0 0 0 0 6.3Z" />
        <path d="M3.7 18.4c0-2.3 2.4-4.25 5.35-4.25s5.35 1.95 5.35 4.25c0 .47-.38.85-.85.85H4.55a.85.85 0 0 1-.85-.85Z" />
        <path d="M16.55 10.35a2.55 2.55 0 1 0 0-5.1 2.55 2.55 0 0 0 0 5.1Z" />
        <path d="M13.8 18.25c.18-1.9 2.13-3.45 4.7-3.45 2.15 0 4 .95 4.7 2.35.32.64-.16 1.4-.88 1.4h-8.52Z" />
      </svg>
    )
  }

  return null
}

const profileOptions = [
  {
    id: 'startup',
    title: 'Startup',
    description: 'Startup innovantes en recherche de talents ou de financement.',
    accent: 'text-[#FF7033]',
    icon: (
      <FontAwesomeIcon
        icon={byPrefixAndName.fas.briefcase}
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
        icon={byPrefixAndName.fas.rocket}
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

const sectorOptions = [
  'AgriTech',
  'Cybersecurite',
  'E-commerce',
  'EdTech',
  'FinTech',
  'GreenTech',
  'HealthTech',
  'Intelligence Artificielle',
  'IoT',
  'Marketplace',
  'SaaS',
]
const stages = ['Pre-seed', 'Seed', 'Serie A', 'Serie B', 'Croissance']
const locationOptions = [
  'Africa',
  'Europe',
  'France',
  'Germany',
  'MENA',
  'Remote',
  'Tunisia',
  'UAE',
  'UK',
  'USA',
  'WorldWide',
]
const budgetRanges = ['0-10M DT', '10M-50M DT', '50M-100M DT', '100M+ DT']
const budgetWidths = ['25%', '50%', '75%', '100%']
const resultMatches = [
  {
    id: 'techflow',
    name: 'TechFlow AI',
    location: 'Paris',
    description: "Solution d'automatisation des workflows par IA generative",
    tags: ['AI/ML', 'SaaS', 'Serie A'],
    avatarLabel: 'T',
    avatarClass: 'bg-[radial-gradient(circle_at_top,#d6e8ff_0%,#b4c7e8_45%,#6b85a9_100%)]',
    badgeIcon: byPrefixAndName.fas.briefcase,
    badgeColor: 'bg-[#FF7033]',
  },
  {
    id: 'sophie',
    name: 'Sophie Chen',
    location: 'Remote',
    description: 'Senior Full-Stack Developer, 8 ans d experience React/Node',
    tags: ['React', 'Node.js', 'TypeScript'],
    avatarLabel: 'SC',
    avatarClass: 'bg-[radial-gradient(circle_at_top,#ffd8ea_0%,#f4abc7_45%,#b66d89_100%)]',
    badgeIcon: byPrefixAndName.fas['user-group'],
    badgeColor: 'bg-[#33BBFF]',
  },
  {
    id: 'techangels',
    name: 'TechAngels',
    location: 'Europe',
    description: 'Business angels investissant dans l innovation tech.',
    tags: ['Pre-seed', 'Tech', 'Serie A'],
    avatarLabel: 'TA',
    avatarClass: 'bg-[radial-gradient(circle_at_top,#d7f4ff_0%,#94d7e9_45%,#4d8ca1_100%)]',
    badgeIcon: byPrefixAndName.fas['dollar-sign'],
    badgeColor: 'bg-[#00FF80]',
  },
  {
    id: 'jackma',
    name: 'Jack Ma',
    location: 'WorldWide',
    description: 'Offre hebergement (bureaux, coworking), conseil et mentorat.',
    tags: ['Tech', 'Finance', 'Seed'],
    avatarLabel: 'JM',
    avatarClass: 'bg-[radial-gradient(circle_at_top,#e1d7ff_0%,#8d7ef1_45%,#3d348f_100%)]',
    badgeIcon: byPrefixAndName.fas.rocket,
    badgeColor: 'bg-[#FFEE33]',
  },
]

const SparklesIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="m12.6 3.8.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8.8-2.3Z" />
    <path d="m18.1 8.9.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z" />
    <path d="m6.9 10.2.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
  </svg>
)

const WrenchIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.5 5.5a3.6 3.6 0 0 0 4.1 4.7l-7.9 7.9a2 2 0 1 1-2.8-2.8l7.9-7.9a3.6 3.6 0 0 0-1.3-4.1Z" />
    <path d="m15.8 8.2 2-2" />
  </svg>
)

const DollarIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5v17" />
    <path d="M16.2 7.1c0-1.7-1.8-2.9-4.2-2.9-2.2 0-3.9 1.1-3.9 2.7 0 1.8 1.5 2.5 4.1 3.1 2.8.6 4.5 1.4 4.5 3.4 0 1.8-1.9 3.2-4.5 3.2-2.5 0-4.4-1.2-4.4-3" />
  </svg>
)

const PinIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20s5-5.2 5-9a5 5 0 1 0-10 0c0 3.8 5 9 5 9Z" />
    <circle cx="12" cy="11" r="1.6" />
  </svg>
)

const ChevronDownIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const ArrowLeftIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const SearchIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.2-4.2" />
  </svg>
)

const FilterIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5c0 .34-.12.67-.34.92L14 13v4.25a.75.75 0 0 1-.4.66l-2 1A.75.75 0 0 1 10.5 18v-5L4.34 7.42A1.5 1.5 0 0 1 4 6.5Z" />
  </svg>
)

const Matchmaking = () => {
  const [currentStep, setCurrentStep] = useState(2)
  const [selectedProfile, setSelectedProfile] = useState('startup')
  const [activeStage, setActiveStage] = useState('')
  const [selectedSectors, setSelectedSectors] = useState([])
  const [isSectorMenuOpen, setIsSectorMenuOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState([])
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false)
  const [budgetIndex, setBudgetIndex] = useState(0)
  const sectorMenuRef = useRef(null)
  const locationMenuRef = useRef(null)

  const clearFilters = () => {
    setActiveStage('')
    setSelectedSectors([])
    setIsSectorMenuOpen(false)
    setSelectedLocations([])
    setIsLocationMenuOpen(false)
    setBudgetIndex(0)
  }

  const toggleSector = (sector) => {
    setSelectedSectors((current) =>
      current.includes(sector) ? current.filter((item) => item !== sector) : [...current, sector]
    )
  }

  const toggleLocation = (location) => {
    setSelectedLocations((current) =>
      current.includes(location) ? current.filter((item) => item !== location) : [...current, location]
    )
  }

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (sectorMenuRef.current && !sectorMenuRef.current.contains(event.target)) {
        setIsSectorMenuOpen(false)
      }

      if (locationMenuRef.current && !locationMenuRef.current.contains(event.target)) {
        setIsLocationMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  const steps = [
    {
      id: 1,
      label: 'Type de profil',
      status: currentStep === 1 ? 'active' : 'done',
    },
    {
      id: 2,
      label: 'Criteres',
      status: currentStep === 2 ? 'active' : currentStep > 2 ? 'done' : 'upcoming',
    },
    {
      id: 3,
      label: 'Resultats',
      status: currentStep === 3 ? 'active' : 'upcoming',
    },
  ]

  const stepCircleClass = {
    done: 'bg-[#FF7033] text-white',
    active: 'bg-[#FF7033] text-white',
    upcoming: 'bg-[#2F3241] text-[#8F929F]',
  }

  const stepTextClass = {
    done: 'text-white',
    active: 'text-white',
    upcoming: 'text-[#8F929F]',
  }

  const stepLineClass = {
    done: 'bg-[#FF7033]',
    active: 'bg-[rgba(143,146,159,0.15)]',
    upcoming: 'bg-[rgba(143,146,159,0.15)]',
  }

  return (
    <section className="page matchmaking min-h-screen bg-[#20222C] px-5 py-10 text-white sm:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <header className="max-w-4xl text-center">
          <h1 className="text-[2.9rem] font-bold tracking-[-0.03em] text-white sm:text-[4rem] lg:text-[4.25rem]">
            Trouvez votre{' '}
            <span className="bg-linear-to-r from-[#FF7033] to-[#FF9A1D] bg-clip-text text-transparent">
              match parfait
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-snug text-[#8F929F] sm:text-[1.65rem]">
            Definissez vos criteres et laissez notre algorithme intelligent trouver les meilleures
            correspondances.
          </p>
        </header>

        <div className="mt-10 flex w-full max-w-5xl items-center justify-between gap-4 overflow-x-auto px-2 pb-2">
          {steps.map((step) => (
            <div key={step.id} className="flex min-w-fit flex-1 items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${stepCircleClass[step.status]}`}>
                {step.id}
              </div>
              <span className={`text-sm font-semibold ${stepTextClass[step.status]}`}>{step.label}</span>
              <div className={`h-[2px] min-w-16 flex-1 ${stepLineClass[step.status]}`} />
            </div>
          ))}
        </div>

        {currentStep === 1 ? (
          <>
            <h2 className="mt-14 text-center text-2xl font-semibold sm:text-[2rem]">
              Quel type de profil recherchez-vous?
            </h2>

            <div className="mt-12 grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
              {profileOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedProfile(option.id)
                    setCurrentStep(2)
                  }}
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
          </>
        ) : currentStep === 2 ? (
          <>
            <h2 className="mt-12 text-center text-[2rem] font-semibold text-white">Affinez votre recherche</h2>

            <div className="relative mt-8 w-full rounded-[2rem] bg-[#343848] px-5 pb-5 pt-10 shadow-[0_28px_60px_rgba(0,0,0,0.18)] sm:px-8 sm:pb-7 sm:pt-12">
              <button
                type="button"
                onClick={clearFilters}
                className="absolute right-4 top-[-12px] flex items-center gap-2 rounded-full bg-[#A3A7B3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#B1B5C0]"
              >
                Effacer tout
                <ChevronDownIcon className="h-4 w-4 -rotate-90" />
              </button>

              <div className="rounded-[1.65rem] border border-[rgba(143,146,159,0.5)] bg-[#434656] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3 text-white">
                  <SparklesIcon className="h-5 w-5 text-[#FF7033]" />
                  <h3 className="text-[1.15rem] font-semibold sm:text-[1.8rem]">Secteurs d'activite</h3>
                </div>
                <div ref={sectorMenuRef} className="relative mt-5">
                  <button
                    type="button"
                    onClick={() => setIsSectorMenuOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-[1.3rem] bg-[#2F3241] px-4 py-3 text-left shadow-[inset_0_-2px_0_rgba(255,112,51,0.15)]"
                  >
                    <div className="flex flex-wrap gap-2">
                      {selectedSectors.length > 0 ? (
                        selectedSectors.map((sector) => (
                          <span
                            key={sector}
                            className="rounded-full bg-[#3C4150] px-4 py-1.5 text-xs font-semibold text-white"
                          >
                            {sector}
                          </span>
                        ))
                      ) : (
                        <span className="px-2 py-1.5 text-sm font-medium text-[#8F929F]">
                          Choisir le(s) secteur(s)
                        </span>
                      )}
                    </div>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 text-[#FF7033] transition ${isSectorMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isSectorMenuOpen ? (
                    <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-20 rounded-[1.3rem] border border-[rgba(143,146,159,0.35)] bg-[#2F3241] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.28)]">
                      <div className="flex flex-wrap gap-2">
                        {sectorOptions.map((sector) => {
                          const isSelected = selectedSectors.includes(sector)

                          return (
                            <button
                              key={sector}
                              type="button"
                              onClick={() => toggleSector(sector)}
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                isSelected
                                  ? 'bg-[#FF7033] text-white'
                                  : 'bg-[#3C4150] text-white hover:bg-[#494F60]'
                              }`}
                            >
                              {sector}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                <div className="rounded-[1.65rem] border border-[rgba(143,146,159,0.5)] bg-[#434656] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3 text-white">
                    <WrenchIcon className="h-5 w-5 text-[#FF7033]" />
                    <h3 className="text-[1.15rem] font-semibold sm:text-[1.8rem]">Stade de developpement</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {stages.map((stage) => {
                      const isActive = stage === activeStage

                      return (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => setActiveStage(stage)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            isActive
                              ? 'bg-[#FF7033] text-white shadow-[0_8px_18px_rgba(255,112,51,0.26)]'
                              : 'bg-[#2F3241] text-white hover:bg-[#3B4050]'
                          }`}
                        >
                          {stage}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-[1.65rem] border border-[rgba(143,146,159,0.5)] bg-[#434656] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3 text-white">
                    <DollarIcon className="h-5 w-5 text-[#FF7033]" />
                    <h3 className="text-[1.15rem] font-semibold sm:text-[1.8rem]">Budget / Investissement</h3>
                  </div>
                  <div className="mt-7">
                    <div className="relative rounded-full bg-[#2F3241] p-1.5">
                      <div
                        className="flex h-10 items-center justify-center rounded-full bg-[#A5A8B3] px-4 text-sm font-semibold text-white transition-all duration-300"
                        style={{ width: budgetWidths[budgetIndex] }}
                      >
                        {budgetRanges[budgetIndex]}
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={budgetRanges.length - 1}
                        step="1"
                        value={budgetIndex}
                        onChange={(event) => setBudgetIndex(Number(event.target.value))}
                        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                        aria-label="Budget / Investissement"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-[1.65rem] border border-[rgba(143,146,159,0.5)] bg-[#434656] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3 text-white">
                  <PinIcon className="h-5 w-5 text-[#FF7033]" />
                  <h3 className="text-[1.15rem] font-semibold sm:text-[1.8rem]">Localisation</h3>
                </div>
                <div ref={locationMenuRef} className="relative mt-5">
                  <button
                    type="button"
                    onClick={() => setIsLocationMenuOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-[1.3rem] bg-[#2F3241] px-4 py-3 text-left shadow-[inset_0_-2px_0_rgba(255,112,51,0.15)]"
                  >
                    <div className="flex flex-wrap gap-2">
                      {selectedLocations.length > 0 ? (
                        selectedLocations.map((location) => (
                          <span
                            key={location}
                            className="rounded-full bg-[#3C4150] px-4 py-1.5 text-xs font-semibold text-white"
                          >
                            {location}
                          </span>
                        ))
                      ) : (
                        <span className="px-2 py-1.5 text-sm font-medium text-[#8F929F]">
                          Choisir la/les localisation(s)
                        </span>
                      )}
                    </div>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 text-[#FF7033] transition ${isLocationMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isLocationMenuOpen ? (
                    <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-20 rounded-[1.3rem] border border-[rgba(143,146,159,0.35)] bg-[#2F3241] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.28)]">
                      <div className="flex flex-wrap gap-2">
                        {locationOptions.map((location) => {
                          const isSelected = selectedLocations.includes(location)

                          return (
                            <button
                              key={location}
                              type="button"
                              onClick={() => toggleLocation(location)}
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                isSelected
                                  ? 'bg-[#FF7033] text-white'
                                  : 'bg-[#3C4150] text-white hover:bg-[#494F60]'
                              }`}
                            >
                              {location}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A3A7B3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#B1B5C0]"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Retour
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7033] px-6 py-3 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,112,51,0.3)] transition hover:translate-y-[-1px] hover:bg-[#FF7B45]"
                >
                  <SearchIcon className="h-5 w-5" />
                  Lancer la recherche
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-10 flex w-full items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white sm:text-[2rem]">4 Matchs trouves</h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-full bg-[#A3A7B3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#B1B5C0]"
                >
                  <FilterIcon className="h-4 w-4" />
                  Trier
                </button>
                
                
              </div>
            </div>

            <div className="mt-7 grid w-full gap-8 md:grid-cols-2 xl:grid-cols-3">
              {resultMatches.map((match) => (
                <article
                  key={match.id}
                  className="rounded-[1.6rem] border border-[#AEB2BC] bg-[#F6F6F7] px-5 py-4 text-[#171A24] shadow-[0_12px_0_rgba(120,128,146,0.22)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 shrink-0">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-[1.2rem] text-lg font-bold text-white ${match.avatarClass}`}>
                        {match.avatarLabel}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full text-white ${match.badgeColor}`}>
                        <FontAwesomeIcon icon={match.badgeIcon} style={{ color: '#ffffff', transform: 'scale(0.62)' }} />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[1.15rem] font-semibold leading-tight text-[#16181F] sm:text-[2rem]">
                        {match.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#8B8F9A]">{match.location}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-semibold leading-6 text-[#8B8F9A]">{match.description}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {match.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#2F3241] px-4 py-1.5 text-xs font-semibold text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex w-full">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A3A7B3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#B1B5C0]"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Retour
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Matchmaking
