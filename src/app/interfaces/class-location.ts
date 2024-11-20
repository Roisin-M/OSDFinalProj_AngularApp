export enum ClassFormat{
    Location = 'Location', 
    Stream = 'Stream', 
    Both = 'Both' 
}

export interface ClassLocation {
    id? :string; // MongoDB ObjectId represented as a string
    name: string;
    maxCapacity: number;
    location: string;
    classFormats: ClassFormat[];
    classIDs?:string[]; 
}
