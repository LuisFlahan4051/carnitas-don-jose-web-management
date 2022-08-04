export type Alert = {
    display: boolean;
    message: string;
    type: string;
} 

export type report = {
    id: number;
    title: string;
    description: string;
};

export type monetaryBound = {
    id: number;
    title: string;
    description: string;
    amount: number;
}

export type monetaryDiscounts = {
    id: number;
    title: string;
    description: string;
    amount: number;
}

export type User = {
    id: string | undefined | null;
    name: string | undefined | null;
    lastname: string | undefined | null;
    username: string | undefined | null;
    // password: string | undefined | null;
    admin: boolean | undefined | null;
    root: boolean | undefined | null;
    verified: boolean | undefined | null;
    reported: boolean | undefined | null;
    reports: report[] | undefined | null;
    activeContract: boolean | undefined | null;
    admissionDate: string | undefined | null;
    unemployedDate: string | undefined | null;
    workedHours: number | undefined | null;
    currentBranch: string | undefined | null;
    originalBranch: string | undefined | null;

    monetaryBounds: monetaryBound[] | undefined | null;
    monetaryDiscounts: monetaryDiscounts[] | undefined | null;

    mail: string | undefined | null;
    alternativeMails: string[] | undefined | null;
    phone: string | undefined | null;
    alternativePhones: string[] | undefined | null;
    address: string | undefined | null;
    alternativeAddresses: string[] | undefined | null;
    bornDate: string | undefined | null;
    degreeStudy: string | undefined | null;
    relationship: string | undefined | null;
    curp: string | undefined | null;
    citizenId: string | undefined | null;
    credentialId: string | undefined | null;
    originState: string | undefined | null;

    score: number | undefined | null;
    qualities: string[] | undefined | null;
    defects: string[] | undefined | null;

    darktheme: boolean | undefined | null;
    // profilePicture: string | undefined | null;
}

export type UserSimplified = {
    id: User['id'];
    name: User['name'];
    lastname: User['lastname'];
    username: User['username'];
    phone: User['phone'];
    mail: User['mail'];
    darktheme: User['darktheme'];
}

export type CurrentUser = {
    id: string;
    name: string | undefined;
    lastname: string | undefined;
    username: string | undefined;
    phone: string | undefined;
    mail: string | undefined;
}