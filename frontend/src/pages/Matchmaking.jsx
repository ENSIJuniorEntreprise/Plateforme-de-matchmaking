import { useEffect, useRef, useState } from 'react'
import { apiPost, resolveAssetUrl } from '../api/client'
import briefcaseImage from '../assets/matchmaking/briefcase-image.svg'
import starbarsImage from '../assets/matchmaking/starbars-image.svg'
import wrenchImage from '../assets/matchmaking/wrench-image.svg'

const byPrefixAndName = {
  fas: {
    briefcase: { prefix: 'fas', iconName: 'briefcase' },
    'dollar-sign': { prefix: 'fas', iconName: 'dollar-sign' },
    rocket: { prefix: 'fas', iconName: 'rocket' },
    'user-group': { prefix: 'fas', iconName: 'user-group' },
  },
}

const icons = {
  location:
    'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  calendar:
    'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z',
  users:
    'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  share:
    'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z',
  chat:
    'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
  bolt: 'M7 2v11h3v9l7-12h-4l4-8z',
}

const SvgIcon = ({ path, className = '', style }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" style={style}>
    <path d={path} />
  </svg>
)

const IconImage = ({ src, alt, className = '', style }) => (
  <img src={src} alt={alt} className={className} style={style} />
)

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
      className="h-10 w-10"
      fill="currentColor"
      aria-hidden="true"
      style={style}
    >
      
      <defs>
        <mask id="rocket-hole">
          <rect width="100%" height="100%" fill="white" />
          <circle cx="12" cy="9" r="1.2" fill="black" />
        </mask>
      </defs>

      <g transform="rotate(45 12 12)" mask="url(#rocket-hole)">
  
        <path d="M12 2 L16 10 L12 14 L8 10 Z" />

        <rect x="10.8" y="14" width="2.4" height="4" rx="1" />

        <path d="M8 10 L5 11.5 L8.5 12.5 Z" />
        <path d="M16 10 L19 11.5 L15.5 12.5 Z" />
      </g>
    </svg>
  )
}

  if (icon?.prefix === 'fas' && icon?.iconName === 'user-group') {
    return <SvgIcon path={icons.users} className="h-8 w-8" style={style} />
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
      <IconImage
        src={briefcaseImage}
        alt=""
        className="h-11 w-11 object-contain drop-shadow-[0_8px_14px_rgba(255,112,51,0.2)]"
      />
    ),
  },
  {
    id: 'investisseur',
    title: 'Investisseur',
    description: 'Investisseurs et VCs prêts a financer votre projet.',
    accent: 'text-[#00FF80]',
    icon: (
      <FontAwesomeIcon icon={byPrefixAndName.fas['dollar-sign']} style={{ color: 'rgb(0, 255, 128)' }} />
    ),
  },
  {
    id: 'incubateur',
    title: 'Incubateur',
    description: "Structures d'accompagnement offrant mentorat.",
    accent: 'text-[#FFEE33]',
    icon: (
      <FontAwesomeIcon icon={byPrefixAndName.fas.rocket} style={{ color: 'rgb(255, 238, 51)' }} />
    ),
  },
  {
    id: 'talent',
    title: 'Talent',
    description: 'Professionnels qualifiés pour rejoindre votre équipe.',
    accent: 'text-[#33BBFF]',
    icon: (
      <FontAwesomeIcon icon={byPrefixAndName.fas['user-group']} style={{ color: 'rgb(51, 187, 255)' }} />
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
const sortOptions = ['Par compatibilité', 'Par proximité', 'Par budget']

const getBudgetFillColor = (index) => {
  if (index === 0) {
    return 'rgb(148, 151, 162)'
  }

  const start = { r: 148, g: 151, b: 162 }
  const end = { r: 255, g: 112, b: 51 }
  const progress = Math.pow(index / (budgetRanges.length - 1), 1.7)

  const channel = (from, to) => Math.round(from + (to - from) * progress)

  return `rgb(${channel(start.r, end.r)}, ${channel(start.g, end.g)}, ${channel(start.b, end.b)})`
}

// Habillage visuel (icône/couleur) dérivé du rôle réel renvoyé par l'API
const ROLE_BADGE = {
  startup: { icon: byPrefixAndName.fas.briefcase, color: 'bg-[#FF7033]' },
  talent: { icon: byPrefixAndName.fas['user-group'], color: 'bg-[#33BBFF]' },
  investisseur: { icon: byPrefixAndName.fas['dollar-sign'], color: 'bg-[#00FF80]' },
  incubateur: { icon: byPrefixAndName.fas.rocket, color: 'bg-[#FFEE33]' },
}

const ROLE_AVATAR_GRADIENT = {
  startup: 'bg-[radial-gradient(circle_at_top,#d6e8ff_0%,#b4c7e8_45%,#6b85a9_100%)]',
  talent: 'bg-[radial-gradient(circle_at_top,#ffd8ea_0%,#f4abc7_45%,#b66d89_100%)]',
  investisseur: 'bg-[radial-gradient(circle_at_top,#d7f4ff_0%,#94d7e9_45%,#4d8ca1_100%)]',
  incubateur: 'bg-[radial-gradient(circle_at_top,#e1d7ff_0%,#8d7ef1_45%,#3d348f_100%)]',
}

// Libellés affichés pour chaque facteur du score renvoyé par
// POST /matches/search (`match.compatibilityBreakdown`).
const BREAKDOWN_LABELS = {
  role: 'Rôle',
  sector: 'Secteur',
  stageBudget: 'Stade / Budget',
  location: 'Localisation',
}

const mapSortBy = (label) => {
  if (label === 'Par proximité') return 'proximite'
  if (label === 'Par budget') return 'budget'
  return 'compatibilite'
}

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

const PinIcon = ({ className = '' }) => <SvgIcon path={icons.location} className={className} />

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

const StarOutlineIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3.8 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8 2.5-5Z" />
  </svg>
)

const AnalysisLoader = () => (
  <div className="matchmaking-loader-shell">
    <div className="svg-frame">
      <svg viewBox="0 0 344 344" style={{ '--i': 0, '--j': 0 }}>
        <g id="out1">
          <path
            fill="rgba(255, 255, 255, 0.02)"
            d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z"
          />
          <path
            stroke="#2F3241"
            strokeMiterlimit="16"
            strokeWidth="2"
            d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z"
          />
        </g>
      </svg>

      <svg viewBox="0 0 344 344" style={{ '--i': 1, '--j': 1 }}>
        <g id="out2">
          <path
            fill="#FF7033"
            d="M102.892 127.966C93.3733 142.905 88.9517 160.527 90.2897 178.19L94.3752 177.88C93.1041 161.1 97.3046 144.36 106.347 130.168L102.892 127.966Z"
          />
          <path
            fill="#FF7033"
            d="M93.3401 194.968C98.3049 211.971 108.646 226.908 122.814 237.541L125.273 234.264C111.814 224.163 101.99 209.973 97.2731 193.819L93.3401 194.968Z"
          />
          <path
            fill="#FF7033"
            d="M152.707 92.3592C140.33 95.3575 128.822 101.199 119.097 109.421L121.742 112.55C130.981 104.739 141.914 99.1897 153.672 96.3413L152.707 92.3592Z"
          />
          <path
            fill="#FF7033"
            d="M172 90.0557C184.677 90.0557 197.18 92.9967 208.528 98.6474C219.875 104.298 229.757 112.505 237.396 122.621L234.126 125.09C226.869 115.479 217.481 107.683 206.701 102.315C195.921 96.9469 184.043 94.1529 172 94.1529V90.0557Z"
          />
          <path
            fill="#FF7033"
            d="M244.195 133.235C246.991 138.442 249.216 143.937 250.83 149.623L246.888 150.742C245.355 145.34 243.242 140.12 240.586 135.174L244.195 133.235Z"
          />
          <path
            fill="#FF7033"
            d="M253.294 161.699C255.099 175.937 253.132 190.4 247.59 203.639L243.811 202.057C249.075 189.48 250.944 175.74 249.23 162.214L253.294 161.699Z"
          />
          <path
            fill="#FF7033"
            d="M234.238 225.304C223.932 237.338 210.358 246.126 195.159 250.604C179.961 255.082 163.79 255.058 148.606 250.534L149.775 246.607C164.201 250.905 179.563 250.928 194.001 246.674C208.44 242.42 221.335 234.071 231.126 222.639L234.238 225.304Z"
          />
        </g>
      </svg>

      <svg viewBox="0 0 344 344" style={{ '--i': 0, '--j': 2 }}>
        <g id="inner3">
          <path
            fill="#FF9A1D"
            d="M195.136 135.689C188.115 131.215 179.948 128.873 171.624 128.946C163.299 129.019 155.174 131.503 148.232 136.099L148.42 136.382C155.307 131.823 163.368 129.358 171.627 129.286C179.886 129.213 187.988 131.537 194.954 135.975L195.136 135.689Z"
          />
          <path
            fill="#FF9A1D"
            d="M195.136 208.311C188.115 212.784 179.948 215.127 171.624 215.054C163.299 214.981 155.174 212.496 148.232 207.901L148.42 207.618C155.307 212.177 163.368 214.642 171.627 214.714C179.886 214.786 187.988 212.463 194.954 208.025L195.136 208.311Z"
          />
        </g>
        <path
          id="out3"
          stroke="#FF7033"
          strokeWidth="2.5"
          d="M240.944 172C240.944 187.951 235.414 203.408 225.295 215.738C215.176 228.068 201.095 236.508 185.45 239.62C169.806 242.732 153.567 240.323 139.5 232.804C125.433 225.285 114.408 213.12 108.304 198.384C102.2 183.648 101.394 167.25 106.024 151.987C110.654 136.723 120.434 123.537 133.696 114.675C146.959 105.813 162.884 101.824 178.758 103.388C194.632 104.951 209.472 111.97 220.751 123.249"
        />
      </svg>

      <svg viewBox="0 0 344 344" style={{ '--i': 1, '--j': 3 }}>
        <g id="inner1">
          <path
            fill="#FF7033"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M145.949 124.51L148.554 129.259C156.575 124.859 165.672 122.804 174.806 123.331C183.94 123.858 192.741 126.944 200.203 132.236C207.665 137.529 213.488 144.815 217.004 153.261C220.521 161.707 221.59 170.972 220.09 179.997L224.108 180.665L229.537 181.607C230.521 175.715 230.594 169.708 229.753 163.795L225.628 164.381C224.987 159.867 223.775 155.429 222.005 151.179C218.097 141.795 211.628 133.699 203.337 127.818C195.045 121.937 185.266 118.508 175.118 117.923C165.302 117.357 155.525 119.474 146.83 124.037C146.535 124.192 146.241 124.349 145.949 124.51Z"
          />
          <path
            fill="#FF9A1D"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M139.91 220.713C134.922 217.428 130.469 213.395 126.705 208.758L130.983 205.286L134.148 202.721C141.342 211.584 151.417 217.642 162.619 219.839C173.821 222.036 185.438 220.232 195.446 214.742L198.051 219.491C197.759 219.651 197.465 219.809 197.17 219.963C186.252 225.693 173.696 227.531 161.577 225.154C154.613 223.789 148.041 221.08 142.202 217.234L139.91 220.713Z"
          />
        </g>
      </svg>

      <svg viewBox="0 0 344 344" style={{ '--i': 2, '--j': 4 }}>
        <path
          id="center1"
          fill="#FF9A1D"
          d="M180.956 186.056C183.849 184.212 186.103 181.521 187.41 178.349C188.717 175.177 189.013 171.679 188.258 168.332C187.503 164.986 185.734 161.954 183.192 159.65C180.649 157.346 177.458 155.883 174.054 155.46C170.649 155.038 167.197 155.676 164.169 157.288C161.14 158.9 158.683 161.407 157.133 164.468C155.582 167.528 155.014 170.992 155.505 174.388C155.997 177.783 157.524 180.944 159.879 183.439L161.129 182.259C159.018 180.021 157.648 177.186 157.207 174.141C156.766 171.096 157.276 167.989 158.667 165.245C160.057 162.5 162.261 160.252 164.977 158.806C167.693 157.36 170.788 156.788 173.842 157.167C176.895 157.546 179.757 158.858 182.037 160.924C184.317 162.99 185.904 165.709 186.581 168.711C187.258 171.712 186.992 174.849 185.82 177.694C184.648 180.539 182.627 182.952 180.032 184.606L180.956 186.056Z"
        />
        <path
          id="center"
          fill="#FF7033"
          d="M172 166.445C175.068 166.445 177.556 168.932 177.556 172C177.556 175.068 175.068 177.556 172 177.556C168.932 177.556 166.444 175.068 166.444 172C166.444 168.932 168.932 166.445 172 166.445ZM172 177.021C174.773 177.021 177.021 174.773 177.021 172C177.021 169.227 174.773 166.979 172 166.979C169.227 166.979 166.979 169.227 166.979 172C166.979 174.773 169.227 177.021 172 177.021Z"
        />
      </svg>
    </div>
  </div>
)

const Matchmaking = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedProfile, setSelectedProfile] = useState('startup')
  const [activeStage, setActiveStage] = useState('')
  const [selectedSectors, setSelectedSectors] = useState([])
  const [isSectorMenuOpen, setIsSectorMenuOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState([])
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState('Par compatibilité')
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
  const [budgetIndex, setBudgetIndex] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(18)
  const [matches, setMatches] = useState([])
  const [matchesError, setMatchesError] = useState('')
  const [sortLoading, setSortLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState({})
  const [expandedBreakdown, setExpandedBreakdown] = useState({})
  const sectorMenuRef = useRef(null)
  const locationMenuRef = useRef(null)
  const sortMenuRef = useRef(null)

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
    setSelectedLocations((current) => {
      const exclusiveLocations = ['WorldWide', 'Remote']

      if (exclusiveLocations.includes(location)) {
        const nextLocations = current.includes(location) ? [] : [location]

        if (nextLocations.length > 0) {
          setIsLocationMenuOpen(false)
        }

        return nextLocations
      }

      const withoutExclusiveLocations = current.filter((item) => !exclusiveLocations.includes(item))

      return withoutExclusiveLocations.includes(location)
        ? withoutExclusiveLocations.filter((item) => item !== location)
        : [...withoutExclusiveLocations, location]
    })
  }

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (sectorMenuRef.current && !sectorMenuRef.current.contains(event.target)) {
        setIsSectorMenuOpen(false)
      }

      if (locationMenuRef.current && !locationMenuRef.current.contains(event.target)) {
        setIsLocationMenuOpen(false)
      }

      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setIsSortMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  const buildSearchBody = (sortLabel = selectedSort) => ({
    profileType: selectedProfile,
    sectors: selectedSectors,
    stage: activeStage,
    location: selectedLocations.join('|'),
    budgetRange: budgetRanges[budgetIndex],
    query: '',
    sortBy: mapSortBy(sortLabel),
    page: 1,
    limit: 20,
  })

  useEffect(() => {
    if (!isAnalyzing) {
      return undefined
    }

    setAnalysisProgress(18)
    setMatchesError('')

    const progressSteps = [18, 28, 39, 51, 63, 74, 85, 93]
    let stepIndex = 0

    const progressInterval = window.setInterval(() => {
      stepIndex += 1

      if (stepIndex < progressSteps.length) {
        setAnalysisProgress(progressSteps[stepIndex])
      }
    }, 300)

    let cancelled = false
    const minDelay = new Promise((resolve) => window.setTimeout(resolve, 1400))

    Promise.allSettled([apiPost('/matches/search', buildSearchBody()), minDelay]).then(([searchResult]) => {
      if (cancelled) return
      window.clearInterval(progressInterval)
      setAnalysisProgress(100)
      setIsAnalyzing(false)

      if (searchResult.status === 'fulfilled') {
        setMatches(searchResult.value.results || [])
        setCurrentStep(3)
      } else {
        setMatchesError(searchResult.reason?.message || 'Impossible de lancer la recherche.')
      }
    })

    return () => {
      cancelled = true
      window.clearInterval(progressInterval)
    }
  }, [isAnalyzing])

  const handleSortSelect = async (option) => {
    setSelectedSort(option)
    setIsSortMenuOpen(false)
    if (currentStep !== 3) return

    setSortLoading(true)
    setMatchesError('')
    try {
      const data = await apiPost('/matches/search', buildSearchBody(option))
      setMatches(data.results || [])
    } catch (err) {
      setMatchesError(err.message || 'Impossible de trier les résultats.')
    } finally {
      setSortLoading(false)
    }
  }

  const toggleBreakdown = (userId) => {
    setExpandedBreakdown((prev) => ({ ...prev, [userId]: !prev[userId] }))
  }

  const handleConnect = async (userId) => {
    setConnectionStatus((prev) => ({ ...prev, [userId]: 'loading' }))
    try {
      await apiPost(`/matches/connect/${userId}`)
      setConnectionStatus((prev) => ({ ...prev, [userId]: 'sent' }))
    } catch (err) {
      setConnectionStatus((prev) => ({ ...prev, [userId]: err.message || 'error' }))
    }
  }

  const visualStep = isAnalyzing ? 3 : currentStep
  const missingCriteria = [
    selectedSectors.length === 0 ? 'secteur' : null,
    !activeStage ? 'stade de développement' : null,
    selectedLocations.length === 0 ? 'localisation' : null,
  ].filter(Boolean)
  const isCriteriaComplete = missingCriteria.length === 0

  const startAnalysis = () => {
    if (!isCriteriaComplete) {
      return
    }

    setIsSectorMenuOpen(false)
    setIsLocationMenuOpen(false)
    setIsAnalyzing(true)
  }

  const steps = [
    {
      id: 1,
      label: 'Type de profil',
      status: visualStep === 1 ? 'active' : 'done',
    },
    {
      id: 2,
      label: 'Critères',
      status: visualStep === 2 ? 'active' : visualStep > 2 ? 'done' : 'upcoming',
    },
    {
      id: 3,
      label: 'Résultats',
      status: visualStep === 3 ? 'active' : 'upcoming',
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
    <section className="page matchmaking matchmaking-shell min-h-screen bg-[#20222C] px-4 py-8 text-white sm:px-8 sm:py-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <header className="matchmaking-header max-w-4xl text-center">
          <h1 className="text-[2.25rem] font-bold leading-tight tracking-[-0.03em] text-white sm:text-[4rem] lg:text-[4.25rem]">
            Trouvez votre{' '}
            <span className="bg-linear-to-r from-[#FF7033] to-[#FF9A1D] bg-clip-text text-transparent">
              match parfait
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-snug text-[#8F929F] sm:mt-5 sm:text-[1.65rem]">
            Définissez vos critères et laissez notre algorithme intelligent trouver les meilleures
            correspondances.
          </p>
        </header>

        <div className="mt-8 flex w-full max-w-5xl items-center justify-between gap-3 overflow-x-auto px-1 pb-3 sm:mt-10 sm:gap-4 sm:px-2 sm:pb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="matchmaking-step-item flex min-w-fit flex-1 items-center gap-2 sm:gap-3"
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold sm:h-9 sm:w-9 sm:text-sm ${stepCircleClass[step.status]}`}>
                {step.id}
              </div>
              <span className={`whitespace-nowrap text-xs font-semibold sm:text-sm ${stepTextClass[step.status]}`}>{step.label}</span>
              <div
                className={`h-[2px] min-w-10 flex-1 sm:min-w-16 ${
                  visualStep === 3 || step.id < visualStep ? 'bg-[#FF7033]' : stepLineClass[step.status]
                }`}
              />
            </div>
          ))}
        </div>

        {currentStep === 1 ? (
          <>
            <h2 className="mt-12 text-center text-[1.65rem] font-semibold sm:mt-14 sm:text-[2rem]">
              Quel type de profil recherchez-vous?
            </h2>

            <div className="mt-10 grid w-full gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
              {profileOptions.map((option, index) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedProfile(option.id)
                    setCurrentStep(2)
                  }}
                  className="matchmaking-card matchmaking-profile-card matchmaking-button group min-h-[220px] w-full rounded-[2rem] border border-transparent bg-[#2F3241] px-5 py-8 text-center shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-1000 hover:-translate-y-1 hover:border-[#FF7033] hover:bg-[rgba(255,112,51,0.10)] sm:h-[250px] sm:px-7 sm:py-10"
                  style={{ animationDelay: `${0.12 * index}s` }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14 ${option.accent}`}>
                      {option.icon}
                    </div>
                    <h3 className="mt-4 text-[1.65rem] font-semibold leading-none text-white sm:mt-5 sm:text-[2rem]">{option.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#8F929F] sm:mt-4">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : currentStep === 2 && !isAnalyzing ? (
          <>
            <h2 className="mt-10 text-center text-[1.7rem] font-semibold text-white sm:mt-12 sm:text-[2rem]">Affinez votre recherche</h2>

            <div className="matchmaking-panel relative mt-8 w-full rounded-[2rem] bg-[#343848] px-4 pb-5 pt-5 shadow-[0_28px_60px_rgba(0,0,0,0.18)] sm:px-8 sm:pb-7 sm:pt-12">
              <button
                type="button"
                onClick={clearFilters}
                className="matchmaking-button matchmaking-button-muted mb-5 ml-auto flex items-center gap-2 rounded-full bg-[#A3A7B3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#B1B5C0] sm:absolute sm:right-4 sm:top-[-12px] sm:mb-0"
              >
                Effacer tout
                <ChevronDownIcon className="h-4 w-4 -rotate-90" />
              </button>

              <div
                className={`matchmaking-panel relative rounded-[1.65rem] border border-[rgba(143,146,159,0.5)] bg-[#434656] px-5 py-5 sm:px-7 ${
                  isSectorMenuOpen ? 'z-40' : 'z-10'
                }`}
              >
                <div className="flex items-center gap-3 text-white">
                  <IconImage src={starbarsImage} alt="" className="h-5 w-5" />
                  <h3 className="text-[1.15rem] font-semibold sm:text-[1.8rem]">Secteurs d'activité</h3>
                </div>
                <div ref={sectorMenuRef} className="relative mt-5">
                  <button
                    type="button"
                    onClick={() => setIsSectorMenuOpen((open) => !open)}
                    className="matchmaking-button flex w-full items-center justify-between rounded-[1.3rem] bg-[#2F3241] px-4 py-3 text-left shadow-[inset_0_-2px_0_rgba(255,112,51,0.15)]"
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
                    <div className="matchmaking-dropdown-panel absolute left-0 right-0 top-[calc(100%+12px)] z-50 rounded-[1.3rem] border border-[rgba(143,146,159,0.35)] bg-[#2F3241] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.28)]">
                      <div className="flex flex-wrap gap-2">
                        {sectorOptions.map((sector) => {
                          const isSelected = selectedSectors.includes(sector)

                          return (
                            <button
                              key={sector}
                              type="button"
                              onClick={() => toggleSector(sector)}
                              className={`matchmaking-chip rounded-full px-4 py-2 text-sm font-semibold transition ${
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

              <div className="relative z-0 mt-12 grid gap-8 lg:grid-cols-2">
                <div className="matchmaking-panel rounded-[1.65rem] border border-[rgba(143,146,159,0.5)] bg-[#434656] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3 text-white">
                    <IconImage src={wrenchImage} alt="" className="h-5 w-5" />
                    <h3 className="text-[1.15rem] font-semibold sm:text-[1.8rem]">Stade de développement</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {stages.map((stage) => {
                      const isActive = stage === activeStage

                      return (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => setActiveStage(stage)}
                          className={`matchmaking-chip rounded-full px-4 py-2 text-sm font-semibold transition ${
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

                <div className="matchmaking-panel rounded-[1.65rem] border border-[rgba(143,146,159,0.5)] bg-[#434656] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3 text-white">
                    <FontAwesomeIcon icon={byPrefixAndName.fas['dollar-sign']} style={{ color: 'rgb(255, 112, 51)', transform: 'scale(0.58)' }} />
                    <h3 className="text-[1.15rem] font-semibold sm:text-[1.8rem]">Budget / Investissement</h3>
                  </div>
                  <div className="mt-7">
                    <div className="relative rounded-full bg-[#2F3241] p-1.5">
                      <div
                        className="flex h-10 items-center justify-center rounded-full bg-[#A5A8B3] px-4 text-sm font-semibold text-white transition-all duration-500"
                        style={{
                          width: budgetWidths[budgetIndex],
                          background:
                            budgetIndex === 0
                              ? getBudgetFillColor(budgetIndex)
                              : `linear-gradient(90deg, ${getBudgetFillColor(budgetIndex)} 0%, #FF9A1D 100%)`,
                          boxShadow:
                            budgetIndex === 0
                              ? '0 10px 22px rgba(148, 151, 162, 0.16)'
                              : `0 10px 22px rgba(255, 112, 51, ${0.12 + budgetIndex * 0.05})`,
                        }}
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

              <div className="matchmaking-panel mt-12 rounded-[1.65rem] border border-[rgba(143,146,159,0.5)] bg-[#434656] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3 text-white">
                  <PinIcon className="h-5 w-5 text-[#FF7033]" />
                  <h3 className="text-[1.15rem] font-semibold sm:text-[1.8rem]">Localisation</h3>
                </div>
                <div ref={locationMenuRef} className="relative mt-5">
                  <button
                    type="button"
                    onClick={() => setIsLocationMenuOpen((open) => !open)}
                    className="matchmaking-button flex w-full items-center justify-between rounded-[1.3rem] bg-[#2F3241] px-4 py-3 text-left shadow-[inset_0_-2px_0_rgba(255,112,51,0.15)]"
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
                    <div className="matchmaking-dropdown-panel absolute left-0 right-0 top-[calc(100%+12px)] z-20 rounded-[1.3rem] border border-[rgba(143,146,159,0.35)] bg-[#2F3241] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.28)]">
                      <div className="flex flex-wrap gap-2">
                        {locationOptions.map((location) => {
                          const isSelected = selectedLocations.includes(location)
                          const hasExclusiveLocationSelected =
                            selectedLocations.includes('WorldWide') || selectedLocations.includes('Remote')
                          const isDisabled =
                            hasExclusiveLocationSelected &&
                            !selectedLocations.includes(location)

                          return (
                            <button
                              key={location}
                              type="button"
                              onClick={() => toggleLocation(location)}
                              disabled={isDisabled}
                              className={`matchmaking-chip rounded-full px-4 py-2 text-sm font-semibold transition ${
                                isSelected
                                  ? 'bg-[#FF7033] text-white'
                                  : isDisabled
                                    ? 'cursor-not-allowed bg-[#3C4150]/60 text-[#8F929F]'
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
                  className="matchmaking-button matchmaking-button-muted inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#A3A7B3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#B1B5C0] sm:w-auto"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Retour
                </button>

                <button
                  type="button"
                  onClick={startAnalysis}
                  disabled={!isCriteriaComplete}
                  className={`matchmaking-button inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white transition sm:w-auto ${
                    isCriteriaComplete
                      ? 'matchmaking-button-primary bg-[#FF7033] shadow-[0_12px_24px_rgba(255,112,51,0.3)] hover:translate-y-[-1px] hover:bg-[#FF7B45]'
                      : 'cursor-not-allowed bg-[#6E7280] shadow-none opacity-70'
                  }`}
                >
                  <SearchIcon className="h-5 w-5" />
                  Lancer la recherche
                </button>
              </div>
            </div>
          </>
        ) : isAnalyzing ? (
          <div className="mt-12 flex w-full max-w-3xl flex-col items-center px-4 py-12 text-center sm:py-20">
            <AnalysisLoader />

            <h2 className="mt-6 text-[2rem] font-semibold text-white sm:text-[2.8rem]">
              Analyse en cours...
            </h2>
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-[#8F929F] sm:text-[1.35rem]">
              Notre algorithme recherche les meilleures correspondances
            </p>

            <div className="mt-10 h-3 w-full max-w-md overflow-hidden rounded-full bg-[#35394A]">
              <div
                className="h-full rounded-full bg-[#FF7033] transition-all duration-500"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold text-white sm:text-[2rem]">
                {matches.length} Match{matches.length > 1 ? 's' : ''} trouvé{matches.length > 1 ? 's' : ''}
              </h2>
              <div ref={sortMenuRef} className="relative flex w-full items-center gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsSortMenuOpen((open) => !open)}
                  className="matchmaking-button matchmaking-button-muted inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#A3A7B3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#B1B5C0] sm:w-auto"
                >
                  <FilterIcon className="h-4 w-4" />
                  {sortLoading ? 'Tri…' : 'Trier'}
                  <ChevronDownIcon className={`h-4 w-4 transition ${isSortMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortMenuOpen ? (
                  <div className="matchmaking-dropdown-panel absolute left-0 right-0 top-[calc(100%+10px)] z-20 rounded-[1.2rem] border border-[rgba(143,146,159,0.35)] bg-[#2F3241] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.28)] sm:left-auto sm:right-0 sm:min-w-[210px]">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSortSelect(option)}
                        className={`matchmaking-button flex w-full items-center rounded-[0.95rem] px-4 py-3 text-left text-sm font-semibold transition ${
                          selectedSort === option
                            ? 'bg-[#FF7033] text-white'
                            : 'text-white hover:bg-[#3C4150]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {matchesError && (
              <p className="mt-6 w-full rounded-2xl border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-5 py-3 text-center text-sm font-medium text-[#ff7043]">
                {matchesError}
              </p>
            )}

            {matches.length === 0 && !matchesError ? (
              <p className="mt-10 w-full text-center text-base font-medium text-[#8F929F]">
                Aucun résultat ne correspond à vos critères. Essayez d'élargir votre recherche.
              </p>
            ) : (
              <div className="mt-7 grid w-full gap-8 md:grid-cols-2 xl:grid-cols-3">
                {matches.map((match, index) => {
                  const badge = ROLE_BADGE[match.role] || ROLE_BADGE.startup
                  const avatarGradient = ROLE_AVATAR_GRADIENT[match.role] || ROLE_AVATAR_GRADIENT.startup
                  const displayName = match.company || match.fullName || `${match.firstName || ''} ${match.lastName || ''}`.trim()
                  const displayTags = match.tags?.length ? match.tags : (match.interests || [])
                  const avatarSrc = resolveAssetUrl(match.avatarUrl)
                  const status = connectionStatus[match._id]

                  return (
                    <div
                      key={match._id}
                      className="matchmaking-result-card relative min-h-[250px] sm:min-h-[285px]"
                      style={{ animationDelay: `${index * 0.45}s` }}
                    >
                      <article className="matchmaking-result-card-surface group absolute inset-x-0 top-0 flex flex-col overflow-hidden rounded-[1.6rem] border border-[#AEB2BC] bg-[#F6F6F7] px-5 py-4 text-[#171A24]">
                        <div className="flex items-start gap-4">
                          <div className="relative h-16 w-16 shrink-0">
                            {avatarSrc ? (
                              <img
                                src={avatarSrc}
                                alt={displayName}
                                className="h-16 w-16 rounded-[1.2rem] object-cover object-center"
                              />
                            ) : (
                              <div className={`flex h-16 w-16 items-center justify-center rounded-[1.2rem] text-lg font-bold text-white ${avatarGradient}`}>
                                {displayName.charAt(0).toUpperCase() || '?'}
                              </div>
                            )}
                            <div className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full text-white ${badge.color}`}>
                              <FontAwesomeIcon
                                icon={badge.icon}
                                style={{
                                  color: '#ffffff',
                                  transform: `scale(${badge.icon?.iconName === 'rocket' ? 0.88 : 0.62})`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-[1.05rem] font-semibold leading-tight text-[#16181F] sm:text-[1.6rem]">
                                {displayName}
                              </h3>
                              <span className="shrink-0 rounded-full bg-[#FF7033]/15 px-2.5 py-1 text-xs font-bold text-[#FF7033]">
                                {match.compatibilityScore}%
                              </span>
                            </div>
                            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#8B8F9A]">
                              <SvgIcon path={icons.location} className="h-3.5 w-3.5 text-[#8B8F9A]" />
                              {match.location || 'Non renseigné'}
                            </p>
                          </div>
                        </div>

                        <p className="mt-5 text-sm font-semibold leading-6 text-[#8B8F9A]">
                          {match.description || 'Aucune description pour le moment.'}
                        </p>

                        {displayTags.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-3">
                            {displayTags.map((tag) => (
                              <span
                                key={tag}
                                className="matchmaking-chip rounded-full bg-[#2F3241] px-4 py-1.5 text-xs font-semibold text-white"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {match.compatibilityBreakdown && (
                          <div className="mt-4">
                            <button
                              type="button"
                              onClick={() => toggleBreakdown(match._id)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-[#FF7033]"
                            >
                              Pourquoi ce match ?
                              <ChevronDownIcon
                                className={`h-3.5 w-3.5 transition ${expandedBreakdown[match._id] ? 'rotate-180' : ''}`}
                              />
                            </button>

                            {expandedBreakdown[match._id] && (
                              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                                {Object.entries(BREAKDOWN_LABELS).map(([key, label]) => (
                                  <div key={key}>
                                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#8B8F9A]">
                                      <span>{label}</span>
                                      <span className="text-[#16181F]">{match.compatibilityBreakdown[key]}%</span>
                                    </div>
                                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#E4E4E7]">
                                      <div
                                        className="h-full rounded-full bg-[#FF7033]"
                                        style={{ width: `${match.compatibilityBreakdown[key]}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-5 flex flex-col gap-2 overflow-hidden sm:max-h-0 sm:flex-row sm:transition-all sm:duration-500 sm:group-hover:max-h-[68px]">
                          <div className="flex w-full flex-col gap-2 transition-all duration-500 max-sm:translate-y-0 max-sm:opacity-100 sm:flex-row sm:pointer-events-none sm:translate-y-3 sm:opacity-0 sm:group-hover:pointer-events-auto sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => onNavigate?.('profile', { userId: match._id, compatibilityScore: match.compatibilityScore })}
                              className="matchmaking-button matchmaking-button-primary inline-flex w-full items-center justify-center gap-2 rounded-[1rem] bg-[#FF7033] px-5 py-3 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,112,51,0.24)] transition hover:bg-[#FF7B45]"
                            >
                              <StarOutlineIcon className="h-4 w-4" />
                              Voir le profil
                            </button>
                            <button
                              type="button"
                              onClick={() => handleConnect(match._id)}
                              disabled={status === 'loading' || status === 'sent'}
                              className="matchmaking-button inline-flex w-full items-center justify-center gap-2 rounded-[1rem] bg-[#2F3241] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#3C4150] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              {status === 'sent' ? 'Demande envoyée ✓' : status === 'loading' ? 'Envoi…' : 'Contacter'}
                            </button>
                          </div>
                        </div>
                      </article>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="mt-8 flex w-full">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="matchmaking-button matchmaking-button-muted inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#A3A7B3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#B1B5C0] sm:w-auto"
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
