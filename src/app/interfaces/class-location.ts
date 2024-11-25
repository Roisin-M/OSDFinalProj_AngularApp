export enum ClassFormat{
    Location = 'Location', 
    Stream = 'Stream', 
    Both = 'Both' 
}

export interface ClassLocation {
    _id? :any; // MongoDB ObjectId represented as a string
    name: string;
    maxCapacity: number;
    location: string;
    classFormats: ClassFormat[];
    classIDs?:string[]; 
}
