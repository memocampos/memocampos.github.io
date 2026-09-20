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

// Always the team's actual logo, regardless of the selected theme, for the standings card's badge.
function createLogoSRC(team) {
    return 'images/logo/' + team + '.png';
}

// The live standings/scores/probabilities API has no color or conference field (checked the
// actual response), so standings cards are themed from this static table of official team
// brand colors and divisions instead. "accent" is a brighter/lighter shade of each team's
// palette, picked for legibility as text/icon color over a dark card background.
var TEAM_INFO = {
    ARI: { primary: '#97233F', accent: '#FFFFFF', division: 'NFC West' },
    ATL: { primary: '#A71930', accent: '#A5ACAF', division: 'NFC South' },
    BAL: { primary: '#241773', accent: '#C60C30', division: 'AFC North' },
    BUF: { primary: '#00338D', accent: '#C60C30', division: 'AFC East' },
    CAR: { primary: '#0085CA', accent: '#BFC0BF', division: 'NFC South' },
    CHI: { primary: '#0B162A', accent: '#C83803', division: 'NFC North' },
    CIN: { primary: '#FB4F14', accent: '#FFFFFF', division: 'AFC North' },
    CLE: { primary: '#311D00', accent: '#FF3C00', division: 'AFC North' },
    DAL: { primary: '#041E42', accent: '#869397', division: 'NFC East' },
    DEN: { primary: '#002244', accent: '#FB4F14', division: 'AFC West' },
    DET: { primary: '#0076B6', accent: '#B0B7BC', division: 'NFC North' },
    GB: { primary: '#203731', accent: '#FFB612', division: 'NFC North' },
    HOU: { primary: '#03202F', accent: '#A71930', division: 'AFC South' },
    IND: { primary: '#002C5F', accent: '#A2AAAD', division: 'AFC South' },
    JAX: { primary: '#101820', accent: '#D7A22A', division: 'AFC South' },
    KC: { primary: '#E31837', accent: '#FFB81C', division: 'AFC West' },
    LV: { primary: '#000000', accent: '#A5ACAF', division: 'AFC West' },
    LAC: { primary: '#0080C6', accent: '#FFC20E', division: 'AFC West' },
    LA: { primary: '#003594', accent: '#FFA300', division: 'NFC West' },
    MIA: { primary: '#008E97', accent: '#FC4C02', division: 'AFC East' },
    MIN: { primary: '#4F2683', accent: '#FFC62F', division: 'NFC North' },
    NE: { primary: '#002244', accent: '#C60C30', division: 'AFC East' },
    NO: { primary: '#101820', accent: '#D3BC8D', division: 'NFC South' },
    NYG: { primary: '#0B2265', accent: '#A71930', division: 'NFC East' },
    NYJ: { primary: '#125740', accent: '#FFFFFF', division: 'AFC East' },
    PHI: { primary: '#004C54', accent: '#A5ACAF', division: 'NFC East' },
    PIT: { primary: '#101820', accent: '#FFB612', division: 'AFC North' },
    SEA: { primary: '#002244', accent: '#69BE28', division: 'NFC West' },
    SF: { primary: '#AA0000', accent: '#B3995D', division: 'NFC West' },
    TB: { primary: '#34302B', accent: '#FF7900', division: 'NFC South' },
    TEN: { primary: '#0C2340', accent: '#4B92DB', division: 'AFC South' },
    WAS: { primary: '#5A1414', accent: '#FFB612', division: 'NFC East' }
};

function getTeamInfo(team) {
    return TEAM_INFO[team] || { primary: '#0b1220', accent: '#FFD966', division: '' };
}

// "R, G, B" form of a #rrggbb hex color, so CSS can use it inside rgba(var(--x), alpha)
// to tint the standings card's dark overlay with the team's own color instead of plain black.
function hexToRgbTriplet(hex) {
    var clean = hex.replace('#', '');
    var r = parseInt(clean.substring(0, 2), 16);
    var g = parseInt(clean.substring(2, 4), 16);
    var b = parseInt(clean.substring(4, 6), 16);
    return r + ', ' + g + ', ' + b;
}

