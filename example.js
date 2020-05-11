
// load dependencies 
const fs = require('fs')
const gpxCalcLineReferences = require('./gpxCalcLineReferences.js')

// open sample file and load WKT
const sampleWKT = fs.readFileSync('./sample_data/Sample_Stintson_Beach.wkt', 'utf8')

// calculate linear references and save into WKT with 4th "M" dimension
const referencedWKT = gpxCalcLineReferences( sampleWKT )

console.log(referencedWKT)
