const activityTypes = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];
const activityTypeNode = document.getElementById('type');
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
    })
}

searchByIDBtn.addEventListener('click', function(click){
    click.preventDefault();
    const activityID = searchByIdInput.value;
    fetch(`http://www.boredapi.com/api/activity?key=${activityID}`)
    .then((data) => data.json())
    .then(function(activity){
        let activityString = '';
        Object.entries(activity).forEach(function(activity){
            activityString += activity[0] + ': ' + activity[1] + '\n';
        });
        resultTextArea.value = activityString;
    });
});

document.addEventListener('DOMContentLoaded', function(){
    populateActivityTypes();
})

