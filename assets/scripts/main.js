///---------------GK and PLyer-------------------//

let joueur = document.getElementById('joueur')
let Gardient = document.getElementById('Gardient')
let position = document.getElementById('position')
const myForm = document.getElementById('myForm')
let getDataStorage = localStorage.getItem('users')

function plyerAndgk() {
  let choix = position.value
  if (choix === 'Choisissez Votre Joueur') {
    Gardient.style.display = 'none'
    joueur.style.display = 'none'
  } else if (choix === 'GK') {
    Gardient.style.display = 'block'
    joueur.style.display = 'none'
  } else {
    joueur.style.display = 'block'
    Gardient.style.display = 'none'
  }
}

function initializeFormValidation() {
  document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault() // Empêcher l'envoi du formulaire

    let isValid = true
    const errorMsgs = document.querySelectorAll('.error-msg')
    errorMsgs.forEach((msg) => (msg.style.display = 'none')) // Réinitialise les erreurs

    // Validation Nom
    let parseUsers = JSON.parse(getDataStorage) || []
    const name = document.querySelector("input[name='name']")
    const filterName = parseUsers.find(el => el.name === name.value)
    console.log('filterName', filterName)
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/
    if (!nameRegex.test(name.value) || filterName) {
      name.nextElementSibling.style.display = 'block'
      isValid = false
    }

    const positionValue = position.value
    if (positionValue === 'GK') {
      validateGKFields()
    } else if (positionValue !== 'Choisissez Votre Joueur') {
      validatePlayerFields()
    }

    // Affiche le message d'erreur global si le formulaire est invalide
    const formErrorMsg = document.getElementById('form-error-msg')
    if (!isValid) {
      formErrorMsg.style.display = 'block'
    } else {
      formErrorMsg.style.display = 'none' // Masquer le message global si tout est valide
      handleAddUser()
    }

    function validatePlayerFields() {
      const playerFields = [
        'rating',
        'pace',
        'shooting',
        'passing',
        'dribbling',
        'defending',
        'physical',
      ]
      playerFields.forEach((field) => validateNumberField(field))
    }

    function validateGKFields() {
      const gkFields = [
        'ratingGK',
        'diving',
        'handling',
        'kicking',
        'reflexes',
        'speed',
        'positioning',
      ]
      gkFields.forEach((field) => validateNumberField(field))
    }

    function validateNumberField(name) {
      const field = document.querySelector(`input[name='${name}']`)
      const numberRegex = /^[1-9][0-9]$/ // Valide les nombres de 10 à 99

      if (field && !numberRegex.test(field.value)) {
        field.nextElementSibling.style.display = 'block'
        isValid = false
      }
    }
  })
}


initializeFormValidation()

function handleAddUser() {
  // Récupérer uniquement les champs visibles
  const visibleInputs = Array.from(myForm.elements).filter(
    (input) =>
      input.type !== 'hidden' && input.name && input.offsetParent !== null // Vérifie si l'élément est visible
  )

  // Créer un objet avec les champs visibles
  const visibleData = visibleInputs.reduce((acc, input) => {
    acc[input.name] = input.value
    return acc
  }, {})

  let parseData = JSON.parse(getDataStorage) || []
  console.log('parseData', parseData)
  parseData.push(visibleData)
  localStorage.setItem('users', JSON.stringify(parseData))

  console.log('Données visibles :', visibleData)
  // Réinitialiser le formulaire
  myForm.reset()

  // Réinitialiser les sections visibles
  joueur.style.display = 'none'
  Gardient.style.display = 'none'

  alert('Utilisateur ajouté avec succès !')
  handleDisplayUsers()
}

function handleDisplayUsers() {
    let parseUsers = JSON.parse(getDataStorage) || []
    addElementHtml(parseUsers)

}

handleDisplayUsers()

