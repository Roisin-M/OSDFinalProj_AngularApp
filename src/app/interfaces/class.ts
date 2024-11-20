// Enum for Yoga Speciality
export enum YogaSpeciality {
    Hatha = 'Hatha',
    Vinyasa = 'Vinyasa',
    Ashtanga = 'Ashtanga',
    Bikram = 'Bikram',
    Iyengar = 'Iyengar',
    Kundalini = 'Kundalini',
    Yin = 'Yin',
    Restorative = 'Restorative',
    PowerYoga = 'Power Yoga',
    Jivamukti = 'Jivamukti',
    Anusara = 'Anusara',
    Sivananda = 'Sivananda',
    Prenatal = 'Prenatal',
    AerialYoga = 'Aerial Yoga',
    AcroYoga = 'AcroYoga',
    ChairYoga = 'Chair Yoga',
    Viniyoga = 'Viniyoga',
    YogaNidra = 'Yoga Nidra',
    IntegralYoga = 'Integral Yoga',
    TantraYoga = 'Tantra Yoga'
}
// Enum for Class Levels
export enum ClassLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced'
}
// Enum for Class Categories (focuses)
export enum ClassCategory {
    Balance = 'Balance',
    Flexibility = 'Flexibility',
    Strength = 'Strength',
    Handstands = 'Handstands',
    UpsideDown = 'Upside Down',
    Relaxation = 'Relaxation',
    Core = 'Core',
}
// Enum for Class Format
export enum ClassFormat {
    Location = 'Location', 
    Stream = 'Stream', 
    Both = 'Both' 
}
export interface Class {
    id?: string;
    instructorId: string; // Reference to the Instructor for one-to many relationship
    description: string;
    classLocationId: string; // Reference to the Class Location for one-to many relationship
    date: Date; //type date (day only)
    startTime: string; //hh:mm string in 24 hour format
    endTime: string;  //hh:mm string in 24 hour format
    level: ClassLevel[]; // Array of class levels (e.g., Beginner, Intermediate, Advanced)
    type: YogaSpeciality[]; // Array of yoga specialities (reusing YogaSpeciality enum)
    category: ClassCategory[]; // Array of class categories (focus of the class)
    classFormat: ClassFormat; // Format of the class (Location, Stream, or Both)
    spacesAvailable: number; // Number of available spaces for the class
}
