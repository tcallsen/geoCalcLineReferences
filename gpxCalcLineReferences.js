'use strict';

var parse = require('wellknown')
const turf = require('@turf/turf')

/**
 * Returns WKT of linestring with linear references added as the 4th ("M") Dimension. 
 *  
 *  For more information on the WKT coordinate dimensions, see the Geometric Objects section here:
 *    https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry
 * 
 * @param {string} LINESTRING Z, in WKT format
 * @return {string} LINESTRING ZM, in WKT format
 *
 */
module.exports = function(inputWKT) {

  // convert to GeoJSON
  const linestringJSON = parse(inputWKT).coordinates

  // load into turf linestring obj
  const linestring = turf.lineString(linestringJSON)

  // add linear referencing - 4th "M" dimension
  let previousLength = 0 // track previous length
  let previousCoord = null
  linestring.geometry.coordinates.forEach( (currentCoord, index) => {
    
    const currentLength = 0

    // if first point set length to 0, otherwise append length to end of point array
    if (index===0) {
      currentCoord.push(0)
    } else {
      const distance = turf.distance(previousCoord, currentCoord, {units: 'miles'})
      currentCoord.push(previousCoord[3] + distance)
    }

    previousLength = currentLength
    previousCoord = currentCoord

  })

  // confirm total line length and cumulative lengths match
  // console.log('total length:', turf.length(linestring, {units: 'miles'}))
  // console.log('cum length:', linestring.geometry.coordinates[linestring.geometry.coordinates.length-1][3])

  // output back to WKT (including 4th dimension)
  const outputWKT = parse.stringify(linestring)

  return outputWKT

}
