
/*
function getCartesian(cx, cy, radius, angle) {
  let rad = angle * Math.PI / 180
  return {
    x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
    y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000
  }
}

function getDialCoords(radius, startAngle, endAngle) {
  let cx = 50,
    cy = 50
  return {
    end: getCartesian(cx, cy, radius, endAngle),
    start: getCartesian(cx, cy, radius, startAngle)
  }
}

function pathString(radius, startAngle, endAngle, largeArc) {
  let coords = getDialCoords(radius, startAngle, endAngle),
    start = coords.start,
    end = coords.end,
    largeArcFlag = typeof (largeArc) === "undefined" ? 1 : largeArc

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
  ].join(" ")
}
*/

export default function (gauge) {
  const params = gauge.params
  const $gaugeSvgEl = gauge.$gaugeSvgEl
  if (params.type !== 'semicircle') {
    return
  }
  const size = params.size
  const labelFontSize = params.labelFontSize
  $gaugeSvgEl.attr('height', `${size / 2 + 100}px`)
  $gaugeSvgEl.find('.gauge-value-text').attr('dy', `${labelFontSize - 15}`)
  $gaugeSvgEl.find('.gauge-label-text').attr('dy', 20)

  /*

  $gaugeSvgEl
    .attr('height', `${size / 2 + 100}px`)
    .attr('viewBox', `0 0 100 100`)

  $el.find('.gauge-back-semi')
    .attr('stroke-linecap', 'round')
    .attr('d', pathString(40, 140, 40))

  $el.find('.gauge-front-semi')
    .attr('stroke-linecap', 'round')
    .attr('d', pathString(40, 140, 40))
  */
}