import {polyfill , compact, uncompact, geoToH3} from "h3-js";



export const arrayToKey = async (arr, res, convert = false) => {
    var newArr = arr;
    if (convert) {
        newArr = await arr.map((latLng) => [latLng[1], latLng[0]]);
    }
    const index = await polyfill(newArr, res)
   
    
    let compactResult = compact(index)
    let unCompactResult = uncompact(compactResult,res > 9 ? res : 9)
    // console.log('INdexes.....',index)
    // console.log('Compact.....',compactResult)
    // console.log("UnCompact >>> ", unCompactResult)

    const compare = compactResult.map(el => index.includes(el) ? el : false)
    // console.log("Compare >>", compare)
     return {index,compactResult, unCompactResult}

}



export const clientAreaChecking = async (lat, lng, keyObj, resolution) => {
    const clienH3Key = geoToH3(Number(lat), Number(lng), resolution)
    console.log("Lat",Number(lat),"Lat", Number(lng))
    const msg = keyObj?.index?.includes(clienH3Key) ? "kar sakte hai" : "Hum se na ho Payga"
    console.log(msg)

}