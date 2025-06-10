let response = await fetchData();
let responseWeapons = await fetchDateWeapons();
let weapons = responseWeapons.data;
let agents = response.data;

let main = document.getElementById('main');
let buttonWeapons = document.createElement('button');
let buttonAgents = document.createElement('button');
let newNav = document.getElementById('nav');
let favDiv = document.getElementById('favoris');

buttonWeapons.className = 'btn btn-outline-primary';
buttonWeapons.innerHTML = 'Armes';
buttonAgents.className = 'btn btn-outline-primary';
buttonAgents.innerHTML = 'Personnages';

// Bouton de navigation pour chaque type appeler
buttonWeapons.addEventListener('click', (event) => {
  displayFavWeapon();
  displayWeapons();
});

buttonAgents.addEventListener('click', (event) => {
  displayFavAgent();
  displayAgents();
});

newNav.append(buttonAgents, buttonWeapons);

// Local storage Agent
let favorisAgent = localStorage.getItem('favorisAgent');
if (favorisAgent == null) {
  favorisAgent = [];
} else {
  favorisAgent = localStorage.getItem('favorisAgent').split(',');
}

// Local storage Weapon
let favorisWeapons = localStorage.getItem('favorisWeapon');
if (favorisWeapons == null) {
  favorisWeapons = [];
} else {
  favorisWeapons = localStorage.getItem('favorisWeapon').split(',');
}

// appelez la fonction pour afficher tout les agents
displayFavAgent();
displayAgents();

