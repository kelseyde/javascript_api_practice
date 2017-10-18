var url = "https://restcountries.eu/rest/v2/all";
var countries = null;

var addCountriesToList = function(countries) {
  var select = document.getElementById("dropdown");
  countries.forEach(function(country) {
    var option = document.createElement("option");
    option.value = country.name;
    option.innerText = country.name;
    select.appendChild(option);
  });
}

var makeRequest = function(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", function() {
    countries = JSON.parse(this.responseText);
    console.log(countries);
    addCountriesToList(countries);
  });
  request.send();
  setUpCountryInfo();
}

var setUpCountryInfo = function() {
  window.addEventListener("change", function() {
    var select = document.getElementById("dropdown");
    var country = countries[select.selectedIndex];
    var name = document.getElementById('country-name');
    name.innerText = country.name;
    var population = document.getElementById("country-population");
    population.innerText = country.population;
    var capital = document.getElementById("country-capital");
    capital.innerText = country.capital;

    //add to local storage
    var countryJSON = JSON.stringify(country);
    localStorage.setItem(country.name, countryJSON);
  })
  setUpCountryBorderInfo();
}

var setUpCountryBorderInfo = function() {
  window.addEventListener("change", function() {
    var select = document.getElementById("dropdown");
    var country = countries[select.selectedIndex];

    var borderCountryArray = country.borders.map( function(borderIso) {
      return countries.find( function(country) {
        return country.alpha3Code === borderIso
      })
    })

    var ul = document.getElementById("border-country-list");
    borderCountryArray.forEach(function(borderCountry) {
      var name = document.createElement("h4");
      name.innerText = borderCountry.name;

      var borderUl = document.createElement("ul");

      var population = document.createElement("li");
      population.innerText = borderCountry.population;

      var capital = document.createElement("li");
      capital.innerText = borderCountry.capital;

      borderUl.appendChild(population);
      borderUl.appendChild(capital);

      ul.appendChild(name);
      ul.appendChild(borderUl);
    });

  });
}




makeRequest(url)

// window.addEventListener("load", app);


// var button = document.getElementById("btn");
// button.isSelected = false;
//
// button.addEventListener("click", function() {
//   button.isSelected = !(button.isSelected);
//   if(button.isSelected) { makeRequest(url); }
//   if(!button.isSelected) {
//     var select = document.getElementById("countries");
//     while (select.firstChild) {select.removeChild(select.firstChild)
//     }
//   }
// })