function isHome() {
    //flip horizontally helmets if team is home 
    if (getlocal('theme') == 'helmet')
        return " flip";
    else
        return "";
}


function set_values() {
    // Scroll the Settings toggle out of view on load. Measured off its own rendered
    // height (rather than a fixed pixel guess) so it stays fully hidden even if the
    // toggle's size changes later.
    var settingsToggle = document.querySelector('.collapsible');
    window.scrollBy(0, settingsToggle ? settingsToggle.getBoundingClientRect().bottom + 10 : 50);

    // Scores now refresh in place via startScorePolling() instead of a periodic full-page
    // reload, so the ticker scroll animation never restarts. Settings changes (theme,
    // background, etc.) still apply via the Settings form's normal full-page submit.
    if (localStorage.getItem("RefreshRate") == null)
        localStorage.setItem("RefreshRate", '30000');

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
    document.getElementById("webhook_NFL").value = localStorage.getItem("webhook_NFL");
    document.getElementById("webhook_OFF").value = localStorage.getItem("webhook_OFF");
}




function SettingsForm(API_KEY, background_color, theme, scrollingSpeed, WinLossCheckbox, ProbCheckbox) {
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
    localStorage.setItem("webhook_NFL", document.getElementById("webhook_NFL").value);
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

function checked(radios) {
    var checked = "";
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) { checked = radios[i].value; }
    }
    return checked;
}

function getlocal(key) {
    return localStorage.getItem(key);
}


function generateHTML(away, awayscore, homescore, home, matchid) {
    html = '<div class=\"game\" id=\"game-' + matchid + '\">';
    html += '<div class=\"score\">';
    html += '<img id=\"' + away + '\" src=\"' + createSRC(away) + '\" class=\"responsive\" alt=\"away\" /> ';
    html += '</div>';
    html += '<div class=\"score\" id=\"scoretext-' + matchid + '\">' + awayscore + ' - ' + homescore + '</div>';
    html += '<div>';
    html += '<img id=\"' + home + '\" src=\"' + createSRC(home) + '\" class=\"responsive' + isHome() + '\" alt=\"home\" />';
    html += '</div>';
    html += '</div>';
    return html;
}


// Shared by generateHTMLwData (initial render) and updateOrCreateGame (live poll refresh),
// so the record/probability text stays identical whether it's just been created or updated in place.
function buildProbLineContent(team, matchid) {
    var text = team;
    if (localStorage.getItem("WinLossCheckbox") == "TRUE")
        text += ' ' + sessionStorage.getItem(team + "-games");

    if (localStorage.getItem("ProbCheckbox") == "TRUE")
        text += ' ' + arrow(parseInt(sessionStorage.getItem(matchid + "-" + team))) + sessionStorage.getItem(matchid + "-" + team) + '%';
    return text;
}


function generateHTMLwData(away, awayscore, homescore, home, matchid) {

    html = '<div class=\"game\" id=\"game-' + matchid + '\">';
    html += '<table><tbody><tr><td>';
    html += '<div class=\"score responsive\" id=\"DivImage\" >';
    html += '<img id=\"' + away + '\" src=\"' + createSRC(away) + '\"  alt=\"away\" /> ';
    html += '</div>';
    html += '</td></tr><tr><td>';
    html += '<div id=\"probline-' + matchid + '-' + away + '\">' + buildProbLineContent(away, matchid) + '</div>';
    html += '</td></tr></tbody></table>';

    html += '<div class=\"score centerScore\" id=\"scoretext-' + matchid + '\">' + awayscore + ' - ' + homescore + '</div>';

    html += '<table><tbody><tr><td>';
    html += '<div class=\"score responsive\" id=\"DivImage\" >';
    html += '<img id=\"' + home + '\" src=\"' + createSRC(home) + '\" class=\"' + isHome() + '\" alt=\"home\" />';
    html += '</div>';
    html += '</td></tr><tr><td>';
    html += '<div id=\"probline-' + matchid + '-' + home + '\">' + buildProbLineContent(home, matchid) + '</div>';
    html += '</td></tr></tbody></table></div>';
    return html;
}

