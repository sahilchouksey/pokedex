import axios from 'axios';
import request from '../config'
import * as dataView from '../views/dataView';


export default class PokemonDetails {
    constructor(id) {
        this.id = id;
    }

    async getDetails() {
        try {
            const data = await axios(`${request.defUrl}pokemon/${this.id}/`);
            const res = data.data;
            this.result = res;
            this.stats = {
                hp: res.stats[0].base_stat,
                attack: res.stats[1].base_stat,
                defense: res.stats[2].base_stat,
                spAtk: res.stats[3].base_stat,
                spDef: res.stats[4].base_stat,
                speed: res.stats[5].base_stat
            }
            this.id = res.id;
            this.img = res.sprites.front_default;
            let pokeTypes = [] 
            pokeTypes.push(res.types.map((e, i) => e.type.name))

            this.type = pokeTypes[0];
            this.name = res.name;
        } catch (error) {
            dataView.popupError();
            console.log(error);
        }
    }
}
