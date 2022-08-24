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

export type currentItemType = {
    _id: string;
    name: string;
    start_price: string;
    current_price: string;
    photo_URL: string;
}