function arrow(value) {
    if (value > 50)
        return '⬆';
    else
        return '⬇';
}




// The standings API's `round` reflects the week about to be played, not the one whose
// results are shown (e.g. team records still show only 1 game played while round is already
// 2), so the displayed week is that minus one. The regular season is 17 weeks, after which
// this is the playoff picture rather than a week-by-week one.
function getWeekSummaryLabel(round) {
    var completedWeek = round - 1;
    if (completedWeek < 1)
        completedWeek = 1;
    if (completedWeek > 17)
        return 'PLAYOFF SUMMARY';
    return 'WEEK ' + completedWeek + ' SUMMARY';
}

function generateHTMLStandings(teamAbbreviation, teamName, rank, win, loss, draw, goals_for, goals_against, goals_diff, week) {
    var diffIcon = goals_diff < 0 ? '&#9660;' : '&#9650;'; // triangle flips for a negative differential
    var diffValue = goals_diff > 0 ? ('+' + goals_diff) : goals_diff;
    var info = getTeamInfo(teamAbbreviation);
    var cardStyle = 'background-image: url(\'images/backgrounds/' + teamAbbreviation + '.webp\'); --team-primary: ' + info.primary + '; --team-primary-rgb: ' + hexToRgbTriplet(info.primary) + '; --team-accent: ' + info.accent + ';';

    var html = '<div class=\"game standingscard\" style=\"' + cardStyle + '\">';
    html += '<div class=\"standingscard-scrim\">';

    html += '<div class=\"standingscard-top\">';
    html += '<div class=\"rank-pill\">';
    html += '<img class=\"rank-pill-logo\" src=\"' + createLogoSRC(teamAbbreviation) + '\" alt=\"' + teamAbbreviation + ' logo\" />';
    html += '<div class=\"rank-pill-divider\"></div>';
    html += '<div class=\"rank-pill-info\"><span class=\"rank-pill-label\">RANK</span><span class=\"rank-pill-division\">' + info.division + '</span></div>';
    html += '<span class=\"rank-pill-number\">#' + rank + '</span>';
    html += '</div>';
    html += '</div>';

    html += '<div class=\"standingscard-middle\">';
    html += '<div class=\"standingscard-hero\">';
    html += '<img src=\"images/helmet/' + teamAbbreviation + '.png\" class=\"hero-image\" alt=\"' + teamAbbreviation + '\" />';
    html += '</div>';

    // Ties are rare in the NFL, so only show the "-D" part of the record once a team
    // actually has one instead of always displaying a confusing "-0".
    var recordLabel = draw > 0 ? '(W-L-D)' : '(W-L)';
    var recordValue = draw > 0 ? (win + '-' + loss + '-' + draw) : (win + '-' + loss);

    html += '<div class=\"stats-panel\">';
    html += '<div class=\"stats-record-label\">RECORD <span>' + recordLabel + '</span></div>';
    html += '<div class=\"stats-record-value\">' + recordValue + '</div>';
    html += '<div class=\"stats-row\"><span class=\"stats-row-label\">POINTS FOR <span>(PF)</span></span><span class=\"stats-row-value\">' + goals_for + ' <i class=\"stat-icon icon-plus\">+</i></span></div>';
    html += '<div class=\"stats-row\"><span class=\"stats-row-label\">POINTS AGAINST <span>(PA)</span></span><span class=\"stats-row-value\">' + goals_against + ' <i class=\"stat-icon icon-minus\">&#8722;</i></span></div>';
    html += '<div class=\"stats-row\"><span class=\"stats-row-label\">POINTS DIFF.</span><span class=\"stats-row-value\">' + diffValue + ' <i class=\"stat-icon icon-tri\">' + diffIcon + '</i></span></div>';
    html += '</div>';
    html += '</div>';

    html += '<div class=\"week-summary\"><img src=\"images/NFL.png\" alt=\"NFL\" /> ' + getWeekSummaryLabel(week) + '</div>';
    html += '<div class=\"team-banner\">' + teamName + '</div>';

    html += '</div>';
    html += '</div>';
    return html;
}

