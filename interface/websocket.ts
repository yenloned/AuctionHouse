export interface marketItemForWS {
    bidderActivity: ActivityForWS;
    topBidder: TopBidderForWS;
}

export interface TopBidderForWS {
    email: string;
    firstname: string;
    lastname: string;
    _id: string;
    iconURL: string;
    bidder_time: string|null;
}

export interface ActivityForWS {
    action: string,
    bid_price: number,
    timestamp: string,
    user_data: eachActivityForWS
}

export interface eachActivityForWS {
    firstname: string,
    lastname: string
}

