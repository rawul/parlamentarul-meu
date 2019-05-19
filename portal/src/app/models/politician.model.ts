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
        public imageUrl: string,
        public county: string,
        public politicianType: PoliticianType,
        public wealthDeclaration: any,
        public announcements: any,
        public activity: {
            declaratiiPolitice: number
            intrebariSiInterpelari: number
            luariDeCuvant: { total: number, sedinte: number }
            motiuni: number
            propuneriDeHotarare: number
            propuneriLegislative: { total: number, promulgate: number }
        }
    ) { }
}