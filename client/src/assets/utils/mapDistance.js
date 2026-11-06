export const ORIGIN = { latitude: -34.61303, longitude: -58.40563 };
export const DISTANCE_RANGES = { nearMaxKm: 10, mediumMaxKm: 35 };

export function distanceInKm(from, to) {
  const radians = (degrees) => degrees * Math.PI / 180;
  const latDifference = radians(to.latitude - from.latitude);
  const lonDifference = radians(to.longitude - from.longitude);
  const a = Math.sin(latDifference / 2) ** 2
    + Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(lonDifference / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function distanceCategory(distance) {
  if (distance <= DISTANCE_RANGES.nearMaxKm) return "near";
  if (distance <= DISTANCE_RANGES.mediumMaxKm) return "medium";
  return "far";
}
