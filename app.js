let allCountries = [];

async function loadItems() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        allCountries = data.map(country => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : "N/A",
            population: country.population,
            region: country.region,
            subregion: country.subregion || "N/A",
            flag: country.flags.png
        }));

        displayCountries(allCountries); 
    } catch (error) {
        console.error("Error loading countries:", error);
        document.getElementById("row").innerHTML = "<p class='text-danger'>Failed to load country data.</p>";
    }
}

function displayCountries(countries) {
    let body = "";
    countries.forEach(element => {
        body += `
            <div class="col-md-4 mb-4">
                <div class="card shadow-sm">
                    <img src="${element.flag}" class="card-img-top" alt="Flag of ${element.name}" style="width:100%; height:200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">Capital: ${element.capital}</p>
                        <p class="card-text">Population: ${element.population.toLocaleString()}</p>
                        <p class="card-text">Region: ${element.region}</p>
                        <p class="card-text">Subregion: ${element.subregion}</p>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("row").innerHTML = body;
}

function searchCountry() {
    const txtSearch = document.getElementById("txtSearch").value.toLowerCase();
    if (!txtSearch) {
        displayCountries(allCountries); 
        return;
    }

    const filteredCountries = allCountries.filter(country => 
        country.name.toLowerCase().includes(txtSearch)
    );

    if (filteredCountries.length > 0) {
        displayCountries(filteredCountries);
    } else {
        document.getElementById("row").innerHTML = "<p class='text-danger'>No countries found.</p>";
    }
}

loadItems();
