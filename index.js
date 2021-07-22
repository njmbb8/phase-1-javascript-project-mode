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

function populateActivityTypes() {
    activityTypes.forEach(function(type){
        const option = document.createElement('option');
        option.value = type;
        option.innerText = type;
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
                activity[1] = 1 - activity[1];
            }
            activityString += activity[0][0].toUpperCase() + activity[0].substr(1) + ': ' + activity[1] + '\n';
        });
        resultTextArea.value = activityString.replace('Key', 'ID').replace('Accessibility', 'Difficulty')
    });
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
});

