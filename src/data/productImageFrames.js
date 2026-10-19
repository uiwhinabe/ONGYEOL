// Foreground framing within the supplied originals (x/y/width/height fractions).
// CSS uses these bounds to give differently proportioned photos one display area.
export const productImageFrames = {
  'baekmogi-pad': { x: .18, y: .18, width: .64, height: .64, ratio: 1 },
  'baekmogi-cream': { x: .07, y: .18, width: .86, height: .72, ratio: 1 },
  'vitamin-c-cleanser': { x: .25, y: .08, width: .50, height: .85, ratio: 1086 / 1448 },
  'vitamin-c-toner': { x: .31, y: .08, width: .38, height: .85, ratio: 1086 / 1448 },
  'vitamin-c-pad': { x: .11, y: .22, width: .78, height: .66, ratio: 1 },
  'vitamin-c-ampoule': { x: .28, y: .11, width: .44, height: .80, ratio: 1086 / 1448 },
  'vitamin-c-essence': { x: .32, y: .07, width: .36, height: .86, ratio: 1024 / 1536 },
  'vitamin-c-lotion': { x: .23, y: .08, width: .52, height: .84, ratio: 1024 / 1536 },
  'vitamin-c-cream': { x: .15, y: .16, width: .70, height: .74, ratio: 1374 / 1145 },
  'vitamin-c-mask': { x: .10, y: .07, width: .80, height: .88, ratio: 1145 / 1374 },
}
