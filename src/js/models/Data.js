import axios from 'axios';
import request from '../config'
import * as dataView from '../views/dataView';


export default class PokemonData {
    constructor(offset= 0) {
        this.offset = offset;
    }

    async getResults() {
        try {
            const data = await axios(`${request.defUrl}pokemon?limit=1050&offset=${this.offset}`);
            this.result = data.data.results;
            this.names = [] 
            data.data.results.forEach(e=> this.names.push(e.name))
            localStorage.setItem('names', this.names)
            
        } catch (error) {
            dataView.popupError();
            console.log(error);
        }
    }
}
// ?limit=50&