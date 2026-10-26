import waterIcon from '../assets/images/skin-guide/cause-water.svg'
import barrierIcon from '../assets/images/skin-guide/cause-barrier.svg'
import sunIcon from '../assets/images/skin-guide/cause-sun.svg'

// Keep the moisture guide's original artwork. Other causes share one SVG
// canvas, stroke width and line treatment, with no extra library dependency.
const existingIcons = { 'water-waves': waterIcon, barrier: barrierIcon, sun: sunIcon }
const outlines = {
  shield: <><path d="M35 8 56 17v18c0 14-12 23-21 28-9-5-21-14-21-28V17L35 8Z" /><path d="m25 35 7 7 14-17" /></>,
  droplet: <path d="M35 8S16 29 16 43a19 19 0 0 0 38 0C54 29 35 8 35 8Z" />,
  particles: <><circle cx="35" cy="35" r="26" /><circle cx="27" cy="26" r="3" /><circle cx="44" cy="29" r="4" /><circle cx="31" cy="44" r="4" /><circle cx="45" cy="45" r="2" /></>,
  balance: <><path d="M35 10v49M22 60h26M14 22l42-7M19 21 9 42h20L19 21ZM51 16 41 37h20L51 16Z" /><path d="M9 42c1 10 19 10 20 0M41 37c1 10 19 10 20 0" /></>,
  sparkles: <><path d="m35 13 6 16 16 6-16 6-6 16-6-16-16-6 16-6 6-16ZM13 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5ZM57 48l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" /></>,
  spots: <><circle cx="35" cy="35" r="26" /><circle cx="25" cy="23" r="2" /><circle cx="43" cy="22" r="3" /><circle cx="35" cy="35" r="3" /><circle cx="22" cy="43" r="2" /><circle cx="45" cy="45" r="3" /><circle cx="36" cy="52" r="2" /></>,
  elasticity: <><path d="M12 41c9-28 37-28 46 0M12 50c9-15 37-15 46 0M10 14v10h10M60 14v10H50" /></>,
  wrinkles: <><path d="M10 19c10-10 17 10 27 0s17 10 23 0M10 35c10-10 17 10 27 0s17 10 23 0M10 51c10-10 17 10 27 0s17 10 23 0" /></>,
}

export default function WhyCauseIcon({ icon }) {
  if (existingIcons[icon]) return <img src={existingIcons[icon]} alt="" loading="lazy" />
  if (!outlines[icon]) return null
  return <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{outlines[icon]}</svg>
}
