const fetchButton = document.getElementById('fetch-button');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const gallery = document.getElementById('gallery');

// Replace this with your actual NASA API key
const NASA_API_KEY = 'rhXZa3SW360QGIwgLxHmrIdh4GxpDPqeFNVm02jZ'; // Replace 'DEMO_KEY' with your key for production

fetchButton.addEventListener('click', () => {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  if (!startDate || !endDate) {
    alert("Please select both start and end dates.");
    return;
  }

  fetchAPODImages(startDate, endDate);
});

async function fetchAPODImages(start, end) {
  gallery.innerHTML = '<p>Loading...</p>';

  const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&start_date=${start}&end_date=${end}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (Array.isArray(data)) {
      displayImages(data.reverse()); // Reverse to show newest first
    } else {
      gallery.innerHTML = `<p>Error: ${data.msg || 'Unexpected response'}</p>`;
    }
  } catch (err) {
    console.error(err);
    gallery.innerHTML = `<p>Failed to fetch data from NASA API. Try again later.</p>`;
  }
}

function displayImages(images) {
  gallery.innerHTML = '';

  images.forEach(item => {
    // Skip videos and other media types
    if (item.media_type !== 'image') return;

    const card = document.createElement('div');
    card.className = 'gallery-item';

    card.innerHTML = `
      <img src="${item.url}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.explanation}</p>
    `;

    gallery.appendChild(card);
  });

  if (gallery.innerHTML.trim() === '') {
    gallery.innerHTML = '<p>No images found for this date range.</p>';
  }
}
