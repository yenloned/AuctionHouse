export type allUserData = {
    firstname: string;
    lastname: string;
    email: string;
    balance: number;
    currentItem: string[];
    biddingItem: string[];
    winningItem: string[];
}

export type userDataForNavbar = {
    userId: string;
    userIcon: string;
    userBalance: number;
}