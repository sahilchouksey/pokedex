export const elements = {
    resultList: document.querySelector('.results_list'),
    paginationBtn:  Array.from(document.querySelectorAll('.pagination')),
    boxImg: document.querySelector('.card__img'),
    typeFilterBtn: Array.from(document.querySelectorAll('.btn-filter')),
    contentContainer: document.querySelector('.content-pg'),
    genFilterBtn: Array.from(document.querySelectorAll('.filter-gen')),
    container: document.querySelector('.container'),
    searchValue: document.querySelector('.search__input'),
    searchForm: document.querySelector('.search'),
    filterBtn: document.querySelector('.filter--b'),
    errorPopup: document.querySelector('.error_popup'),
    hamburgerCheck: document.getElementById('hamburger'),
    navBar: document.querySelector('.primnav'),
    cards: Array.from(document.querySelectorAll('.item__card'))
};

const elStr = {
    loader : 'preloader'
};

export const renderLoader = parent => {
    const loader = `
    <div class="${elStr.loader}"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader)
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elStr.loader}`);
    if (loader) loader.parentNode.removeChild(loader)
}