async function getStandings() {
    var requestOptions = { method: 'GET', redirect: 'follow', origin: '*' };
    let response = await fetch("https://vyidloxhgnzajfy5slqzmswtau0olabe.lambda-url.us-west-1.on.aws/?action=standings", requestOptions);
    let data = await response.json();
    var myJSON = JSON.stringify(data);
    sessionStorage.setItem("StandingsJSON", myJSON);
    sessionStorage.setItem("touchdown","false");
    return data;
}

async function Standings() {
    const d = new Date();
    console.log(d);
    Year = d.getFullYear();
    Month = d.getMonth() + 1;
    Day = d.getDate();
    currentDate = Year + "-" + Month + "-" + Day;
    var textHTML = "";

    //Validation to only get standings once per day
    if (sessionStorage.getItem('Standings-date') == null || sessionStorage.getItem('Standings-date') != currentDate) {

        getStandings()
            .then(result => {

                //standingsDate = result.generated_at;    
                //standingsDate = standingsDate.substring(0,8)+parseInt(standingsDate.substring(9,10));
                standingsDate = new Date();
                YYYY = standingsDate.getFullYear();
                MM = standingsDate.getMonth() + 1;
                DD = standingsDate.getDate();

                if (sessionStorage.getItem("StandingsJSON").search("The NFL overall table") > 0) {





                    var standings;
                    let text = sessionStorage.getItem("StandingsJSON");
                    let result = JSON.parse(text);

                    console.log(result.standings[0].groups[0].standings);

                    standings = result.standings[0].groups[0].standings;





                    for (var i = 0; i < standings.length; i++) {

                        teamAbbreviation = standings[i].competitor.abbreviation;
                        teamName = standings[i].competitor.name;
                        teamID = standings[i].competitor.id;
                        rank = standings[i].rank;

                        win = standings[i].win;
                        loss = standings[i].loss;
                        draw = standings[i].draw;
                        goals_for = standings[i].goals_for;
                        goals_against = standings[i].goals_against;
                        goals_diff = standings[i].goals_diff;


                        if (standings[i].draw > 0)
                            games = "(" + standings[i].win + "," + standings[i].loss + "," + standings[i].draw + ")";
                        else
                            games = "(" + standings[i].win + "," + standings[i].loss + ")";

                        console.log(teamAbbreviation + " " + games);
                        sessionStorage.setItem(teamAbbreviation + "-games", games);
                        textHTML += generateHTMLStandings(teamAbbreviation, teamName, rank, win, loss, draw, goals_for, goals_against, goals_diff, result.standings[0].round);

                    }
                    sessionStorage.setItem("textHTML", textHTML);
                    console.log("Standings-date", YYYY + "-" + MM + "-" + DD);
                    sessionStorage.setItem("Standings-date", YYYY + "-" + MM + "-" + DD);
                    console.log("Standings generated at: ", YYYY + "-" + MM + "-" + DD);

                    // Without the old auto-reload, nothing else re-renders once this fetch
                    // resolves, so replace the "Obtaining statistics..." placeholder here.
                    if (IsGameDay() != 'true') {
                        displayStandings(textHTML);
                    }



                    document.addEventListener('click', function () {


                        if ((sessionStorage.getItem('NFL_PLAY') == null) || (sessionStorage.getItem('NFL_PLAY') != "TRUE")) {
                            // Play audio file
                            new Audio('./static/nfl.mp3').play();
                            //Trigger the NFL Webhook
                            clickimage('webhook_NFL');
                            sessionStorage.setItem("NFL_PLAY", "TRUE");

                            setTimeout(function () {
                                //turn off NFL Webhook after 25 Sec
                                clickimage('webhook_OFF');
                            }, 25000);
                        }





                    });

                }

            })
            .catch(error => console.log('error: ', error));
    }
    if (IsGameDay() == 'true') {
        console.log("Standongs ALREADY OBTAINED, Game day today scores will be displayed and not standings");
    }
    else {
        if (sessionStorage.getItem('textHTML'))
            textStandings = sessionStorage.getItem('textHTML');
        else
            textStandings = '<div class="game"><div class="score"><img src="images/NFL.png" class="responsive" /></div><div class="statistics">Obtaining statistics ... </div></div>'

        displayStandings(textStandings);
    }

}

