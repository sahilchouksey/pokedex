import * as idx from '../index';
import { elements } from './base';
import PokemonDetails from '../models/PokemonDetails';

export const getInput = () => elements.searchValue.value;
export const clearSearchInput = () => elements.searchValue.value = '';


export const popupError = () => {
    elements.filterBtn.innerHTML = ''
    const mu = `
    <div class="error__container">
        <h1 class="error__404">404</h1>
        <p class="error__text">Page not found</p>
        <a href="#" class="btn-inline error__btn">Return to home</a>
    </div>
    `
    elements.errorPopup.insertAdjacentHTML('beforeend', mu)
}

export const removeError = () => elements.errorPopup.innerHTML = ''

const getColor = type => {
    const types = ["Normal", "Fire", 
    "Water", "Grass",
    "Electric", "Ice", 
    "Fighting", "Poison", 
    "Ground", "Flying", 
    "Psychic", "Bug", 
    "Rock", "Ghost", 
    "Dark", "Dragon", 
    "Steel", "Fairy",

    "type/Normal", "type/Fire", 
    "type/Water", "type/Grass",
    "type/Electric", "type/Ice", 
    "type/Fighting", "type/Poison", 
    "type/Ground", "type/Flying", 
    "type/Psychic", "type/Bug", 
    "type/Rock", "type/Ghost", 
    "type/Dark", "type/Dragon", 
    "type/Steel", "type/Fairy",

    "Generation/1", "Generation/2",
    "Generation/3", "Generation/4",
    "Generation/5", "Generation/6",
    "Generation/7", "Generation/8"];

    const colors = ['#A8A878', '#F08030', 
    '#6890F0', '#78C850', 
    '#F8D030', '#98D8D8',  
    '#C03028', '#A040A0', 
    '#E0C068', '#A890F0', 
    '#F85888', '#A8B820', 
    '#B8A038', '#705898', 
    '#705848', '#7038F8', 
    '#B8B8D0', "#EE99AC",


    '#A8A878', '#F08030', 
    '#6890F0', '#78C850', 
    '#F8D030', '#98D8D8',  
    '#C03028', '#A040A0', 
    '#E0C068', '#A890F0', 
    '#F85888', '#A8B820', 
    '#B8A038', '#705898', 
    '#705848', '#7038F8', 
    '#B8B8D0', "#EE99AC",



    '#ff414d', '#125FFD',
    '#EF00FF', '#E91E63',
    '#5643fa', '#ff7730',
    '#7ed56f', '#ffb900']

    let color;
    types.forEach((el, i) => {
        if (el.toLowerCase() === type.toLowerCase()) color = colors[i]
    })

    return color;
}

export const addFilterBtn = type => {
    // const markUp = `
    // <div class="close-filter">Filter: <span style="border-bottom: 2px solid ${getColor(type)}; padding-bottom: .2rem;">${type}</span><a href="#" class="close--btn">&times;</a></div> 
    // ` 
    const markUp = `
    <div class="container-filter">
        <span class="label">Filter: <span style="">${type}</span></span>
        <span class="icon close--btn"><svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.0596 1.95866L12.6496 0.54866L7.05957 6.13866L1.46957 0.54866L0.0595703 1.95866L5.64957 7.54866L0.0595703 13.1387L1.46957 14.5487L7.05957 8.95866L12.6496 14.5487L14.0596 13.1387L8.46957 7.54866L14.0596 1.95866Z" fill="#757575"/>
        </svg>
        </span>
    </div>
    `
    elements.filterBtn.insertAdjacentHTML('beforeend', markUp)
}

export const clearFilterBtn = () => {
    elements.filterBtn.innerHTML = ''
}


export const clearResult = () => { 
    elements.resultList.innerHTML = '';
    elements.paginationBtn.forEach(e => e.innerHTML = '')
}


