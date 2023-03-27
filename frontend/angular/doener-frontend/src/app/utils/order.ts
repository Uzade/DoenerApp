import { UUID } from "./uuid";
export interface Order {
    uuid : UUID,
    type : string,
    option : string,
    message : string;
}
