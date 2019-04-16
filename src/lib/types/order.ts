import {item} from "./item";

export type order = {
    user_id : number;
    items : Array<item>
}