const displayResult = (res) => {
    const markUp = `
            <li class="item__card u-over-h">
                <div class="card  u-over-h" id="card-visitors"> 
                    <input type="checkbox" id="card-visitors-indicator-${res.id}" class="u-over-h"/> 
                    <div class="header u-over-h" style="background:${getColor(res.type[0])}"> 
                        <a href="#${res.id}"> 
                            <label class="indicator u-over-h" for="card-visitors-indicator-${res.id}"> <svg class="open"  > 
                                <line class="open__line" x1="1.5" y1="12" x2="2" y2="25" stroke-linecap="round" style="" /> 
                                <line class="open__line" x1="9" y1="7" x2="9" y2="25" stroke-linecap="round" style="" /> 
                                <line class="open__line" x1="16.5" y1="2" x2="16.5" y2="25" stroke-linecap="round" style="" /> </svg> <svg class="close" > 
                                <line x1="1.5" y1="13.5" x2="15" y2="0" style="stroke: #FFFFFF; stroke-width: 3" /> 
                                <line x1="1.5" y1="11.5" x2="15" y2="25" style="stroke: #FFFFFF; stroke-width: 3" /> </svg> 
                            </label> 
                        </a>

                        
                        <div class="content u-over-h"> 
                            <div class="data u-over-h"> 
                                <div class="top u-over-h"> 
                                    <p class="title">Stats</p> 
                                </div>

                                <div class="stats u-over-h">
                                    <div class="stats__pk u-over-h ">
                                        <p class="stats__text">HP</p>
                                        <div class="stats__display">
                                            <div class="stats-d stats__display--hp" style="width:calc(${res.stats.hp}%/2); background:${getColor(res.type[0])};">
                                                <span class="stats__display-text hp">${res.stats.hp}</span>
                                            </div>
                                        </div>                    
                                    </div>

                                    <div class="stats__pk u-over-h">
                                        <p class="stats__text">Attack</p>
                                        <div class="stats__display ">
                                            <div class="stats-d stats__display--attack" style="width:calc(${res.stats.attack}%/2); background:${getColor(res.type[0])};">
                                                <span class="stats__display-text attack">${res.stats.attack}</span>
                                            </div>
                                        </div>                    
                                    </div>

                                    <div class="stats__pk u-over-h">
                                        <p class="stats__text">Defense</p>
                                        <div class="stats__display ">
                                            <div class="stats-d stats__display--defense" style="width:calc(${res.stats.defense}%/2); background:${getColor(res.type[0])};">
                                                <span class="stats__display-text defense">${res.stats.defense}</span>
                                            </div>
                                        </div>                    
                                    </div>

                                    <div class="stats__pk u-over-h">
                                        <p class="stats__text">Speed</p>
                                        <div class="stats__display ">
                                            <div class="stats-d stats__display--speed" style="width:calc(${res.stats.speed}%/2); background:${getColor(res.type[0])};">
                                                <span class="stats__display-text speed">${res.stats.speed}</span>
                                            </div>
                                        </div>                    
                                    </div>

                                    <div class="stats__pk u-over-h">
                                        <p class="stats__text">Sp Atk</p>
                                        <div class="stats__display ">
                                            <div class="stats-d stats__display--specialAttack" style="width:calc(${res.stats.spAtk}%/2); background:${getColor(res.type[0])};">
                                                <span class="stats__display-text special-attack">${res.stats.spAtk}</span>
                                            </div>
                                        </div>                    
                                    </div>

                                    <div class="stats__pk u-over-h">
                                        <p class="stats__text">Sp Def</p>
                                        <div class="stats__display ">
                                            <div class="stats-d stats__display--specialDefense" style="width:calc(${res.stats.spDef}%/2); background:${getColor(res.type[0])};">
                                                <span class="stats__display-text special-defense">${res.stats.spDef}</span>
                                            </div>
                                        </div>                    
                                    </div>
                                </div>
                            </div> 
                            
                            <p class="title u-over-h">${res.name}</p> 
                            
                            ${res.img == null ? `<p class='u-over-h unknown__txt'>unknown</p>` :`<img src='${res.img}' loading='lazy' alt='${res.name}' class='card__img u-over-h' >`}
                            
                            <div class="float u-over-h"></div> 
                        </div> 
                    </div> 
                    
                    <div class="info u-over-h"> 
                        <div class="pokemon__type u-over-h">
                            ${res.type.length > 1 ? `<div class="pokemon__type--1" style="background:${getColor(res.type[0])}">${res.type[0]}</div><div class="pokemon__type--2" style="background:${getColor(res.type[1])}">${res.type[1]}</div>` : `<div class="pokemon__type--1" style="background:${getColor(res.type[0])}">${res.type[0]}</div>` }
                                                
                            <p class="counter u-over-h">#${res.id}</p> 
                        </div>


                </div>
            </li>`

            elements.resultList.insertAdjacentHTML('beforeend', markUp);
}

const getId = async(pokemon) => {
    let id;
    if (pokemon.url.includes('pokemon-species')) {
        id = pokemon.url.split('pokemon-species/')[1].replace('/', '')
    } else {
        id = pokemon.url.split('pokemon/')[1].replace('/', '')
    }


    const details = new PokemonDetails(id)
    await details.getDetails();
    await displayResult(details);
}


const createButton = (page, type) => `
     <button class="btn-inline results__btn--${type} " data-goTo="${type === 'next' ? page + 1 : page - 1}">
        <span>Page ${type === 'next' ? page + 1 : page - 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'next' ? 'right' : 'left'}"></use>
        </svg>
      </button>
`

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage)

  let button;
  if (page ===  1 && pages > 1) {
    // only btn to go to next page
    button = createButton(page, 'next')
  } else if (page < pages) {
   // both btns
   button = `
        ${button = createButton(page, 'prev')}
        ${button = createButton(page, 'next')}          
   `
  } else if (page === pages && pages > 1) {
    // only btn to go to next page
    button = createButton(page, 'prev')
  }

 
 

  elements.paginationBtn.forEach(e => e.insertAdjacentHTML('afterbegin', button === undefined ? '' : button))


};

export const renderResult = async (pokemons, page = 1, resPerPage = 40) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    if (pokemons.length) {
        pokemons.slice(start, end).forEach(getId);
    } else  {
        const pokemon = {}
        let pokeTypes = [];
        pokeTypes.push(pokemons.types.map((e, i) => e.type.name))
        pokemon.type = pokeTypes[0];

        pokemon.stats = {
            hp: pokemons.stats[0].base_stat,
            attack: pokemons.stats[1].base_stat,
            defense: pokemons.stats[2].base_stat,
            spAtk: pokemons.stats[3].base_stat,
            spDef: pokemons.stats[4].base_stat,
            speed: pokemons.stats[5].base_stat
        }

        pokemon.id = pokemons.id;

        pokemon.img = pokemons.sprites.front_default;

        pokemon.name = pokemons.name;

        pokemon.result = pokemons;
        
        await displayResult(pokemon);
    }
    
    
    // render pagination buttons 
    renderButtons(page, pokemons.length, resPerPage)
}