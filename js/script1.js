// Coordenadas del estadio Ramón Sánchez Pizjuán
const destino = [37.384047, -5.970689];

// Crear el mapa
const mapa = L.map('map').setView(destino, 15);

// Cargar tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(mapa);

// Marcador en el destino
L.marker(destino).addTo(mapa).bindPopup('Estadio Ramón Sánchez Pizjuán').openPopup();

// Función para calcular ruta desde tu ubicación
function marcarRuta() {
  if (!navigator.geolocation) {
    alert('Tu navegador no admite geolocalización');
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const origen = [pos.coords.latitude, pos.coords.longitude];

    // Añadir control de ruta
    L.Routing.control({
      waypoints: [
        L.latLng(origen),
        L.latLng(destino)
      ],
      routeWhileDragging: false,
      createMarker: function() { return null; }, // No mostrar marcadores adicionales
      lineOptions: {
        styles: [{ color: '#ff0000', weight: 5 }]
      }
    }).addTo(mapa);

  }, () => {
    alert('No se pudo obtener tu ubicación');
  });
}
