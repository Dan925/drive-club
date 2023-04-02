import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { Role, User } from "@prisma/client";
export const usersRouter = createTRPCRouter({
    getAllStudents: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.student.findMany();
        }),

    getAllInstructors: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.instructor.findMany();
        }),
    createStudent: protectedProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phoneNumber: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            const user: User = await ctx.prisma.user.create({
                data: {
                    email: input.email,
                    role: Role.STUDENT,
                }

            })
            const student = await ctx.prisma.student.create({
                data: {
                    userId: user.id,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    phoneNumber: input.phoneNumber
                }
            })
            return student;

        }),

    createInstructor: protectedProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phoneNumber: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            const user: User = await ctx.prisma.user.create({
                data: {
                    email: input.email,
                    role: Role.INSTRUCTOR,
                }

            })
            const instructor = await ctx.prisma.instructor.create({
                data: {
                    userId: user.id,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    phoneNumber: input.phoneNumber
                }
            })
            return instructor;

        })
});
