// Get the root element
var r = document.querySelector(':root');
var theme;

// Create a function for getting a variable value
function myFunction_get() {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  // Alert the value of the --blue variable
  //alert("The value of --black is: " + rs.getPropertyValue('--black'));
}

// Create a function for setting a variable value
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--black', getlocal('background_color'));
  r.style.setProperty('--1', getlocal('scrollingSpeed'));
  theme = getlocal('theme'); 
}



function createSRC(team) {
    theme = getlocal('theme');
    if (theme == null)
        theme = 'logo'; 

    source = 'images/' + theme + '/' + team + '.png';
    return source;
}

function isHome() {
    //flip horizontally helmets if team is home 
    if (getlocal('theme') == 'helmet')
        return " flip";
    else
        return "";       
}


function set_values()
{
    window.scrollBy(0, 50);
    if (localStorage.getItem("RefreshRate") == null)
    {
        setTimeout(function(){
            window.location.reload(1);
         }, 30000); 
         localStorage.setItem("RefreshRate",'30000');   
    }
    else
    {
        setTimeout(function(){
            window.location.reload(1);
         }, parseInt(localStorage.getItem("RefreshRate")));
    }

    myFunction_set()
    document.getElementById("API_KEY").value = localStorage.getItem("API_KEY");

    if (localStorage.getItem("background_color") == null)
        localStorage.setItem("background_color", 'black');


    if (localStorage.getItem("background_color") == 'image')
        document.getElementById("path").className = "path2";

    document.getElementById(localStorage.getItem("background_color")).checked = true;


    if (localStorage.getItem("WinLossCheckbox") == null)
        localStorage.setItem("WinLossCheckbox", 'FALSE');

    if (localStorage.getItem("WinLossCheckbox") == "TRUE")
        document.getElementById("WinLossCheckbox").checked = true;
    else
        document.getElementById("WinLossCheckbox").checked = false;

    
    if (localStorage.getItem("ProbCheckbox") == null)
        localStorage.setItem("ProbCheckbox", 'FALSE');

    if (localStorage.getItem("ProbCheckbox") == "TRUE")
        document.getElementById("ProbCheckbox").checked = true;
    else
        document.getElementById("ProbCheckbox").checked = false;

  
    if (localStorage.getItem("theme") == null)
        localStorage.setItem("theme", 'logo');

    document.getElementById(localStorage.getItem("theme")).checked = true;
    document.getElementById("scrollingSpeed").value = localStorage.getItem("scrollingSpeed");
    document.getElementById("RefreshRate").value = localStorage.getItem("RefreshRate");
    document.getElementById("webhook_ARI").value = localStorage.getItem("webhook_ARI");
    document.getElementById("webhook_ATL").value = localStorage.getItem("webhook_ATL");
    document.getElementById("webhook_BAL").value = localStorage.getItem("webhook_BAL");
    document.getElementById("webhook_BUF").value = localStorage.getItem("webhook_BUF");
    document.getElementById("webhook_CAR").value = localStorage.getItem("webhook_CAR");
    document.getElementById("webhook_CHI").value = localStorage.getItem("webhook_CHI");
    document.getElementById("webhook_CIN").value = localStorage.getItem("webhook_CIN");
    document.getElementById("webhook_CLE").value = localStorage.getItem("webhook_CLE");
    document.getElementById("webhook_DAL").value = localStorage.getItem("webhook_DAL");
    document.getElementById("webhook_DEN").value = localStorage.getItem("webhook_DEN");
    document.getElementById("webhook_DET").value = localStorage.getItem("webhook_DET");
    document.getElementById("webhook_GB").value = localStorage.getItem("webhook_GB");
    document.getElementById("webhook_HOU").value = localStorage.getItem("webhook_HOU");
    document.getElementById("webhook_IND").value = localStorage.getItem("webhook_IND");
    document.getElementById("webhook_JAX").value = localStorage.getItem("webhook_JAX");
    document.getElementById("webhook_KC").value = localStorage.getItem("webhook_KC");
    document.getElementById("webhook_LV").value = localStorage.getItem("webhook_LV");
    document.getElementById("webhook_LAC").value = localStorage.getItem("webhook_LAC");
    document.getElementById("webhook_LA").value = localStorage.getItem("webhook_LA");
    document.getElementById("webhook_MIA").value = localStorage.getItem("webhook_MIA");
    document.getElementById("webhook_MIN").value = localStorage.getItem("webhook_MIN");
    document.getElementById("webhook_NE").value = localStorage.getItem("webhook_NE");
    document.getElementById("webhook_NO").value = localStorage.getItem("webhook_NO");
    document.getElementById("webhook_NYG").value = localStorage.getItem("webhook_NYG");
    document.getElementById("webhook_NYJ").value = localStorage.getItem("webhook_NYJ");
    document.getElementById("webhook_PHI").value = localStorage.getItem("webhook_PHI");
    document.getElementById("webhook_PIT").value = localStorage.getItem("webhook_PIT");
    document.getElementById("webhook_SF").value = localStorage.getItem("webhook_SF");
    document.getElementById("webhook_SEA").value = localStorage.getItem("webhook_SEA");
    document.getElementById("webhook_TB").value = localStorage.getItem("webhook_TB");
    document.getElementById("webhook_TEN").value = localStorage.getItem("webhook_TEN");
    document.getElementById("webhook_WAS").value = localStorage.getItem("webhook_WAS");
    document.getElementById("webhook_OFF").value = localStorage.getItem("webhook_OFF");
}