function addElementHtml(data = []) {
    const containers = {
        "GK": document.getElementsByClassName("a1")[0],
        "LB": document.getElementsByClassName("a2")[0],
        "CB1": document.getElementsByClassName("a3")[0],
        "CB2": document.getElementsByClassName("a4")[0],
        "RB": document.getElementsByClassName("a5")[0],
        "CM1": document.getElementsByClassName("a6")[0],
        "CM2": document.getElementsByClassName("a7")[0],
        "CM3": document.getElementsByClassName("a8")[0],
        "LW": document.getElementsByClassName("a9")[0],
        "ST": document.getElementsByClassName("a10")[0],
        "RW": document.getElementsByClassName("a11")[0],
    };

    // Vider tout contenu existant pour chaque conteneur
    Object.values(containers).forEach(container => container.innerHTML = "");
    const reserveContainer = document.getElementById('reserve-container');
    reserveContainer.innerHTML = "";

    const positionLimits = {
        "GK": 1,
        "LB": 1,
        "CB": 2,
        "RB": 1,
        "CM": 3,
        "LW": 1,
        "ST": 1,
        "RW": 1,
    };

    const positionCounters = {};

    data.forEach(user => {
        let ajout = null;

        switch (user?.position) {
            case "GK":
                ajout = containers["GK"];
                break;
            case "LB":
                ajout = containers["LB"];
                break;
            case "CB":
                ajout = containers["CB1"].children.length === 0 ? containers["CB1"] : containers["CB2"];
                break;
            case "RB":
                ajout = containers["RB"];
                break;
            case "CM":
                ajout = containers["CM1"].children.length === 0 ? containers["CM1"] : containers["CM2"].children.length === 0 ? containers["CM2"] : containers["CM3"];
                break;
            case "LW":
                ajout = containers["LW"];
                break;
            case "ST":
                ajout = containers["ST"];
                break;
            case "RW":
                ajout = containers["RW"];
                break;
            default:
                return; 
        }

        if (ajout && (positionCounters[user.position] || 0) < positionLimits[user.position]) {
            positionCounters[user.position] = (positionCounters[user.position] || 0) + 1;
            ajout.insertAdjacentHTML('beforeend', generatePlayerHTML(user));
        } else {
            reserveContainer.insertAdjacentHTML('beforeend', generatePlayerHTML(user));
        }
        console.log('positionCounters', positionCounters)
    });
}

function generatePlayerHTML(user) {
    return `<div class="image-container" onclick="openPopup('${user.name}')">
        <div class="elementPosition">
          <div class="profile">
            <div class="clubInfos">
              <h4 class="rat">${user?.position == "GK" ? user?.ratingGK : user?.rating}</h4>
              <h4 class="post">${user?.position}</h4>
              <div class="nat"><img src=${user?.nationalite} alt=""></div>
              <div class="club"><img src=${user?.club} width="30" height="30"></div>
            </div>
            <div>
              <img src=${user?.joueur} alt="" class="overlay-image">
              <h4 class="name">${user?.name}</h4>
            </div>
          </div>
          <div class="infoUser">
            <div class="secOne">
              <span class="pace">${user?.position == "GK" ? "DIV" : "PAC"} : ${user?.position == "GK" ? user?.diving : user?.pace}</span>
              <span class="shooting">${user?.position == "GK" ? "HDL" : "SHO"} : ${user?.position == "GK" ? user?.handling : user?.shooting}</span>
              <span class="passing">${user?.position == "GK" ? "KIC" : "PAS"} : ${user?.position == "GK" ? user?.kicking : user?.passing}</span>
            </div>
            <div class="secTwo">
              <span class="dribbling">${user?.position == "GK" ? "REF" : "DRI"} : ${user?.position == "GK" ? user?.reflexes : user?.dribbling}</span>
              <span class="defending">${user?.position == "GK" ? "SPE" : "DEF"} : ${user?.position == "GK" ? user?.speed : user?.defending}</span>
              <span class="physical">${user?.position == "GK" ? "POS" : "PHY"} : ${user?.position == "GK" ? user?.positioning : user?.physical}</span>
            </div>
          </div>
        </div>
      </div>`;
}


let selectedUserName = null;

function openPopup(userName) {
    selectedUserName = userName;
    document.getElementById("popup").style.display = "flex";


}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    selectedUserName = null;
}