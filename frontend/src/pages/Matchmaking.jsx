import { useEffect, useRef, useState } from 'react'
import briefcaseImage from '../assets/matchmaking/briefcase-image.svg'
import jackMaImage from '../assets/matchmaking/jack-ma.jpg'
import sophieChenImage from '../assets/matchmaking/sophie-chen.avif'
import starbarsImage from '../assets/matchmaking/starbars-image.svg'
import techAngelsOfficeImage from '../assets/matchmaking/techangels-office.jpg'
import techFlowBuildingImage from '../assets/matchmaking/techflow-building.jpeg'
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
    <section className="page matchmaking">
      <h2>Matchmaking</h2>
      
    </section>
  );
};

export default Matchmaking;