function displayStandings(textHTML) {
    // Replace (rather than append to) any previously rendered standings/placeholder,
    // since this can now be called again once the fetch resolves.
    var existing = document.getElementById('standings-container');
    if (existing) existing.remove();

    var container = document.createElement('div');
    container.id = 'standings-container';
    container.style.display = 'contents';
    container.innerHTML = textHTML;

    const h2 = document.getElementById("myH2");
    h2.insertAdjacentElement("afterend", container);
    updateScrollDistance();
}



async function getProbabilities() {

    var requestOptions = { method: 'GET',  redirect: 'follow', origin: '*' };
    let response = await fetch("https://vyidloxhgnzajfy5slqzmswtau0olabe.lambda-url.us-west-1.on.aws/?action=probabilities", requestOptions);
    let data = await response.json();
    return data;
}


async function Probabilities() {
    const d = new Date();

    Year = d.getFullYear();
    Month = d.getMonth() + 1;
    Day = d.getDate();
    currentDate = Year + "-" + Month + "-" + Day;
    console.log("Probabilites consulted on: ", sessionStorage.getItem('Probabilities-date'));
    var ProbabilitiesLength = 0;
    //Validation to only get Probabilities once per day
    if (sessionStorage.getItem('Probabilities-date') == null || sessionStorage.getItem('Probabilities-date') != currentDate) {
        console.log("Getting Probabilities...Baby!");
        let text = "";
        getProbabilities()
            .then(result => {

                if (result.sport_event_probabilities.length > 0)
                    ProbabilitiesLength = result.sport_event_probabilities.length;
                else
                    ProbabilitiesLength = 0;

                for (var i = 0; i < ProbabilitiesLength; i++) {
                    event_id = result.sport_event_probabilities[i].sport_event.id;
                    home = result.sport_event_probabilities[i].sport_event.competitors[0].abbreviation;
                    away = result.sport_event_probabilities[i].sport_event.competitors[1].abbreviation;
                    home_probability = result.sport_event_probabilities[i].markets[0].outcomes[0].probability;
                    away_probability = result.sport_event_probabilities[i].markets[0].outcomes[1].probability;
                    //Show Probabilities on Console
                    console.log(event_id + " " + home + " " + home_probability + " " + away + " " + away_probability);
                    //store today probabilities
                    sessionStorage.setItem(event_id + "-" + home, home_probability);
                    sessionStorage.setItem(event_id + "-" + away, away_probability);
                    //store current date
                    sessionStorage.setItem('Probabilities-date', currentDate);
                }
            })
            .catch(error => console.log('error: ', error));
    }
    else { console.log("Probabilites already generated.") }
}



async function getScores() {
    var requestOptions = { method: 'GET',  redirect: 'follow' };
    let response = await fetch("https://vyidloxhgnzajfy5slqzmswtau0olabe.lambda-url.us-west-1.on.aws/?action=scores", requestOptions);
    let data = await response.json();
    console.log(data);
    return data;
}


