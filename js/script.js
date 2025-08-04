document.addEventListener("DOMContentLoaded", () => {
  fetch("noticias.json")
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById("contenedor-noticias");
      contenedor.innerHTML = "";
      data.forEach(noticia => {
        const div = document.createElement("div");
        div.classList.add("noticia");
        div.innerHTML = `
          <h3>${noticia.titulo}</h3>
          <p>${noticia.contenido}</p>
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Error al cargar las noticias:", error);
      document.getElementById("contenedor-noticias").innerText =
        "No se pudieron cargar las noticias.";
    });
});

const productos = [
      {
        titulo: "Los Delinqüentes - El Verde Rebelde Vuelve - Vinilo Verde",
        precio: 20.00,
        imagen: "../images/verde.jpg"
      },
      {
        titulo: "Cicatriz - 4 Años 2 Meses Y Un Dia",
        precio: 28.00,
        imagen: "../images/cicatriz.jpg"
      },
      {
        titulo: "Estopa - Vinilo",
        precio: 22.00,
        imagen: "../images/estopa.jpg"
      },
      {
        titulo: "Kiko Veneno - Hambre",
        precio: 29.00,
        imagen: "../images/kiko.jpg"
      },
      {
        titulo: "Iron Maiden - The Number Of The Beast",
        precio: 30.00,
        imagen: "../images/iron.jpg"
      },
      {
        titulo: "Eskorbuto - Ya no quedan más cojones, Eskorbuto a las elecciones",
        precio: 34.00,
        imagen: "../images/eskorbuto.jpg"
      },
      {
        titulo: "Extremoduro - La Ley Innata",
        precio: 14.00,
        imagen: "../images/extremoduro.jpg"
      },
      {
        titulo: "Manolo Kabezabolo - Ya Hera Ora Ed 25 Aniversario",
        precio: 19.00,
        imagen: "../images/manolo.jpg"
      },
      {
        titulo: "Los Porretas - No tenemos solución",
        precio: 21.00,
        imagen: "../images/porretas.jpg"
      },
      {
        titulo: "Soziedad Alkoholika - Y ese que tanto habla",
        precio: 19.90,
        imagen: "../images/soziedad.jpg"
      },
      {
        titulo: "Kortatu - Kortatu",
        precio: 21.50,
        imagen: "../images/kortatu.jpg"
      },
      {
        titulo: "Ska P - El vals del obrero",
        precio: 20.00,
        imagen: "../images/skap.jpg"
      },
      {
        titulo: "Platero Y Tú - Colección Definitiva 25 Aniversario",
        precio: 27.00,
        imagen: "../images/platero.jpg"
      },
      {
        titulo: "AC/DC - Back In Black",
        precio: 23.00,
        imagen: "../images/acdc.jpg"
      }
    ];

    document.addEventListener("DOMContentLoaded", () => {
      const container = document.getElementById("productos-container");
      productos.forEach(p => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
          <img src="${p.imagen}" alt="${p.titulo}">
          <h3>${p.titulo}</h3>
          <p>€${p.precio.toFixed(2)}</p>
        `;
        container.appendChild(div);
      });
    });
  


// Coordenadas del estadio Ramón Sánchez-Pizjuán en Sevilla
    const latNegocio = 37.384093;
    const lonNegocio = -5.970842;

    // Crear mapa
    const map = L.map('map').setView([latNegocio, lonNegocio], 16);

    // Capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Marcador del negocio
    L.marker([latNegocio, lonNegocio])
      .addTo(map)
      .bindPopup("Rotten Records<br>Estadio Ramón Sánchez-Pizjuán")
      .openPopup();

    let controlRuta;

    function marcarRuta() {
      if (controlRuta) map.removeControl(controlRuta);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLon = pos.coords.longitude;

          controlRuta = L.Routing.control({
            waypoints: [
              L.latLng(userLat, userLon),
              L.latLng(latNegocio, lonNegocio)
            ],
            routeWhileDragging: false,
            language: 'es'
          }).addTo(map);
        },
        () => {
          alert("No se pudo obtener tu ubicación. Activa la localización del navegador.");
        }
      );
    }    
    