function SettingsForm(API_KEY, background_color, theme, scrollingSpeed,WinLossCheckbox,ProbCheckbox) {
    if (document.getElementById('WinLossCheckbox').checked)
        localStorage.setItem("WinLossCheckbox", "TRUE");
    else
        localStorage.setItem("WinLossCheckbox", "FALSE");
        

    if (document.getElementById('ProbCheckbox').checked)
        localStorage.setItem("ProbCheckbox", "TRUE");
    else
        localStorage.setItem("ProbCheckbox", "FALSE");




    localStorage.setItem("API_KEY", API_KEY);
    localStorage.setItem("background_color", checked(background_color));
    localStorage.setItem("theme", checked(theme));
    localStorage.setItem("scrollingSpeed", selected(scrollingSpeed));
    localStorage.setItem("RefreshRate", selected(RefreshRate));
    localStorage.setItem("webhook_ARI", document.getElementById("webhook_ARI").value);
    localStorage.setItem("webhook_ATL", document.getElementById("webhook_ATL").value);
    localStorage.setItem("webhook_BAL", document.getElementById("webhook_BAL").value);
    localStorage.setItem("webhook_BUF", document.getElementById("webhook_BUF").value);
    localStorage.setItem("webhook_CAR", document.getElementById("webhook_CAR").value);
    localStorage.setItem("webhook_CHI", document.getElementById("webhook_CHI").value);
    localStorage.setItem("webhook_CIN", document.getElementById("webhook_CIN").value);
    localStorage.setItem("webhook_CLE", document.getElementById("webhook_CLE").value);
    localStorage.setItem("webhook_DAL", document.getElementById("webhook_DAL").value);
    localStorage.setItem("webhook_DEN", document.getElementById("webhook_DEN").value);
    localStorage.setItem("webhook_DET", document.getElementById("webhook_DET").value);
    localStorage.setItem("webhook_GB", document.getElementById("webhook_GB").value);
    localStorage.setItem("webhook_HOU", document.getElementById("webhook_HOU").value);
    localStorage.setItem("webhook_IND", document.getElementById("webhook_IND").value);
    localStorage.setItem("webhook_JAX", document.getElementById("webhook_JAX").value);
    localStorage.setItem("webhook_KC", document.getElementById("webhook_KC").value);
    localStorage.setItem("webhook_LV", document.getElementById("webhook_LV").value);
    localStorage.setItem("webhook_LAC", document.getElementById("webhook_LAC").value);
    localStorage.setItem("webhook_LA", document.getElementById("webhook_LA").value);
    localStorage.setItem("webhook_MIA", document.getElementById("webhook_MIA").value);
    localStorage.setItem("webhook_MIN", document.getElementById("webhook_MIN").value);
    localStorage.setItem("webhook_NE", document.getElementById("webhook_NE").value);
    localStorage.setItem("webhook_NO", document.getElementById("webhook_NO").value);
    localStorage.setItem("webhook_NYG", document.getElementById("webhook_NYG").value);
    localStorage.setItem("webhook_NYJ", document.getElementById("webhook_NYJ").value);
    localStorage.setItem("webhook_PHI", document.getElementById("webhook_PHI").value);
    localStorage.setItem("webhook_PIT", document.getElementById("webhook_PIT").value);
    localStorage.setItem("webhook_SF", document.getElementById("webhook_SF").value);
    localStorage.setItem("webhook_SEA", document.getElementById("webhook_SEA").value);
    localStorage.setItem("webhook_TB", document.getElementById("webhook_TB").value);
    localStorage.setItem("webhook_TEN", document.getElementById("webhook_TEN").value);
    localStorage.setItem("webhook_WAS", document.getElementById("webhook_WAS").value);
    localStorage.setItem("webhook_OFF", document.getElementById("webhook_OFF").value);
}


