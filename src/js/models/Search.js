import axios from 'axios';
import request from '../config'
import * as dataView from '../views/dataView';


export default class Search {
    constructor(name) {
        this.name = name;
    }

    async getDetails() {
        try {
            const data = await axios(`${request.defUrl}pokemon/${this.name}`);
        
            console.log(data);
            this.result = data.data;
            console.log(this.result);
        } catch (error) {
            dataView.clearResult();
            dataView.popupError();
            console.log(error);
        }
    }
}