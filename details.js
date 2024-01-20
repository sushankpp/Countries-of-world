let API_URL = 'data.json';
const detailsContainer = document.querySelector('#details-container');
// Get the country name from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('country');
const body = document.getElementById('body');
const darkMode = document.getElementById('dark-mode');

darkMode.addEventListener('click', () => {
  body.classList.toggle('dark-mode-enable');
});

function createDetailsContainer(country) {
  const detailsElement = document.createElement('div');
  detailsElement.classList.add('detailed-information-container');

  detailsElement.innerHTML = `
    <img src="${country.flags.png}" alt="${
    country.name
  } flag" class="country-image" />
    <div class="description">
      <h1 class="country-name">${country.name}</h1>
      <div class="small-details">
        <p class="native-name">Native Name: <span class="nat-name">${
          country.nativeName
        }</span></p>
        <p class="popu">Population <span class="nums">${
          country.population
        }</span></p>
        <p class="part">Region: <span class="conti">${country.region}</span></p>
        <p class="sub-region">Sub Region: <span class="sub-conti">${
          country.subregion
        }</span></p>
        <p class="capi">Capital: <span class="place">${
          country.capital
        }</span></p>
        <p class="domain">Top Level Domain: <span class="dom">${
          country.topLevelDomain
        }</span></p>
        <p class="currencies">Currencies: <span class="curr">${
          country.currencies[0].name
        }</span></p>
        <p class="language">Languages: <span class="lang">${country.languages
          .map((lang) => lang.name)
          .join(', ')}</span></p>
      </div>

      <div class="neighbors">
        <p>Border Countries:</p>
        <div class="countries">
          ${country.borders
            .map(
              (border) =>
                `<a href="detailedinfo.html?country=${border}" class="neighbor-country">${border}</a>`
            )
            .join('')}
        </div>
      </div>
    </div>
  `;

  return detailsElement;
}

function fetchAndLoadData() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((countries) => {
      // Find the country in the array that matches the selected countryName
      const selectedCountry = countries.find(
        (country) => country.name === countryName
      );

      if (selectedCountry) {
        const detailsElement = createDetailsContainer(selectedCountry);
        detailsContainer.appendChild(detailsElement);
      } else {
        console.error('Country not found');
      }
    })
    .catch((error) => {
      console.error('Error fetching countries', error);
    });
}

fetchAndLoadData();
