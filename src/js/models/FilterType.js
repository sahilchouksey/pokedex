import axios from 'axios';
import request from '../config'
import * as dataView from '../views/dataView';


export default class FilterType {
    constructor(type) {
        this.type = type;
    }

    async getResults() {
        try {
            const data = await axios(`${request.defUrl}${this.type}`);
            let results = [];
            results.push(data.data.pokemon.map(e=> e.pokemon)) 
            this.result = results[0];
        } catch (error) {
            dataView.clearResult();
            dataView.popupError();
            console.log(error);
        }
    }
}