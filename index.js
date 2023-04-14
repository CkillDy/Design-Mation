/**
 * @returns {Promise<Array<{ timestamp: string, email: string, name: string, username: string, instagram: string, commissions: string, style: Array<string>, drawings: Array<string>, adminCode: string }>>} Um array de objetos JSON representando os dados da planilha.
 */
async function fetchSheetData() {
  const SPREADSHEET_ID = '1JNN-tIB51hpggNbemBuvj-WRXzFLlhi_IDUsgshHlVE';
  const SHEET_NAME = 'designMation';
  const API_KEY = 'AIzaSyDMDZbsbOM3jPI2eywu0bQKjn9gR90tZm4';
  const ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const values = data.values.slice(1);
    const jsonData = values.map(row => {
      const obj = {
        "timestamp": row[0],
        "email": row[1],
        "name": row[2],
        "username": row[3],
        "instagram": row[4],
        "commissions": row[5],
        "style": row[6].split(', '),
        "drawings": row[7].split(', ').map(url => {
          if (url.includes('https://drive.google.com/open?id=')) {
            const fileId = url.split('https://drive.google.com/open?id=')[1];
            return `https://drive.google.com/uc?id=${fileId}`;
          } else {
            return url;
          }
        }),
        "adminCode": row[8]
      };
      return obj;
    });
    return jsonData;
  } catch (error) {
    console.error(error);
  }
}

async function addImagesSlide(listDrawings){

 
    const slideContainer = document.getElementById("slide-container");

      listDrawings.forEach(imagem => {
        const imgElement = document.createElement("img");
        imgElement.classList.add("scroll-desenhos");
        imgElement.src = imagem;
    
        imgElement.alt = "Slide de rolagem com desenhos";
        slideContainer.appendChild(imgElement);
    });
}

async function slideImageHomeMove(listDrawings){

  let index = 0
  let directionLeft = true
  let marginLeft = 0
 
  let imageScroll = document.querySelector(".scroll-desenhos")

  setInterval(() => {
    if(directionLeft === true){

      if(listDrawings.length === index){
        directionLeft = false
     }
      index++
      marginLeft += 110
      imageScroll.style.marginLeft = `-${marginLeft}px`
    }
    else{
      if(index === 1){
        directionLeft = true
      }
      --index
      marginLeft -=110
      imageScroll.style.marginLeft = `-${marginLeft}px`
      
    }

  },1100)

}

async function adicionarTodosDesenhos(listDrawings) {
  const container = document.querySelector(".todos-desenhos");

  for (let i = 0; i < listDrawings.length; i++) {
    const img = document.createElement("img");
    img.src = listDrawings[i];
    img.alt = `Todos os desenhos ${i + 1}`;

    container.appendChild(img);
  }
}

async function criarCards(participantesData) {
  const participantesContainer = document.getElementById('participantes');
  const cardsScroll = document.createElement('div');
  cardsScroll.classList.add('cards-scroll');

  participantesData.forEach(participante => {
    const card = document.createElement('figure');
    card.classList.add('card');

    const cardDesenhos = document.createElement('div');
    cardDesenhos.classList.add('card-desenhos');

    participante.drawings.forEach(imagem => {
      const imgMove = document.createElement('img');
      imgMove.classList.add('img-move');
      imgMove.src = imagem;
      imgMove.alt = `Foto de ${participante.name}`;
      cardDesenhos.appendChild(imgMove);
    });

    const buttonsCardMove = document.createElement('div');
    buttonsCardMove.classList.add('buttons-card-move');

    const leftCardCheckbox = document.createElement('input');
    leftCardCheckbox.type = 'checkbox';
    leftCardCheckbox.id = 'left-card';
    leftCardCheckbox.classList.add('full-card-button');
    leftCardCheckbox.dataset.moveleft = 'left';
    buttonsCardMove.appendChild(leftCardCheckbox);

    const rightCardCheckbox = document.createElement('input');
    rightCardCheckbox.type = 'checkbox';
    rightCardCheckbox.id = 'right-card';
    rightCardCheckbox.classList.add('full-card-button');
    rightCardCheckbox.dataset.moveright = 'right';
    buttonsCardMove.appendChild(rightCardCheckbox);

    const infoCard = document.createElement('figcaption');
    infoCard.classList.add('info-card');

    const nome = document.createElement('h3');
    nome.textContent = participante.name;
    infoCard.appendChild(nome);

    const estilo = document.createElement('p');
    estilo.innerHTML = `<b>Estilo:</b> ${participante.style.join(', ')}`;
    infoCard.appendChild(estilo);

    const instagram = document.createElement('p');
    instagram.innerHTML = `<b>Instagram:</b> <a style="color: rgb(222, 75, 252);" href="${participante.instagram}" target="_blank">@${participante.username}</a>`;
    infoCard.appendChild(instagram);

    const comission = document.createElement('p');
    comission.innerHTML = `<b>Comission:</b> <strong>${participante.commissions}</strong>`;
    infoCard.appendChild(comission);

    card.appendChild(cardDesenhos);
    card.appendChild(buttonsCardMove);
    card.appendChild(infoCard);
    cardsScroll.appendChild(card);
  });

  participantesContainer.appendChild(cardsScroll);
}

