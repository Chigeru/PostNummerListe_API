const apiSite = 'https://api.dataforsyningen.dk/postnumre/';
const zipCodes = [];
fetch(apiSite)
    .then(blob => blob.json())
    .then(data => zipCodes.push(...data));


function findMatches(wordToMatch, zipCodes) {
    return zipCodes.filter(zip => {
        const regex = new RegExp(wordToMatch, 'gi');
        const regexExactList = new RegExp("^" + wordToMatch, 'gi');


        return zip.nr.match(regexExactList) || zip.navn.match(regex);
    })
}

function displayMatches() {
    const matchArray = findMatches(this.value, zipCodes);
    const html = matchArray.map(zip => {
        const regex = new RegExp(this.value, 'gi');

        let zipUnits = `<div class="zipListUnit"> <span>${zip.nr} ${zip.navn}</span><div>`;
        zip.kommuner.forEach(element => {
            zipUnits = zipUnits + `<span>${element.kode}</span><span> ${element.navn}<br/></span>`
        });

        zipUnits = zipUnits + `</div></div>`;
        return zipUnits;
    }).join('');
    if (html == 0) {
        suggenstions.innerHTML = '<p>No data</p>'
        columnName.innerHTML = "";
    } else {
        suggenstions.innerHTML = html;
        columnName.innerHTML = "<div><span>Postnummer & by</span></div><div><span>Kommune nummer & navn</span></div>";
    }
}
const searchInput = document.querySelector('.search');
const suggenstions = document.querySelector('.list');
const columnName = document.querySelector('.indhold');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

