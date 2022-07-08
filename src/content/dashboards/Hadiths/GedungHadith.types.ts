import { Bani, BirthPlace, BooksName, HadithStatuses, NarratorsStatus } from "./GedungHadith.enum"

export interface Hadith {
    id: string;
    chains: string[];
    content: {
        volume: number;
        bookNumber: number;
        bookName: string;
        hadithNumber: number
    }
    createdAt: string;
    hadithContent: {
        arabic: string;
        english: string;
        malay: string;
    };
    narratedBy: string;
    status: HadithStatuses;
    updatedAt: string;
}

export interface Book {
    id: string;
    name: BooksName;
    author: {
        name: string;
        kunyah: string;
        birthPlace: string;
    };
    syarahList: string[];
    bestSyarah: string;
}

export interface Narrator {
    id: string;
    name: string;
    status: NarratorsStatus,
    birthPlace: BirthPlace,
    bani: Bani,
    misc?: string[];
}