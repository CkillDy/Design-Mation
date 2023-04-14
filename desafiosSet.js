
function adicionarDesafios(temas) {
 
  const areaDesafios = document.querySelector('.area-desafios');

  temas.forEach(tema => {
  
    const articleDesafio = document.createElement('article');
    articleDesafio.setAttribute('id', tema.id);
    articleDesafio.classList.add('galeria');

    const h3Desafio = document.createElement('h3');
    h3Desafio.textContent = tema.titulo;

    const divDesafio = document.createElement('div');
    divDesafio.classList.add('desafio-desenhos-group');

    tema.imagens.forEach(src => {
      const imgDesafio = document.createElement('img');
      imgDesafio.setAttribute('src', src);
      imgDesafio.setAttribute('alt', 'Desenho do ' + tema.titulo);
      divDesafio.appendChild(imgDesafio);
    });

    articleDesafio.appendChild(h3Desafio);
    articleDesafio.appendChild(divDesafio);
    areaDesafios.appendChild(articleDesafio);
  });
}



function getDesenhosConcep(){
  let dados = []
  for (let i = 0; i < 13; i++){
    dados.push(`https://raw.githubusercontent.com/CkillDy/desafiosAll/main/desafios/desafio%20-%20Concepts%20de%20Personagens/desafio%20${i}.png`)
  }
  return dados
}

function getDesenhoApocaliptico(){
  let dados = []
  for (let i = 0; i < 13; i++){
    dados.push(`https://raw.githubusercontent.com/CkillDy/desafiosAll/main/desafios/desafio%20-%20ambiente%20apocal%C3%ADptico/desafio${i}.png`)
  }
  return dados
}

function getDesenhosComidas(){
  let dados = []
  for (let i = 0; i < 17; i++){
    dados.push(`https://raw.githubusercontent.com/CkillDy/desafiosAll/main/desafios/desafio%20-%20comidas%20ocs/desafio${i}.png`)
  }
  return dados
}

function getDesenhoRemakeKid(){
  let dados = []
  for (let i = 0; i < 18; i++){
    dados.push( `https://raw.githubusercontent.com/CkillDy/desafiosAll/main/desafios/desafio%20-%20refazer%20personagens%20de%20crian%C3%A7as/desafio${i}.jpg`)
  }
  return dados

}

function getDesenhoSeresElementais(){
  let dados = []
  for (let i = 0; i < 20; i++){
    dados.push( `https://raw.githubusercontent.com/CkillDy/desafiosAll/main/desafios/desafio%20-%20seres%20elementais/desafio${i}.jpg`)
  }
  return dados
}

const temasDesafios = [
  {
    id: 'desafio1',
    titulo: 'Desafio - Criação de Concepts de Personagens',
    imagens: getDesenhosConcep(),
  },
  {
    id: 'desafio2',
    titulo: 'Desafio - Criando Ambiente Apocalíptico em Arte',
    imagens: getDesenhoApocaliptico(),
  },
  {
    id: 'desafio3',
    titulo: 'Desafio - Comidas Transformadas em Personagens',
    imagens: getDesenhosComidas(),
  },
  {
    id: 'desafio4',
    titulo: 'Desafio - Remake de Desenhos de Crianças em Arte',
    imagens: getDesenhoRemakeKid(),
  },
  {
    id: 'desafio5',
    titulo: 'Desafio - Criação de Seres Elementais da Natureza',
    imagens: getDesenhoSeresElementais(),
  },
];


adicionarDesafios(temasDesafios);
