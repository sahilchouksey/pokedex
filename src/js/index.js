import Search from './models/Search';
import Data from './models/Data';
import FilterType from './models/FilterType';
import FilterGen from './models/FilterGen';
import PokemonDetails from './models/PokemonDetails';
import * as dataView from './views/dataView';
import { elements, renderLoader, clearLoader } from './views/base'
import { data } from 'autoprefixer';

// GLOBAL VARIABLES
const state = {};

state.filterb = 0;

const controlSearch = async () => {
    clearLoader();
    dataView.clearFilterBtn();
    dataView.removeError();
    window.location.hash = ""
    let query = dataView.getInput() //.toLowerCase();
  
    if (query.length > 0) {
        // document.activeElement.blur();

        state.search = []
        query.forEach(q => state.search.push(new Search(q)) ) 


        dataView.clearResult()
        renderLoader(elements.container);

        try {
            state.search.forEach(async(s) => {
                await s.getDetails();
                

                clearLoader();
                await dataView.renderResult(s.result);
                
            })
            
            dataView.clearSearchInput()
            document.activeElement.blur();

            state.filterb--;
        } catch (error) {
            state.filterb--;
            dataView.popupError();
            console.log(error);
        }
    } else {
        state.filterb--;
        dataView.popupError();
        console.log(error);
    }
    
}


const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
        const context = this
        const args = arguments 
            clearTimeout(debounceTimer) 
                debounceTimer 
            = setTimeout(() => func.apply(context, args), delay) 
    } 
}  


// elements.searchForm.addEventListener('onkeypress', e=> {
//     e.preventDefault();
//     controlSearch()
// })

elements.searchForm.addEventListener('keydown', debounce(function() { 
    // e.preventDefault();
    controlSearch()
}, 700)); 


const controlPokemonData = async () => {
    dataView.removeError();
    window.location.hash = ""
    renderLoader(elements.container);
    try {
        state.pokeData = new Data(); // show num of res/ start
        
        await state.pokeData.getResults();

        clearLoader()
        await dataView.renderResult(state.pokeData.result);
        

    } catch (error) {
        state.filterb--;
        dataView.popupError();
        console.log(error);
    }
}



['load'].forEach(e=> {
    window.addEventListener(e, controlPokemonData);
    window.addEventListener(e, () => {if (window.location.hash !== "" && state.filterb < 1 ) dataView.addFilterBtn(window.location.hash.replace('#', ''))})
})

window.addEventListener('hashchange', () => {
    if (window.location.hash !== "" && state.filterb < 1 ) dataView.addFilterBtn(window.location.hash.replace('#', ''))
})



elements.contentContainer.addEventListener('click', e=> {
    if (elements.hamburgerCheck.checked) {
        elements.hamburgerCheck.checked = false
    }
})

elements.navBar.addEventListener('click', e=> {
    if (!elements.hamburgerCheck.checked) {
        elements.hamburgerCheck.checked = true
    }
})


 
const controlFilterType = async () => {
    

    dataView.removeError();
    if (state.filterb < 1) {
        // if (window.location.hash !== "") dataView.addFilterBtn(window.location.hash.replace('#', ''))
        const type = window.location.hash.replace('#', '');
        if (type ) {

            elements.hamburgerCheck.checked = false
            dataView.clearResult()

            renderLoader(elements.container);

            state.filterType = new FilterType(type);

            try {
                
                await state.filterType.getResults();

                clearLoader();
                await dataView.renderResult(state.filterType.result);
                

                state.filterb++;

            } catch (error) {
                state.filterb--;
                dataView.popupError();
                console.log(error);
            }  
        }  
    }
}



const controlFilterGen = async () => {

    dataView.removeError();
    
    if (state.filterb < 1) {

            const gen = window.location.hash.replace('#generation/', '');

        if (gen) {
            elements.hamburgerCheck.checked = false
            dataView.clearResult()
            renderLoader(elements.container);
            state.filterGen = new FilterGen(gen);
            

            try {
                
                await state.filterGen.getResults();

                clearLoader();
                await dataView.renderResult(state.filterGen.result);
                

                state.filterb++;

            } catch (error) {
                state.filterb--;
                dataView.popupError();
                console.log(error);
            }  
        }
    }
}



window.addEventListener('hashchange', () => {
    if(state.filterb < 1 && window.location.hash.toString().indexOf('#generation/') > -1 ) {
        controlFilterGen()
    } else if (state.filterb < 1 && window.location.hash.toString().indexOf('#type/') > -1 ) {
        controlFilterType();
    }
})



elements.typeFilterBtn.forEach(e => {
    if (state.filterb < 1 ) e.addEventListener('click', controlFilterType);
})

elements.genFilterBtn.forEach(e => {
    if (state.filterb < 1 ) e.addEventListener('click', controlFilterGen);
})




elements.contentContainer.addEventListener('click', e=> {
    const btn = e.target.closest('.close--btn');
    if (btn) {
        window.location.hash = ''
        dataView.clearFilterBtn();
        window.location.reload();
    }
})



elements.errorPopup.addEventListener('click', e=> {
    const btn = e.target.closest('.error__btn');
    if (btn) {
        window.location.hash = ''
        dataView.clearFilterBtn();
        dataView.removeError();
        window.location.reload();
    }
})




elements.paginationBtn.forEach(e=> e.addEventListener('click', async (e) => {
    dataView.removeError();
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        try {
            // if (btn.dataset.goto/2==0) {await controlPokemonData(state.defNum+=50)}
            // else {await controlPokemonData(state.defNum-=50)}
            const goToPage = parseInt(btn.dataset.goto, 10);
            dataView.clearResult();
            if (window.location.hash !== "" && window.location.hash.toString().indexOf('#generation/') > -1) {
                dataView.renderResult(state.filterGen.result, goToPage);
            } else if (window.location.hash !== "" && window.location.hash.toString().indexOf('#type/') > -1) {
                dataView.renderResult(state.filterType.result, goToPage);
            } else {
                dataView.renderResult(state.pokeData.result, goToPage);
            }
        }   catch(error) {
            dataView.popupError();
            console.log(error);
        }        
    }
  }))




//   elements.resultList.addEventListener('click', async (e) => {
//       const box = e.target.closest('.card__header');
//       if (box) {
//           if(!box.previousElementSibling.checked) box.previousElementSibling.checked = true;
//       }
//   })