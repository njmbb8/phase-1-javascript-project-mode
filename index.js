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


document.addEventListener('DOMContentLoaded', function(){
    populateActivityTypes();
})

