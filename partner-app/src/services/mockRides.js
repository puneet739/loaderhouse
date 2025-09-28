// Simple mock ride generator and utilities

export function createMockRide(id = randomId()) {
  const vehicles = ['Mini Truck', 'LCV', 'Truck 14ft'];
  const areas = ['Andheri', 'Bhiwandi', 'Thane', 'Powai', 'Borivali', 'Vashi'];
  const pickupArea = pick(areas);
  const dropArea = pick(areas.filter(a => a !== pickupArea));
  const distanceKm = +(Math.random() * 18 + 2).toFixed(1);
  const etaMin = Math.floor(distanceKm * (4 + Math.random() * 2));
  const fareEstimate = Math.max(150, Math.round(distanceKm * (30 + Math.random() * 20)));
  const vehicleType = pick(vehicles);

  return {
    id,
    pickup: { address: `${pickupArea} Industrial Area`, lat: 0, lng: 0 },
    drop: { address: `${dropArea} Warehouse`, lat: 0, lng: 0 },
    distanceKm,
    etaMin,
    fareEstimate,
    vehicleType,
    status: 'requested',
    customerContact: '+91-98•••-•••12'
  };
}

export function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function subscribeRideFeed({ onRide, enabledRef }) {
  // Emits a mock ride every 10-20 seconds when enabledRef.current === true
  let timer;
  const schedule = () => {
    const delay = 10000 + Math.random() * 10000;
    timer = setTimeout(() => {
      if (enabledRef.current) {
        onRide(createMockRide());
      }
      schedule();
    }, delay);
  };
  schedule();
  return () => clearTimeout(timer);
}