function selected(scrollingSpeed) {
    var e = scrollingSpeed;
    var value = e.value;
    return value;
}



function getRefreshRate() {

    if (localStorage.getItem("RefreshRate") == null)
        return parseInt('30');
    else
        return parseInt(localStorage.getItem("RefreshRate"));

}

function checked(radios)
{
    var checked = "";
    for (i = 0 ; i < radios.length; i++)
    {
        if(radios[i].checked) 
            {checked=radios[i].value;}   
    }
    return checked;
}

function getlocal(key)
{
    return localStorage.getItem(key);
}


function generateHTML(away,awayscore,homescore,home)
{
    html =  '<div class=\"game\">';
    html += '<div class=\"score\">';
    html += '<img id=\"' + away + '\" src=\"' + createSRC(away) + '\" class=\"responsive\" alt=\"away\" /> ';
    html += '</div>';
    html += '<div class=\"score\">' + awayscore + ' - ' +  homescore + '</div>';
    html += '<div>';
    html += '<img id=\"' + home + '\" src=\"' + createSRC(home)  + '\" class=\"responsive' + isHome() + '\" alt=\"home\" />';
    html += '</div>';
    html += '</div>';
    return html;
}



function generateHTMLwData(away,awayscore,homescore,home, matchid)
{


    html = '<div class=\"game\">';
    html += '<table><tbody><tr><td>';
    html += '<div class=\"score responsive\" id=\"DivImage\" >';
    html += '<img id=\"' + away + '\" src=\"' + createSRC(away) + '\"  alt=\"away\" /> ';
    html += '</div>';
    html += '</td></tr><tr><td>';
    html +=  '<div id=\"DivProbabilities\">' + away;
        if (localStorage.getItem("WinLossCheckbox") == "TRUE")
            html += ' ' + localStorage.getItem(away + "-games");

        if (localStorage.getItem("ProbCheckbox") == "TRUE")
            html += ' ' + arrow(parseInt(localStorage.getItem(matchid + "-" + away))) + localStorage.getItem(matchid + "-" + away) + '%' ;
    html +=  '</div>';
    html += '</td></tr></tbody></table>';

    html += '<div class=\"score centerScore\">' + awayscore + ' - ' +  homescore + '</div>';

    html += '<table><tbody><tr><td>';
    html += '<div class=\"score responsive\" id=\"DivImage\" >';
    html += '<img id=\"' + home + '\" src=\"' + createSRC(home) + '\" class=\"' + isHome() + '\" alt=\"home\" />';
    html += '</div>';
    html += '</td></tr><tr><td>';
    html +=  '<div id=\"DivProbabilities\">' + home;
        if (localStorage.getItem("WinLossCheckbox") == "TRUE")
            html += ' ' + localStorage.getItem(home + "-games");

        if (localStorage.getItem("ProbCheckbox") == "TRUE")
            html += ' ' + arrow(parseInt(localStorage.getItem(matchid + "-" + home))) + localStorage.getItem(matchid + "-" + home) + '%' ;
    html +=  '</div>';
    html += '</td></tr></tbody></table></div>';
    return html;
}

