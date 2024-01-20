let API_URL = 'data.json';

const countriesContainer = document.getElementById('countries-container');
const selectedContinent = document.getElementById('SelectRegion');
const inputVal = document.getElementById('search');
const body = document.getElementById('body');
const darkMode= document.getElementById('dark-mode');

darkMode.addEventListener('click', ()=>{
    body.classList.toggle('dark-mode-enable');
})


selectedContinent.addEventListener('change', (e) => {
  const selectedRegion = e.target.value;

  fetchAndLoadData(selectedRegion);
});

console.log(countriesContainer);

function createCountriesElement(country) {
  const countryElement = document.createElement('div');
  countryElement.classList.add('country');

  countryElement.innerHTML = `
     <a href="detailedInfo.html?country=${country.name}">
     <img
       src="${country.flags.png}"
       alt="${country.name} Flag"
       class="country-img"
     />
     <div class="desc">
       <h2 class="name">${country.name}</h2>
       <p class="population">
         Population: <span class="number">${country.population}</span>
       </p>
       <p class="region">Region: <span class="continent">${country.region}</span></p>
       <p class="capital">Capital: <span class="city">${country.capital}</span></p>
     </div>
   </a>
   `;

  return countryElement;
}

async function fetchAndLoadData(selectedRegion) {
  try {
    const response = await fetch(API_URL);
    const countries = await response.json();

    const filteredCountries = selectedRegion
      ? countries.filter((country) => country.region === selectedRegion)
      : countries;

    countriesContainer.innerHTML = '';

    filteredCountries.forEach((country) => {
      const countryElement = createCountriesElement(country);
      countriesContainer.appendChild(countryElement);

      countryElement.addEventListener('click', () => {
        window.location.href = `details.html?country=${country.name}`;
      });
    });
  } catch (error) {
    console.error('Error fetching countries', error);
  }
}

fetchAndLoadData();
