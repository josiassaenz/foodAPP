export interface Identification {
    id: number;
    typeIdentification: string;
}

export interface Location {
    id: number;
    nameMunicipality: string;
}

export interface TypeRoad {
    id: number;
    keyRoad: string;
}

export interface NameRoad {
    id: number;
    name: string;
}

export interface Country {
    id: number;
    name: string;
    nombre: string;
}

export interface Beneficiary {
    id: number;
    names: string;
    celPhone: string;
    kg: number;
    signture: string;
}