async function adicionarEstiloComissao() {
  const cards = document.getElementsByClassName('card');

  for (let i = 0; i < cards.length; i++) {
    const comissionElement = cards[i].querySelector('.info-card p:last-child strong');
    const comissionValue = comissionElement.textContent.trim().toLowerCase();

    if (comissionValue === 'open') {
      comissionElement.style.color = 'green';
    } else if (comissionValue === 'close') {
      comissionElement.style.color = 'red';
    }
  }
}

async function buttonsCardMove() {
  const leftButtonCards = document.querySelectorAll('[data-moveleft="left"]');
  const rightButtonCards = document.querySelectorAll('[data-moveright="right"]');

  leftButtonCards.forEach(leftButtonCard => {
    leftButtonCard.addEventListener("click", () => {
      const cardDesenhos = leftButtonCard.closest(".card").querySelector(".card-desenhos");
      cardDesenhos.scrollBy({ top: 10, behavior: "smooth" });
    });
  });

  rightButtonCards.forEach(rightButtonCard => {
    rightButtonCard.addEventListener("click", () => {
      const cardDesenhos = rightButtonCard.closest(".card").querySelector(".card-desenhos");
      cardDesenhos.scrollBy({ top: -10, behavior: "smooth" });
    });
  });
}

function createElementImg(src,alt){
  let imgPincel = document.createElement("img")
  imgPincel.src = src
  imgPincel.alt = alt
  return imgPincel
}

function executePincelImg(){
const container_pinceis = document.querySelector(".pinceis-imgs")

for (let i = 2;i < 28; i++){
  let img2 = createElementImg(`https://raw.githubusercontent.com/CkillDy/brush-Ibispaint-ck/main/brushs-ck/ck${i}.png`, `pincel-ck${i}`)

  container_pinceis.appendChild(img2)

  img2.addEventListener("click", function() {
    fetch(this.src)
      .then(response => response.blob())
      .then(blob => {
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = this.alt;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      });
  });
  
}
}

async function setAdminsInfo(admins) {
  const adminsContainer = document.getElementsByClassName('admins')[0];

  admins.forEach((admin, index) => {
    const adminCard = adminsContainer.children[index];
    adminCard.href = admin.instagramUrl;
    adminCard.children[0].children[0].src = admin.image;
    adminCard.children[0].children[1].innerHTML = admin.name;
    adminCard.children[0].children[2].innerHTML = admin.role;
  });
}

async function setOwnerInfo(owner) {
  const ownerCard = document.getElementById('dono-card');

 ownerCard.parentElement.href = owner.instagramUrl

  ownerCard.href = owner.instagramUrl;
  ownerCard.children[0].src = owner.image;
  ownerCard.children[1].innerHTML = owner.name;
  ownerCard.children[2].innerHTML = owner.role;
}
function random(max){
  return Math.floor(Math.random() * max)
}

async function startAplication(){

  const dados = await fetchSheetData()
  const todosDesenhos = []
  const ownerInfo = {
    name: 'Ckilldy',
    role: 'Criador do Grupo',
    image: '',
    instagramUrl: ''
  };

  const adminsInfo = []

  for (let membros of dados){
   todosDesenhos.push(...membros.drawings)

   if(membros.adminCode === "20901"){

    ownerInfo.name = membros.name.split(" ")[0]
    ownerInfo.image = membros.drawings[random(membros.drawings.length)]
    ownerInfo.instagramUrl = membros.instagram
   }
   else if (membros.adminCode === "98372"){
    adminsInfo.push( {
      name: membros.name.split(" ")[0],
      role: 'Admin',
      image: membros.drawings[random(membros.drawings.length)],
      instagramUrl: membros.instagram
    })
   }

  }

  console.log(ownerInfo)
  addImagesSlide(todosDesenhos)
  slideImageHomeMove(todosDesenhos)
  adicionarTodosDesenhos(todosDesenhos)
  criarCards(dados)
  buttonsCardMove()
  adicionarEstiloComissao()
  executePincelImg()
  
  await setAdminsInfo(adminsInfo);
  await setOwnerInfo(ownerInfo);

}

startAplication()


