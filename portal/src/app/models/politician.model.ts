export enum PoliticianType {
    deputy,
    senator
}
export class Politician {
    constructor(
        public name: string,
        public _id: string,
        public party: string,
        public email: string,
        public address: string,
        public url: string,
        public county: string,
        public politicianType: PoliticianType
    ) { }
}