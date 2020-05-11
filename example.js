

// load dependencies 
const fs = require('fs')

var parse = require('wellknown')
const turf = require('@turf/turf')

// open sample file
const sampleWKT = fs.readFileSync('./sample_data/Sample_Stintson_Beach.wkt', 'utf8')

// convery to GeoJSON

const linestring1 = turf.lineString(parse(sampleWKT).coordinates)

console.log(turf.length(linestring1, {units: 'miles'}))

// reporting 15miles, strava says 9.. do I need to simplify the geometry first?
