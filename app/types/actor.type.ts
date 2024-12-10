export type Actor = {
    id: number,
    name: string,
    gender: string,
    type: string,
    description: string,
    avatar: string,
    is_premium: boolean,
    language: {
        id: number,
        name: string,
        code: string
    },
    category: {
        id: number,
        name: string,
        code: string
    }
}

export enum ActorType {
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM",
}

export enum ActorLanguage {
    EN = "EN",
    VI = "VN",
}
export enum ActorGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}