// Création des fonctions
function displaySelect() {
  main.innerHTML = ""

  agents.forEach(agent => {
    let newDiv = document.createElement("div");
    let select = document.createElement("select");
    let option = document.createElement("option");

    select.textContent = "Choisissez la catégories";
    option.textContent = agent.role.displayName;
    option.value = "";

    select.addEventListener("change",(event) =>{
      let roles = event.target.value;
      if(!roles == ""){
        displayAgent(e.target.value);
      }
      displayAgents();
    })

    select.appendChild(option);
    newDiv.appendChild(select);
    main.appendChild(newDiv);
  });
}
function displayAgents() {
  // Vider le tableau à chaque rechargement de la fonction //
  main.innerHTML = '';

  // Afficher tout les personnages dans une boucle
  agents.forEach((agent) => {
 
    // Mettre un if pour ne pas remettre 2 fois le meme personnage en favoris
    if (!favorisAgent.includes(agent.uuid)) {
      // crée les éléments pour chaque personnage
      let newDiv = document.createElement('div');
      let roleDiv = document.createElement('div');
      let newH2 = document.createElement('h2');
      let newP = document.createElement('p');
      let image = document.createElement('img');
      let image2 = document.createElement('img');
      let fav = document.createElement('button');
      fav.value = agent.uuid;
      fav.innerText = '👨‍👨‍👦';
      fav.addEventListener('click', (event) => {
        favorisAgent.push(event.target.value);
        localStorage.setItem('favorisAgent', favorisAgent.join(','));
        displayFavAgent();
        displayAgents();
      });
      let linkDetail = document.createElement('button');
      image.setAttribute('src', agent.bustPortrait);

      newH2.textContent = agent.displayName;
      image2.setAttribute('src', agent.role.displayIcon);
      newP.textContent = agent.role.displayName;

      newDiv.className = 'card-agent';
      image.className = 'img-fluid';
      linkDetail.className = 'btn btn-outline-light mt-3';
      roleDiv.className = 'role-line';
      image2.className = 'img-fluid';
      linkDetail.className = 'btn btn-outline-primary';
      linkDetail.textContent = 'Détail';
      newDiv.style.backgroundImage = `linear-gradient(60deg, ${agent.backgroundGradientColors
        .map((c) => `#${c}`)
        .join(', ')})`;
      image.style.width = '20em';

      roleDiv.append(newP, image2);
      newDiv.append(fav, image, newH2, roleDiv, linkDetail);

      linkDetail.addEventListener('click', (event) => {
        displayAgent(agent);
      });

      image.addEventListener('click', (event) => {
        image.style.width == '20em'
          ? (image.style.width = '25em')
          : (image.style.width = '20em');
      });

      main.appendChild(newDiv);
    }
  });
}
function displayAgent(agent) {
  // Vider le tableau à chaque rechargement de la fonction //
  main.innerHTML = '';
  favDiv.innerHTML = '';

  // Crée les élément nécessaire pour l'affichage et l'ordre dans le html //
  let newDiv = document.createElement('div');
  let newP = document.createElement('p');
  let ul = document.createElement('ul');
  let newH2 = document.createElement('h2');
  let newH3 = document.createElement('h3');
  let H3Abilities = document.createElement('h3');
  let image = document.createElement('img');
  let image2 = document.createElement('img');

  // css boostrap
  newDiv.className = 'agent-card';
  image2.className = 'agent-bg';
  let contentDiv = document.createElement('div');
  contentDiv.className = 'agent-content text-center';

  image.className = 'agent-portrait';
  ul.className = 'agent-abilities';

  // insérer des images //
  image.setAttribute('src', agent.bustPortrait);
  image2.setAttribute('src', agent.background);
  newDiv.style.backgroundImage = `linear-gradient(60deg, ${agent.backgroundGradientColors
    .map((c) => `#${c}`)
    .join(', ')})`;

  // Afficher le text //
  newH2.textContent = agent.displayName;
  newP.textContent = agent.description;
  newH3.textContent = 'Role : ' + agent.role.displayName;
  H3Abilities.textContent = 'Sors du personnage';

  // Afficher une boucle d'un tableau d'objet dans un objet //
  agent.abilities.forEach((abilitie) => {
    let li = document.createElement('li');
    li.textContent = abilitie.displayName;
    ul.appendChild(li);
  });

  // Modifier la taille des images//
  image.style.width = '20em';
  image2.style.width = '20em';

  // faire les liens entre les attribut des balises html (parents enfants)
  contentDiv.append(image, newH2, newH3, newP, H3Abilities, ul);
  newDiv.append(image2, contentDiv);

  // L'ajout d'un Listener pour agmenter la taille de l'image ou non
  image.addEventListener('click', (event) => {
    image.style.width == '20em'
      ? (image.style.width = '25em')
      : (image.style.width = '20em');
  });

  // tout rassembler dans le main //
  main.appendChild(newDiv);
}
function displayWeapons() {
  // Vider le tableau à chaque rechargement de la fonction //
  main.innerHTML = '';
  // Afficher tout les personnages dans une boucle
  weapons.forEach((weapon) => {
    // Mettre un if pour ne pas remettre 2 fois le meme personnage en favoris
    if (!favorisWeapons.includes(weapon.uuid)) {
      // crée les éléments pour chaque personnage
      let newDiv = document.createElement('div');
      let newH2 = document.createElement('h2');
      let image = document.createElement('img');
      let linkDetail = document.createElement('button');
      let fav = document.createElement('button');
      fav.value = weapon.uuid;
      fav.innerText = '👨‍👨‍👦';
      fav.addEventListener('click', (event) => {
        favorisWeapons.push(event.target.value);
        localStorage.setItem('favorisWeapon', favorisWeapons.join(','));
        displayFavWeapon();
        displayWeapons();
      });

      image.setAttribute('src', weapon.displayIcon);

      newH2.textContent = weapon.displayName;

      linkDetail.className = 'btn btn-outline-primary';
      linkDetail.innerHTML = 'Détail';
      image.style.width = '20em';

      newDiv.append(newH2, fav, image, linkDetail);

      linkDetail.addEventListener('click', (event) => {
        linkDetail.setAttribute('href', displayWeapon(weapon));
      });

      image.addEventListener('click', (event) => {
        image.style.width == '20em'
          ? (image.style.width = '25em')
          : (image.style.width = '20em');
      });

      main.appendChild(newDiv);
    }
  });
}
function displayWeapon(weapon) {
  // Vider le tableau à chaque rechargement de la fonction //
  main.innerHTML = '';
  favDiv.innerHTML = '';

  // crée les éléments pour chaque personnage
  let newDiv = document.createElement('div');
  let divCardSkin = document.createElement('div');
  let titleSkinH3 = document.createElement('h3');
  let newH2 = document.createElement('h2');
  let newP2 = document.createElement('p');
  let newP = document.createElement('p');
  let image = document.createElement('img');

  image.setAttribute('src', weapon.displayIcon);

  newH2.textContent = weapon.displayName;
  newP2.textContent =
    "Catégorie du poids de l'arme : " + weapon.shopData.categoryText;
  newP.textContent = 'Prix : ' + weapon.shopData.cost;
  titleSkinH3.textContent = "Skin de l'arme";

  image.style.width = '20em';

  weapon.skins.forEach((skin) => {
    let divSkin2 = document.createElement('div');
    let imageSkin = document.createElement('img');
    let PSkin = document.createElement('p');
    imageSkin.setAttribute('src', skin.displayIcon);
    imageSkin.style.width = '15em';
    PSkin.textContent = skin.displayName;
    divSkin2.append(PSkin, imageSkin);
    divCardSkin.appendChild(divSkin2);
  });

  newDiv.append(newH2, image, newP2, newP, titleSkinH3, divCardSkin);

  image.addEventListener('click', (event) => {
    image.style.width == '20em'
      ? (image.style.width = '25em')
      : (image.style.width = '20em');
  });

  main.appendChild(newDiv);
}
function displayFavAgent() {
  //
  favDiv.innerHTML = '';
  // il faut pour chaque Favoris faire un fetch
  favorisAgent.forEach(async (favId) => {
    let reponse = await fetchAgentById(favId);
    let agent = reponse.data;

    let fav = document.createElement('button');
    fav.value = agent.uuid;
    fav.innerText = '⭐';
    fav.addEventListener('click', (event) => {
      favorisAgent.splice(favorisAgent.indexOf(event.target.value), 1);
      localStorage.setItem('favorisAgent', favorisAgent.join(','));

      // localStorage.removeItem('favorisAgent').indexOf(event.target.value), 1
      displayFavAgent();
      displayAgents();
    });
    // crée les éléments pour chaque personnage
    let newDiv = document.createElement('div');
    let roleDiv = document.createElement('div');
    let newH2 = document.createElement('h2');
    let newP = document.createElement('p');
    let image = document.createElement('img');
    let image2 = document.createElement('img');

    let linkDetail = document.createElement('button');
    image.setAttribute('src', agent.bustPortrait);

    newH2.textContent = agent.displayName;
    image2.setAttribute('src', agent.role.displayIcon);
    newP.textContent = agent.role.displayName;

    newDiv.className = 'card-agent';
    image.className = 'img-fluid';
    linkDetail.className = 'btn btn-outline-light mt-3';
    roleDiv.className = 'role-line';
    image2.className = 'img-fluid';
    linkDetail.className = 'btn btn-outline-primary';
    linkDetail.textContent = 'Détail';
    newDiv.style.backgroundImage = `linear-gradient(60deg, ${agent.backgroundGradientColors
      .map((c) => `#${c}`)
      .join(', ')})`;
    image.style.width = '20em';

    roleDiv.append(newP, image2);
    newDiv.append(fav, image, newH2, roleDiv, linkDetail);

    linkDetail.addEventListener('click', (event) => {
      displayAgent(agent);
    });

    image.addEventListener('click', (event) => {
      image.style.width == '20em'
        ? (image.style.width = '25em')
        : (image.style.width = '20em');
    });

    favDiv.appendChild(newDiv);
  });
}
function displayFavWeapon() {
  favDiv.innerHTML = '';
  // Afficher tout les personnages dans une boucle
  // il faut pour chaque Favoris faire un fetch
  favorisWeapons.forEach(async (favId) => {
    let reponse = await fetchWeaponById(favId);
    let weapon = reponse.data;

    let fav = document.createElement('button');
    fav.value = weapon.uuid;
    fav.innerText = '⭐';
    fav.addEventListener('click', (event) => {
      favorisWeapons.splice(favorisWeapons.indexOf(event.target.value), 1);
      if (favorisWeapons.length == 0) {
        localStorage.setItem('favorisWeapon', '[]');
      } else {
        localStorage.setItem('favorisWeapon', favorisWeapons.join(','));
      }
      displayFavWeapon();
      displayWeapons();
    });
    // crée les éléments pour chaque personnage
    let newDiv = document.createElement('div');
    let newH2 = document.createElement('h2');
    let image = document.createElement('img');
    let linkDetail = document.createElement('button');

    image.setAttribute('src', weapon.displayIcon);

    newH2.textContent = weapon.displayName;

    linkDetail.className = 'btn btn-outline-primary';
    linkDetail.innerHTML = 'Détail';
    image.style.width = '20em';

    newDiv.append(fav, newH2, image, linkDetail);

    linkDetail.addEventListener('click', (event) => {
      displayWeapon(weapon);
    });

    image.addEventListener('click', (event) => {
      image.style.width == '20em'
        ? (image.style.width = '25em')
        : (image.style.width = '20em');
    });

    favDiv.appendChild(newDiv);
  });
}



// Importer une API avec fetchData
async function fetchData() {
  let response = await fetch(
    'https://valorant-api.com/v1/agents/?language=fr-FR&isPlayableCharacter=true'
  );
  response = await response.json();
  return response;
}

async function fetchDateWeapons() {
  let response = await fetch(
    'https://valorant-api.com/v1/weapons?language=fr-FR'
  );
  response = await response.json();
  return response;
}

async function fetchAgentById(id) {
  let response = await fetch('https://valorant-api.com/v1/agents/' + id);
  response = await response.json();
  return response;
}

async function fetchWeaponById(id) {
  let response = await fetch('https://valorant-api.com/v1/weapons/' + id);
  response = await response.json();
  return response;
}