function arrow(value)
{
    if (value>50)
        return '⬆';
    else
        return '⬇';
}




function generateHTMLStandings(teamAbbreviation, teamName,rank, played, win,loss,draw, goals_for, goals_against, goals_diff)
{
    html = '          <div class=\"game standingsframe\" style=\"background-image: url(\' images/backgrounds/' + teamAbbreviation + '.webp\');border-radius: 10px;\">';
    html +=  '            <div class=\" \">';
    html +=  '                <div>';
    html +=  '                <table>';
    html +=  '                <tbody>';
    html +=  '                  <tr>';
    html +=  '                    <td>';
    html +=  '                          <table style=\"width: 100%;\" >';
    html +=  '                            <tbody>';
    html +=  '                            <tr>';
    html +=  '                            <td><img id=\"' + teamAbbreviation + '\" src=\"' + createSRC(teamAbbreviation) + '\" class=\"responsivelogo\" alt=\"away\" /></td>';
    html +=  '                            <td><p class=\"teamRank\">Rank #' + rank + '</p>';
    html +=  '            				<table class=\"teamtext\">';
    html +=  '              			<tbody>';
    html +=  '              			<tr><td>Games Played: </td><td>' + played + '</td></tr>';
    html +=  '              			<tr><td>Win: </td><td>' + win + '</td></tr>';
    html +=  '              			<tr><td>Loss: </td><td>' + loss + '</td></tr>';
    html +=  '              			<tr><td>Draw: </td><td>' + draw + '</td></tr>';
    html +=  '              			<tr><td>Goals For: </td><td>' + goals_for + '</td></tr>';
    html +=  '              			<tr><td>Goals Against: </td><td>' + goals_against + '</td></tr>';
    html +=  '              			<tr><td>Goals Diffrence: </td><td>' + goals_diff + '</td></tr>';
    html +=  '              			</tbody>';
    html +=  '              			</table>';
    html +=  '                            </td>';
    html +=  '                            </tr>';
    html +=  '                            </tbody>';
    html +=  '                            </table>';
    html +=  '                    </td>';
    html +=  '                  </tr>';
    html +=  '                  <tr>';
    html +=  '                    <td><quote class=\"teamName\">' + teamName + '</quote></td>';
    html +=  '                  </tr>';
    html +=  '                </tbody>';
    html +=  '                </table></div>';
    html +=  '            </div>';
    html +=  '          </div>';
    return html;

}

async function getStandings() 
{        
        var requestOptions = { method: 'GET',  redirect: 'follow', origin: '*'};
        

    let response = await fetch("https://1uu0dgg3ae.execute-api.us-east-1.amazonaws.com/default/nfl?url=https://api.sportradar.com/americanfootball/trial/v2/en/seasons/sr:season:90233/standings.json&round=1&api_key=" + localStorage.getItem("API_KEY"), requestOptions);
        //let response = await fetch("http://localhost:3000/fetch/https://api.sportradar.com/americanfootball/trial/v2/en/seasons/sr:season:90233/standings.json?round=1&api_key=" + localStorage.getItem("API_KEY"), requestOptions);
      //let response = await fetch("https://api.sportradar.com/americanfootball/trial/v2/en/seasons/sr:season:90233/standings.json?round=1&api_key=" + localStorage.getItem("API_KEY"), requestOptions);
        let data = await response.json();
        var myJSON = JSON.stringify(data);
        localStorage.setItem("StandingsJSON",myJSON);
        return data; 
}

