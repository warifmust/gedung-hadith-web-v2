export enum HadithStatuses {
    SAHIH = 'SAHIH',
    HASAN = 'HASAN',
    DHAIF = 'DHAIF',
    MAUDU = 'MAUDU',
}

export enum BooksName {
    SAHIH_BUKHARI = 'SAHIH_BUKHARI',
    SAHIH_MUSLIM = 'SAHIH_MUSLIM',
    SUNAN_ABI_DAUD = 'SUNAN_ABI_DAUD',
    SUNAN_TIRMIZHI = 'SUNAN_TIRMIZHI',
    SUNAN_NASAI = 'SUNAN_NASAI',
    SUNAN_IBNU_MAJAH = 'SUNAN_IBNU_MAJAH',
    RIYAD_AS_SOLIHIN = 'RIYAD_AS_SOLIHIN',
}

export enum NarratorsStatus {
    UNKNOWN = 'UNKNOWN',
    THIQAH = 'THIQAH',
    POOR = 'POOR',
}

export enum BirthPlace {
    MAKKAH = 'MAKKAH',
    MADINAH = 'MADINAH',
    KUFA = 'KUFA',
    DAMASCUS = 'DAMASCUS',
}

export enum Bani {
    UNKNOWN = 'UNKNOWN',
    QURAISY = 'QURAISY',
    AL_HILALI = 'AL_HILALI',
    MALIK = 'MALIK',
    TAYM = 'TAYM',
    KINANAH = 'KINANAH',
    ADI = 'ADI',
    ASAD = 'ASAD',
}

export const HadithStatusesMapping: Record<HadithStatuses, "success" | "warning" | "error" | "primary" | "secondary" | "info"> = {
    [HadithStatuses.SAHIH]: 'success',
    [HadithStatuses.HASAN]: 'success',
    [HadithStatuses.DHAIF]: 'warning',
    [HadithStatuses.MAUDU]: 'error',

}
