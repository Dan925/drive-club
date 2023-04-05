import { Lesson, Student, Instructor, User } from "@prisma/client"
export enum ListTypes {
    LESSONS,
    USERS
}

export type UserProfile = (Student | Instructor) & {
    userProfile: User
}

export type UILesson = Lesson & {
    instructor: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        userId: string;
    };
    student: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        userId: string;
    };
}
