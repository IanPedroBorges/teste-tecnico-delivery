export type deliveryTypeReturn = {
    id: number;
    startPoint: string;
    checkpoint1: string;
    checkpoint2: string;
    endPoint: string;
    currentStop: string;
    status: string;
    userId: number;
    user: {
        name: string;
      };
      deliveryPerson: {
        name: string;
      };
    deliveryPersonId: number;
}

export type deliveryType = {
    startPoint: string;
    checkpoint1: string;
    checkpoint2: string;
    endPoint: string;
    currentStop: string;
    status: string;
    userId: number;
    deliveryPersonId: number;
}