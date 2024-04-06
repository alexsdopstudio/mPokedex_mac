import { Results } from "./paginatedResponse";

export interface TypeResponse {
    name:  string;
    pokemon: {
        pokemon: Results
        slot: number
    }[]
}
