
async function cricket() {
    let cricketMatches = await axios.get("https://api.cricapi.com/v1/currentMatches?apikey=e46af47b-b33e-4979-b894-85deb8875010&offset=0");
    let data = cricketMatches.data.data;
    console.log(data.length)
    let pageBody = document.createElement('div');
    pageBody.classList.add('pageBody');
    document.body.appendChild(pageBody);
    data.map(matches => {
        let team1_score = "";
        let team2_score = "";
        if (matches.matchStarted) {
            team1_score = `${matches.teamInfo[0].shortname}   ${matches.score[0].r}/${matches.score[0].w}(${matches.score[0].o})`;
            team2_score = `${matches.teamInfo[1].shortname}   ${matches.score[1].r}/${matches.score[1].w}(${matches.score[1].o})`;
        }
        else {
            team1_score = `${matches.teamInfo[0].shortname} 0/0(0)`;
            team2_score = `${matches.teamInfo[1].shortname}   0/0(0)`;

        }

        let status = matches.status
        let team1_img = matches.teamInfo[0].img
        let team2_img = matches.teamInfo[1].img
        let matchName = matches.name;
        let infoStr = document.createElement('div');
        let infoSpan = document.createElement('span');
        infoStr.classList.add('infoStr');
        infoSpan.classList.add('infoSpan');




        // function declaration


        function getSubstringAfterT(dateTimeString) {
            // Find the index of the character 'T'
            const indexOfT = dateTimeString.indexOf('T');

            // If 'T' is found and it's not the last character
            if (indexOfT !== -1 && indexOfT < dateTimeString.length - 1) {
                // Extract the substring after 'T'
                const substringAfterT = dateTimeString.substring(indexOfT + 1);
                return substringAfterT;
            } else {
                // 'T' not found or it's the last character
                return null; // Or you can return an empty string or handle it differently based on your requirements
            }
        }

        // Example usage:
        const dateTimeString = matches.dateTimeGMT;
        const substringAfterT = getSubstringAfterT(dateTimeString);


        //DOM creation
        let br = document.createElement('br');


        let structure = document.createElement('div');
        structure.classList.add('structure');
        pageBody.appendChild(structure);
        let scoreCard = document.createElement('div');
        scoreCard.classList.add("scoreCard");
        structure.appendChild(scoreCard);


        let matchInfo = document.createElement('div');
        matchInfo.classList.add('matchInfo')


        let matchNo = document.createElement('p');
        matchNo.classList.add('match-no');
        matchNo.innerHTML = `<b>CricAPI Tournament Match : </b> ${matchName}`;
        scoreCard.appendChild(matchNo);
        scoreCard.appendChild(br);



        let team1Img = document.createElement('img');
        team1Img.src = team1_img;
        scoreCard.appendChild(team1Img);


        let team1Score = document.createElement('b');
        team1Score.textContent = team1_score;
        scoreCard.appendChild(team1Score);
        team1Score.classList.add('innings')


        scoreCard.appendChild(document.createElement('br'));

        let team2Img = document.createElement('img');
        team2Img.src = team2_img;
        scoreCard.appendChild(team2Img);




        let team2Score = document.createElement('b');
        team2Score.textContent = team2_score;
        scoreCard.appendChild(team2Score);
        team2Score.classList.add('innings')

        scoreCard.appendChild(br);
        let matchStatus = document.createElement('div')
        matchStatus.textContent = `${status}`;
        matchStatus.classList.add('status');
        scoreCard.appendChild(matchStatus);

        let btn = document.createElement("button");
        btn.classList.add('btn');
        btn.innerHTML = `<img src="./img/down.png">`;
        scoreCard.appendChild(btn);

        structure.appendChild(matchInfo);
        matchInfo.appendChild(infoStr);
        infoStr.append(infoSpan);

        let MInfo = document.createElement('p');
        MInfo.innerText = 'More Information About Match';
        MInfo.classList.add("MInfo");
        infoSpan.appendChild(MInfo);

        let typeImg = document.createElement('img');
        typeImg.classList.add('infoImg');
        typeImg.src = "./img/matchType.png"
        infoSpan.appendChild(typeImg);

        let matchType = document.createElement('span');
        matchType.classList.add('infoEle');
        matchType.innerText = `It's ${matches.matchType} Match`;
        infoSpan.appendChild(matchType);
        infoSpan.appendChild(document.createElement("br"));


        let dateImg = document.createElement('img')
        dateImg.classList.add('infoImg');
        dateImg.src = "./img/date.png"
        infoSpan.appendChild(dateImg);
        let date = document.createElement('span');
        date.innerText = matches.date;
        date.classList.add('infoEle');
        infoSpan.appendChild(date);

        infoSpan.appendChild(document.createElement("br"));




        let venueImg = document.createElement('img')
        venueImg.classList.add('infoImg');
        venueImg.src = "./img/location.png"
        infoSpan.appendChild(venueImg);
        let venue = document.createElement('span');
        venue.innerText = matches.venue;
        venue.classList.add('infoEle');
        infoSpan.appendChild(venue);

        infoSpan.appendChild(document.createElement("br"));


        let timeImg = document.createElement('img')
        timeImg.classList.add('infoImg');
        timeImg.src = "./img/time.png"
        infoSpan.appendChild(timeImg);
        let time = document.createElement('span');
        time.innerText = substringAfterT;
        time.classList.add('infoEle');
        infoSpan.appendChild(time);

    })
    let buttons = document.querySelectorAll(".btn");
    var panels = document.querySelectorAll('.matchInfo');
    let scoreCards = document.querySelectorAll('.scoreCard')
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            this.classList.toggle("active");
            if (panels[i].style.display == "flex") {
                panels[i].style.display = "none";
                buttons[i].innerHTML = `<img src="./img/down.png"/>`
                scoreCards[i].style.borderRadius = "20px";
            } else {
                panels[i].style.display = "flex";
                buttons[i].innerHTML = `<img src="./img/up.png"/>`
                scoreCards[i].style.borderRadius = "20px 20px 0 0";

            }
        })
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            buttons[i].classList.toggle("active");
            // Get the next sibling element
            // Toggle the display of the next sibling element
            if (panels[i].style.maxHeight) {
                panels[i].style.maxHeight = null;
            } else {
                panels[i].style.maxHeight = panels[i].scrollHeight + "px";
            }

        })
    }
}

cricket();