async function Standings()
{
    const d = new Date();
    console.log(d);
    Year = d.getFullYear();
    Month = d.getMonth() + 1;
    Day = d.getDate();  
    currentDate = Year+"-"+Month+"-"+Day;

    //Validation to only get standings once per day
    if (localStorage.getItem('Standings-date') == null || localStorage.getItem('Standings-date') != currentDate)
    {


        getStandings()
        .then(result => {
            //standingsDate = result.generated_at;    
            //standingsDate = standingsDate.substring(0,8)+parseInt(standingsDate.substring(9,10));
            standingsDate = new Date();
            YYYY = standingsDate.getFullYear();
            MM = standingsDate.getMonth() + 1;
            DD = standingsDate.getDate();

            if (localStorage.getItem("StandingsJSON").search("The NFL overall table") > 0)
             {
            console.log("Standings-date",YYYY+"-"+MM+"-"+DD);
            localStorage.setItem("Standings-date",YYYY+"-"+MM+"-"+DD);
            console.log("Standings generated at: ",YYYY+"-"+MM+"-"+DD);



            //new Audio('/static/nfl.mp3').play();
            }

        })
        .catch(error => console.log('error: ', error));
    }
    if (IsGameDay() == 'true')
    {
        console.log("Standongs ALREADY OBTAINED, Game day today scores will be displayed and not standings" );}
    else {displayStandings();}
    
}

function displayStandings()
{


    var textHTML = "";
    let text = localStorage.getItem("StandingsJSON");
    let result = JSON.parse(text);



    standings = result.standings[0].groups[0].standings;

    //console.log("si llego");
    
    //console.log(result.standings[0].groups[0].standings);
    for (var i = 0; i < standings.length; i++)
    { 

       teamAbbreviation = standings[i].competitor.abbreviation;
       teamName = standings[i].competitor.name;
       teamID = standings[i].competitor.id;
       rank = standings[i].rank;

       played = standings[i].played;
       win = standings[i].win;
       loss = standings[i].loss;
       draw = standings[i].draw;
       goals_for = standings[i].goals_for;
       goals_against = standings[i].goals_against;
       goals_diff = standings[i].goals_diff;


        if (standings[i].draw>0)
            games = "(" + standings[i].win+","+standings[i].loss+","+standings[i].draw+")";
        else
            games = "(" + standings[i].win+","+standings[i].loss+")";

        console.log(teamAbbreviation + " " + games);
        localStorage.setItem(teamAbbreviation + "-games",games);
        textHTML += generateHTMLStandings(teamAbbreviation, teamName,rank, played, win,loss,draw,goals_for, goals_against, goals_diff);    

    }

    const h2 = document.getElementById("myH2");
    let html = textHTML;
    h2.insertAdjacentHTML("afterend", html);





}



async function getProbabilities() 
{
    //var requestOptions = {method: 'GET', redirect: 'follow', 'Access-Control-Allow-Origin': 'https://api.sportradar.com', referrerPolicy: 'origin-when-cross-origin', mode: 'no-cors'};
    var requestOptions = { method: 'GET',  redirect: 'follow', origin: '*'};
    
    // let response = await fetch("http://localhost:3000/fetch/https://api.sportradar.com/americanfootball/trial/v2/en/seasons/sr:season:90233/probabilities.json?api_key=" + localStorage.getItem("API_KEY") , requestOptions);
    //let response = await fetch("https://i57hmdn6xa.execute-api.us-west-2.amazonaws.com/default/probabilities?url=https://api.sportradar.com/americanfootball/trial/v2/en/seasons/sr:season:90233/probabilities.json?api_key=" + localStorage.getItem("API_KEY"), requestOptions);
    let response = await fetch("https://1uu0dgg3ae.execute-api.us-east-1.amazonaws.com/default/nfl?url=https://api.sportradar.com/americanfootball/trial/v2/en/seasons/sr:season:90233/probabilities.json&api_key=" + localStorage.getItem("API_KEY"), requestOptions);

    //let response = await fetch("https://api.sportradar.com/americanfootball/trial/v2/en/seasons/sr:season:90233/probabilities.json?api_key=" + localStorage.getItem("API_KEY") , requestOptions);
        let data = await response.json();
        return data; 
}


