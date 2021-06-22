const apiSite = 'https://api.dataforsyningen.dk/postnumre/';
const zipCodes = [];
fetch(apiSite)
    .then(blob => blob.json())
    .then(data => zipCodes.push(...data));


function findMatches(wordToMatch, zipCodes) {
    return zipCodes.filter(zip => {
        const regex = new RegExp(wordToMatch, 'gi');
        const regexExactOne = new RegExp("\\b" + wordToMatch +'\\b');
        const regexExactList = new RegExp("\\b" + wordToMatch +'\\b', 'gi');

            
            return zip.nr.match(regexExactOne) || 
            zip.navn.match(regex);
        
    })
}

function displayMatches() {
    const matchArray = findMatches(this.value, zipCodes);
    const html = matchArray.map(zip => {
        const regex = new RegExp(this.value, 'gi');

        let zipUnits = `<div class="zipListUnit"> <span>${zip.nr} ${zip.navn}</span><div>`; 
        zip.kommuner.forEach(element => {
            zipUnits = zipUnits +`<span>${element.kode} ${element.navn}</span><br/>`
        });
        
        zipUnits = zipUnits + `</div></div>` ;
        return zipUnits;
    }).join('');
    suggenstions.innerHTML = html;
}
const searchInput = document.querySelector('.search');
const suggenstions = document.querySelector('.holderList');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);