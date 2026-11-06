const MIN_INTERVAL_MS = 1000;
const APP_USER_AGENT = process.env.GEOCODER_USER_AGENT || 'SOLIDATA/1.0 (Banco de Alimentos Buenos Aires school project)';
const cache = new Map();
let lastRequestAt = 0;
let requestQueue = Promise.resolve();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

async function fetchNominatim(url) {
    const wait = MIN_INTERVAL_MS - (Date.now() - lastRequestAt);
    if (wait > 0) await delay(wait);
    lastRequestAt = Date.now();
    return fetch(url, {
        headers: { 'User-Agent': APP_USER_AGENT, 'Accept-Language': 'es' },
        signal: AbortSignal.timeout(8000),
    });
}

function isPreciseMatch(result, institutionName, location) {
    const address = result.address || {};
    if (address.country_code !== 'ar' || !address.road) return false;
    const locationText = normalize(location);
    const roadWords = normalize(address.road).split(/[^a-z0-9]+/).filter((word) => word.length >= 3);
    if (!roadWords.some((word) => locationText.includes(word))) return false;

    const requestedNumber = String(location).match(/\b\d{1,5}\b/)?.[0];
    const resultNumber = String(address.house_number || '').match(/\d{1,5}/)?.[0];
    if (requestedNumber) return requestedNumber === resultNumber ? { accuracy: 'address' } : null;

    const nameWords = normalize(institutionName).split(/[^a-z0-9]+/).filter((word) => word.length >= 4);
    const placeName = normalize(`${result.name || ''} ${result.display_name || ''}`);
    const matchingWords = [...new Set(nameWords)].filter((word) => placeName.includes(word));
    const uniqueNameWords = new Set(nameWords).size;
    if (uniqueNameWords === 1 && normalize(result.name) === normalize(institutionName)) return { accuracy: 'address' };
    if (uniqueNameWords > 1 && matchingWords.length >= 2) return { accuracy: 'address' };
    return null;
}

function matchLocality(result, location) {
    const parts = String(location).split(',').map((part) => part.trim()).filter(Boolean);
    const locality = normalize((parts[0] || '').replace(/^caba\s*[-:–]\s*/i, '').trim());
    if (!locality || !result.address || result.address.country_code !== 'ar') return false;
    const localityFields = ['city', 'town', 'village', 'municipality', 'suburb', 'county', 'state_district'];
    return localityFields.some((field) => normalize(result.address[field]).replace(/^partido de /, '') === locality);
}

async function requestGeocode(institutionName, location) {
    const parts = location.split(',').map((part) => part.trim()).filter(Boolean);
    const isCaba = /ciudad autonoma de buenos aires/i.test(location) || /^caba\s*[-:–]/i.test(location);
    const province = isCaba ? 'Buenos Aires' : parts.at(-1);
    const hasStreetNumber = /\d/.test(location);
    const url = new URL('https://nominatim.openstreetmap.org/search');
    const locality = (parts[0] || '').replace(/^caba\s*[-:–]\s*/i, '').trim();
    url.searchParams.set('q', hasStreetNumber ? `${institutionName}, ${location}, Argentina` : `${locality}, ${province}, Argentina`);
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('limit', '5');
    url.searchParams.set('countrycodes', 'ar');

    const response = await fetchNominatim(url);
    if (!response.ok) return null;

    const results = await response.json();
    const result = hasStreetNumber
        ? results.find((item) => isPreciseMatch(item, institutionName, location))
        : results.find((item) => matchLocality(item, location));
    const accuracy = hasStreetNumber ? 'address' : 'locality';
    if (!result) return null;

    const latitude = Number(result.lat);
    const longitude = Number(result.lon);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return { latitude, longitude, accuracy };
}

function geocodeInstitution(institutionName, location) {
    if (typeof location !== 'string' || !location.trim()) return Promise.resolve(null);
    const locationKey = normalize(location);
    const key = /\d/.test(location)
        ? `${normalize(institutionName)}|${locationKey}`
        : `locality|${locationKey}`;
    if (cache.has(key)) return Promise.resolve(cache.get(key));

    const request = requestQueue.then(async () => {
        return requestGeocode(institutionName, location);
    }).catch((error) => {
        console.warn('No se pudo consultar el geocodificador de instituciones:', error.message);
        return null;
    });

    requestQueue = request.then(() => undefined);
    return request.then((result) => {
        cache.set(key, result);
        return result;
    });
}

module.exports = geocodeInstitution;
