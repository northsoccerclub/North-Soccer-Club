

function rotateSponsors(start) {
    var sponsorHolder = document.getElementById('sponsorLogo');
    var sponsorLink = document.getElementById('sponsorLink');
    if(start >= sponsorArray.length) {
        start = 0;
    }
    sponsorHolder.src = sponsorArray[start].logo;
    sponsorHolder.alt = sponsorArray[start].name;
    sponsorHolder.title = sponsorArray[start].name;
    sponsorLink.href = sponsorArray[start].url;
    window.setTimeout("rotateSponsors("+(start+1)+")", 15000);
}