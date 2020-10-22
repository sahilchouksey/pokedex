import axios from 'axios';
import request from '../config'
import * as dataView from '../views/dataView';


export default class FilterType {
    constructor(gen) {
        this.gen = gen;
    }

    async getResults() {
        try {
            const data = await axios(`${request.defUrl}generation/${this.gen}`);
            this.result = data.data.pokemon_species;
        } catch (error) {
            dataView.clearResult();
            dataView.popupError();
            console.log(error);
        }
    }
}