function IsGameDay() {
    const d = new Date();
    let day = d.getDay();
    let hour = d.getHours();
    console.log("Day:" + day + "hour: " + hour);
    // Saturday NFL games only happen on select weeks (e.g. late season/holidays).
    // Uncomment the clause below to treat Saturday as a game day when that's the case:
    // || (day == 6 && hour >= 12 && hour <= 23)
    if ((day == 0 && hour >= 11 && hour <= 23) || (day == 1 && hour >= 18 && hour <= 22) || (day == 4 && hour >= 18 && hour <= 22) || (day == 5 && hour >= 18 && hour <= 22) || (isThanksgiving())) { console.log("GAME DAY"); return 'true'; }
    else
        return 'false';
}


function isThanksgiving() {
    // Get today's date
    const today = new Date();
    // Get the month and day of today's date
    const month = today.getMonth();
    const day = today.getDate();
    const dayName = today.getDay();

    if (month === 10 && day >= 22 && day <= 28 && dayName >= 4 && dayName <= 5) {
        return true;
    } else {
        return false;
    }
}

// Example usage:
console.log(isThanksgiving()); // Output: true or false, depending on today's date




async function Scores() {
    var teamhome;
    var teamhomeabbreviation;
    var teamaway;
    var teamawayabbreviation;
    var teamawayscore;
    var matchstatus;



    getScores()
        .then(result => {
            for (let i = 0; i < result.summaries.length; i++) {

                if (result.summaries[i].sport_event.sport_event_context.competition.name.includes("NFL")) {
                    matchid = result.summaries[i].sport_event.id
                    teamhome = result.summaries[i].sport_event.competitors[0].name;
                    teamhomeabbreviation = result.summaries[i].sport_event.competitors[0].abbreviation;
                    teamhomescore = result.summaries[i].sport_event_status.home_score;
                    teamaway = result.summaries[i].sport_event.competitors[1].name;
                    teamawayabbreviation = result.summaries[i].sport_event.competitors[1].abbreviation;
                    teamawayscore = result.summaries[i].sport_event_status.away_score;
                    matchstatus = result.summaries[i].sport_event_status;

                    updateOrCreateGame(matchid, teamawayabbreviation, teamawayscore, teamhomeabbreviation, teamhomescore);

                    console.log("id: " + i + " Match ID: " + matchid + " " + teamhomeabbreviation + " " + teamhomescore + "-" + teamawayscore + " " + teamawayabbreviation);
                    validateGame(matchid, teamawayabbreviation, teamawayscore, teamhomeabbreviation, teamhomescore, teamaway, teamhome);
                }
            }
        })
        .catch(error => console.log('error: ', error));

}


// Called on every poll: if the game is already on the ticker, update its score/probability text
// in place (keeps the CSS scroll animation running uninterrupted); otherwise append it as a new game.
function updateOrCreateGame(matchid, awayabbr, awayscore, homeabbr, homescore) {
    var existing = document.getElementById('game-' + matchid);

    if (existing) {
        var scoreEl = document.getElementById('scoretext-' + matchid);
        if (scoreEl) scoreEl.textContent = awayscore + ' - ' + homescore;

        var awayProb = document.getElementById('probline-' + matchid + '-' + awayabbr);
        if (awayProb) awayProb.textContent = buildProbLineContent(awayabbr, matchid);

        var homeProb = document.getElementById('probline-' + matchid + '-' + homeabbr);
        if (homeProb) homeProb.textContent = buildProbLineContent(homeabbr, matchid);
    } else {
        var withData = (localStorage.getItem("WinLossCheckbox") == "TRUE" || localStorage.getItem("ProbCheckbox") == "TRUE");
        var html = withData
            ? generateHTMLwData(awayabbr, awayscore, homescore, homeabbr, matchid)
            : generateHTML(awayabbr, awayscore, homescore, homeabbr, matchid);
        // Append at the end of the ticker (not right after myH2) so newly-seen games
        // land after existing ones instead of reordering the ticker on every poll.
        document.getElementById('scores').insertAdjacentHTML('beforeend', html);
        // A new game genuinely widens the ticker, so resync the scroll distance now.
        // Ordinary score-text updates above don't call this - see updateScrollDistance().
        updateScrollDistance();
    }
}


