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
            this.result = data.data;
        } catch (error) {
            dataView.clearResult();
            dataView.popupError();
            console.log(error);
        }
    }
}