async function Probabilities()
{
    const d = new Date();
    
    Year = d.getFullYear();
    Month = d.getMonth() + 1;
    Day = d.getDate();  
    currentDate = Year+"-"+Month+"-"+Day;
    console.log("Probabilites consulted on: ", localStorage.getItem('Probabilities-date'));
    var ProbabilitiesLength = 0;
    //Validation to only get Probabilities once per day
    if (localStorage.getItem('Probabilities-date') == null || localStorage.getItem('Probabilities-date') != currentDate)
    {
                console.log("Getting Probabilities...");
                let text="";
                getProbabilities()
                .then(result => {

                    if (result.sport_event_probabilities.length>0) 
                        ProbabilitiesLength = result.sport_event_probabilities.length;
                    else
                        ProbabilitiesLength = 0;
                
                    for (var i = 0; i < ProbabilitiesLength; i++)
                    {
                        event_id =  result.sport_event_probabilities[i].sport_event.id;
                        home = result.sport_event_probabilities[i].sport_event.competitors[0].abbreviation;
                        away = result.sport_event_probabilities[i].sport_event.competitors[1].abbreviation;
                        home_probability = result.sport_event_probabilities[i].markets[0].outcomes[0].probability;
                        away_probability = result.sport_event_probabilities[i].markets[0].outcomes[1].probability;
                        //Show Probabilities on Console
                        console.log(event_id + " " + home + " " + home_probability + " " + away + " " + away_probability);
                        //store today probabilities
                        localStorage.setItem(event_id + "-" + home,home_probability);
                        localStorage.setItem(event_id + "-" + away,away_probability);
                            //store current date
                        localStorage.setItem('Probabilities-date',currentDate);
                    }
                })
                .catch(error => console.log('error: ', error));
    }
    else { console.log("Probabilites already generated.")}
}



async function getScores()
{
    var requestOptions = { method: 'GET',  redirect: 'follow'};
    let response = await fetch("https://1uu0dgg3ae.execute-api.us-east-1.amazonaws.com/default/nfl?url=https://api.sportradar.com/americanfootball/trial/v2/en/schedules/live/summaries.json&api_key=" + localStorage.getItem("API_KEY" ), requestOptions);
    let data = await response.json();
    return data;
}


function IsGameDay()
{
    const d = new Date();
    let dateUTC = d.getUTCDate();
    let day = d.getUTCDay();
    let hour = d.getUTCHours();
    console.log("UTC date: "+ dateUTC +" CST date:" + d + "Day:" + day + "hour: " + hour);

    if ((day == 0 && hour > 17 ) || (day == 1 && hour <= 5)|| (day == 2 && hour >= 1) || (day == 2 && hour <= 4)  || (day == 4 && hour < 23) || (day == 6 && hour >= 17)|| (day == 5 && hour < 4 ) )  { console.log("GAME DAY"); return 'true';} 
    else
        return 'false';
}

async function Scores()
{
    var textHTML = "";
    var teamhome;
    var teamhomeabbreviation;
    var teamaway;
    var teamawayabbreviation;
    var teamawayscore;
    var status;
    var matchstatus;
    

    
    getScores()
      .then (result => 
        {
            timestamp = result.generated_at;
            for (let i=0;i<result.summaries.length; i++)
            {
     
                if (result.summaries[i].sport_event.sport_event_context.competition.name == 'NFL' )
                {
                    matchid = result.summaries[i].sport_event.id
                    teamhome = result.summaries[i].sport_event.competitors[0].name;
                    teamhomeabbreviation = result.summaries[i].sport_event.competitors[0].abbreviation;
                    teamhomescore = result.summaries[i].sport_event_status.home_score;
                    teamaway = result.summaries[i].sport_event.competitors[1].name;
                    teamawayabbreviation = result.summaries[i].sport_event.competitors[1].abbreviation;
                    teamawayscore = result.summaries[i].sport_event_status.away_score;
                    matchstatus = result.summaries[i].sport_event_status;

                    if (localStorage.getItem("WinLossCheckbox") == "TRUE" || localStorage.getItem("ProbCheckbox") == "TRUE" )
                        textHTML += generateHTMLwData(teamawayabbreviation,teamawayscore,teamhomescore,teamhomeabbreviation,matchid);
                    else
                        textHTML += generateHTML(teamawayabbreviation,teamawayscore,teamhomescore,teamhomeabbreviation) ; 

                    console.log("id: " + i + " Match ID: " + matchid + " " + teamhomeabbreviation + " " + teamhomescore + "-" + teamawayscore + " " + teamawayabbreviation);
                    validateGame(matchid,teamawayabbreviation,teamawayscore,teamhomeabbreviation,teamhomescore,teamaway,teamhome);
                }
            }
            //console.log(textHTML);
            const h2 = document.getElementById("myH2");
            let html = textHTML;
            h2.insertAdjacentHTML("afterend", html);
        } )
      .catch(error => console.log('error: ', error));

}