// Freezes the ticker's scroll travel distance (see --scroll-distance in memo.css) to the
// scores row's current width. Only call this at a point where the jump is invisible: on
// load, or on the "animationiteration" event (fired right as a loop restarts at
// translate3d(0,0,0), where the distance var isn't in play yet).
function updateScrollDistance() {
    var scores = document.getElementById('scores');
    if (scores) scores.style.setProperty('--scroll-distance', scores.scrollWidth + 'px');
}

// Keeps scores current without the disruptive full-page reload that used to restart
// the scroll animation on every RefreshRate tick.
function startScorePolling() {
    setInterval(function () {
        if (IsGameDay() == 'true') {
            Scores();
        }
    }, getRefreshRate());
}


function validateGame(matchid, teamawayabbreviation, teamawayscore, teamhomeabbreviation, teamhomescore, teamaway, teamhome) {
    //if (sessionStorage.getItem("touchdown") == "true") {
    //    clickimage('webhook_OFF'); 
    //    sessionStorage.setItem("touchdown", "false");
    //}

    if (sessionStorage.getItem(matchid + "-away-score-" + teamawayabbreviation) == null) {
        sessionStorage.setItem(matchid + "-away-score-" + teamawayabbreviation, teamawayscore);
        console.log("Created record for " + teamawayabbreviation + " playing away with score:" + teamawayscore);
    }
    else {
        if (sessionStorage.getItem(matchid + "-away-score-" + teamawayabbreviation) == teamawayscore)
        {
            console.log("No score change " + teamawayabbreviation + " playing away with score:" + teamawayscore);
            
        }
        else {
            isTouchdown(matchid, teamawayabbreviation, teamawayscore, 'away', teamaway);
            console.log("Score Change on away team " + teamawayabbreviation);
            sessionStorage.setItem(matchid + "-away-score-" + teamawayabbreviation, teamawayscore);
        }
    }


    if (sessionStorage.getItem(matchid + "-home-score-" + teamhomeabbreviation) == null) {
        sessionStorage.setItem(matchid + "-home-score-" + teamhomeabbreviation, teamhomescore);
        console.log("Created record for " + teamhomeabbreviation + " playing home with score:" + teamhomescore);
    }
    else {
        if (sessionStorage.getItem(matchid + "-home-score-" + teamhomeabbreviation) == teamhomescore)
        {
            console.log("No score change " + teamhomeabbreviation + " playing home with score:" + teamhomescore);
            
        }
        else {
            console.log("Score Change on home team " + teamhomeabbreviation);
            isTouchdown(matchid, teamhomeabbreviation, teamhomescore, 'home', teamhome);
            sessionStorage.setItem(matchid + "-home-score-" + teamhomeabbreviation, teamhomescore);
        }
    }
    console.log("--------------------------");
}


function isTouchdown(matchid, team, score, playingAt, teamname) {
    
    if ((parseInt(score) - parseInt(sessionStorage.getItem(matchid + "-" + playingAt + "-score-" + team))) >= 6) {
        console.log("TOUCHDOWN: " + team);
        displayTouchdown(team, teamname);
        if (localStorage.getItem("webhook_" + team) != null)
            {
                var requestOptions = { method: 'GET',  redirect: 'follow', origin: '*' };
                fetch(localStorage.getItem("webhook_" + team, requestOptions));
                console.log("Request for: webhook_" + team );
                sessionStorage.setItem("touchdown", "true");
            }
        }    
}


function displayTouchdown(team, teamname) {

    let html = "";

    html = '<div class=\"game\">';
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

function clickimage(webhook) {
    var requestOptions = { method: 'GET', mode: 'no-cors', redirect: 'follow' };
    //var requestOptions = { method: 'GET', redirect: 'follow', origin: '*' };
    fetch(localStorage.getItem(webhook), requestOptions);
}
