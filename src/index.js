import './style.css'
import tgtElemReady from './MutationObserver'

tgtElemReady('body', bodyEl => {
  console.log('\n\n\n\nWEEEEEEEEEEEEEOOOO\n\n\n\n')
  console.log(bodyEl)
}, '${campaign.name}')