function validateGame(matchid,teamawayabbreviation,teamawayscore,teamhomeabbreviation,teamhomescore,teamaway,teamhome)
{
    
    if (localStorage.getItem(matchid+"-away-score-"+teamawayabbreviation) == null)
        {
            localStorage.setItem(matchid+"-away-score-"+teamawayabbreviation, teamawayscore);
            console.log("Created record for " + teamawayabbreviation + " playing away with score:" + teamawayscore);
        }
    else
        {
            if (localStorage.getItem(matchid+"-away-score-"+teamawayabbreviation) == teamawayscore)
                console.log("No score change " + teamawayabbreviation + " playing away with score:" + teamawayscore);
            else
                {
                    isTouchdown(matchid, teamawayabbreviation, teamawayscore, 'away' ,teamaway);
                    console.log("Score Change on away team " + teamawayabbreviation);
                    localStorage.setItem(matchid+"-away-score-"+teamawayabbreviation, teamawayscore);
                }
        }
    
    
    if (localStorage.getItem(matchid+"-home-score-"+teamhomeabbreviation) == null)
        {
            localStorage.setItem(matchid+"-home-score-"+teamhomeabbreviation, teamhomescore);
            console.log("Created record for " + teamhomeabbreviation + " playing home with score:" + teamhomescore);
        }
        else
        {
            if (localStorage.getItem(matchid+"-home-score-"+teamhomeabbreviation) == teamhomescore)
                console.log("No score change " + teamhomeabbreviation + " playing home with score:" + teamhomescore );
            else
                {
                    console.log("Score Change on home team " + teamhomeabbreviation);
                    isTouchdown(matchid, teamhomeabbreviation, teamhomescore, 'home' , teamhome);
                    localStorage.setItem(matchid+"-home-score-"+teamhomeabbreviation, teamhomescore);
                }
        }
    console.log("--------------------------");
}


function isTouchdown(matchid,team,score,playingAt,teamname)
{

    if ((parseInt(score) - parseInt(localStorage.getItem(matchid+"-"+playingAt+"-score-"+team)) ) >=6 )
    {
        console.log("TOUCHDOWN: " + team);
        displayTouchdown(team,teamname);
        if (localStorage.getItem("webhook_" + team) != null) 
            fetch(localStorage.getItem("webhook_" + team));
    }   
}


function  displayTouchdown(team, teamname) 
{

    let html = "";

    html =  '<div class=\"game\">';
    html += '<div class=\"score animate__animated animate__heartBeat animate__faster animate__infinite\">';
    html += '<img id=\"' + team + '\" src=\"' + createSRC(team) + '\" class=\"responsive\" alt=\"away\" /> ';
    html += '</div>';
    html += '<div class=\"score animate__animated animate__shakeY animate__faster animate__infinite\" > Touchdown🏈' + teamname + ' </div>';
    html += '<div class=\"score score animate__animated animate__heartBeat animate__faster animate__infinite\">';
    html += '<img id=\"' + team + '\" src=\"' + createSRC(team) + '\" class=\"responsive\" alt=\"away\" /> ';
    html += '</div>';

    html += '</div>';
    const h2 = document.getElementById("myH2");
    h2.insertAdjacentHTML("afterend", html);

}

function clickimage(webhook)
{
    fetch(localStorage.getItem(webhook));
}
