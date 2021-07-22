const activityTypes = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];
const activityTypeNode = document.getElementById('activityType');
const minDifficultyNode = document.getElementById('minDifficultySetting');
const maxDifficultyNode = document.getElementById('maxDifficultySetting');
const participantNode = document.getElementById('participants');
const minCostNode = document.getElementById('minCost');
const maxCostNode = document.getElementById('maxCost');
const submitButton = document.getElementById('submitButton');
const resultTextArea = document.getElementById('activity');
const searchByIdInput = document.getElementById('idSearch');
const searchByIDBtn = document.getElementById('searchByIDBtn');
const tabsContainer = document.getElementById('tabs');
const searchPage = document.getElementById('searchPage');
const favoritesPage = document.getElementById('favoritesPage');
const favoritesList = document.getElementById('favoritesList');
const clearBtn = document.getElementById('clearButton');
const favoriteBtn = document.getElementById('favoriteButton');
const favoriteTab = document.getElementById('favoritesTab');
const searchTab = document.getElementById('searchTab');
let activeActivity;

function populateActivityTypes() {
    activityTypes.forEach(function(type){
        const option = document.createElement('option');
        option.value = type;
        option.innerText = type[0].toUpperCase() + type.substr(1);
        activityTypeNode.appendChild(option);
    });
};

function displayResult(parameterString){
    fetch(`http://www.boredapi.com/api/activity${parameterString}`)
    .then((data) => data.json())
    .then(function(activity){
        let activityString = '';
        Object.entries(activity).forEach(function(activity){
            if(activity[0] === 'accessibility'){
                activity[1] = 1.0 - activity[1];
            }
            if(activity[1] !== ''){
                activityString += activity[0][0].toUpperCase() + activity[0].substr(1) + ': ' + activity[1] + '\n';
            }
        });
        resultTextArea.value = activityString.replace('Key', 'ID').replace('Accessibility', 'Difficulty');
        activeActivity = activity;
        clearBtn.disabled = false;
        favoriteBtn.disabled = false;
    });
}

function populateFavoritesPage(){
    favoritesList.innerHTML = '';
    fetch('http://localhost:3000/favorites')
    .then((data) => data.json())
    .then(function(activitiesList){
        activitiesList.forEach(function(activity){
            const favoriteNode = document.createElement('li');
            favoriteNode.id = `a${activity.id}b${activity.key}`;
            favoriteNode.innerText = activity.activity;
            favoritesList.appendChild(favoriteNode);
        });
    });
}

//tab node passed in will be made active
function switchTabs(tab){
    tab.classList.add('active');
    if(tab.id === 'searchTab'){
        searchPage.classList.remove('inactive');
        favoritesPage.classList.add('inactive');
        document.getElementById('favoritesTab').classList.remove('active');
    }
    else{
        favoritesPage.classList.remove('inactive');
        searchPage.classList.add('inactive');
        document.getElementById('searchTab').classList.remove('active');
    }
}

searchByIDBtn.addEventListener('click', function(click){
    click.preventDefault();
    let parameterString = `?key=${searchByIdInput.value}`;
    displayResult(parameterString)
});

submitButton.addEventListener('click', function(click){
    click.preventDefault();
    let parameterString = '?';
    if(activityTypeNode.value !== ''){
        parameterString += `type=${activityTypeNode.value}`;
    }
    if(participantNode.value !== 0 || participantNode !== ''){
        if(parameterString !== '?'){
            parameterString += '&';
        }
        if(participantNode.value !== ''){
            parameterString += `participants=${participantNode.value}`;
        }
    }
    if(parameterString !== '?'){
        parameterString += '&';
    }
    parameterString += `minaccessibility=${minDifficultyNode.value}&maxaccessibility=${maxDifficultyNode.value}`;
    parameterString += `&minprice=${minCostNode.value}&maxprice=${maxCostNode.value}`;

    displayResult(parameterString);
});

document.addEventListener('DOMContentLoaded', function(){
    populateActivityTypes();
    populateFavoritesPage();
});

tabsContainer.addEventListener('click', function(event){
    if(!event.target.classList.contains('active')){
        let tab;
        if(!event.target.classList.contains('tab')){
            tab = event.target.parentElement;
        }
        else{
            tab = event.target;
        }
        switchTabs(tab);
    }
});

clearBtn.addEventListener('click', function(click){
    click.preventDefault();
    resultTextArea.value = '';
    activeActivity = '';
    favoriteBtn.disabled = true;
    clearBtn.disabled = true;
});

favoriteBtn.addEventListener('click', function(click){
    click.preventDefault();
    const postContext = {
        "method": 'POST',
        "headers": {
            "Content-Type": 'application/json',
            "accept": 'application/json'
        },
        body:JSON.stringify({
            activity: activeActivity.activity,
            key: activeActivity.key
        })
    };

    fetch('http://localhost:3000/favorites', postContext)
    .then(function(){
        populateFavoritesPage();
        switchTabs(favoriteTab);
    });
});