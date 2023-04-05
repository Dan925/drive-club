import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { Role, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
const usersRouter = createTRPCRouter({
    getAllStudents: protectedProcedure
        .query(({ ctx }) => {

            if (ctx.session.user.role === Role.STUDENT)
                throw new TRPCError({ message: "Students are not allowed to access all students accounts", code: 'UNAUTHORIZED' })
            return ctx.prisma.student.findMany({
                include: {
                    userProfile: true
                }
            });
        }),

    getAllInstructors: protectedProcedure
        .query(({ ctx }) => {
            if (ctx.session.user.role !== Role.ADMIN)
                throw new TRPCError({ message: "Non-Admins are not allowed to access all instructors accounts", code: 'UNAUTHORIZED' })
            return ctx.prisma.instructor.findMany({
                include: {
                    userProfile: true
                }
            });
        }),
    createStudent: protectedProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phoneNumber: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.role !== Role.ADMIN)
                throw new TRPCError({ message: "Non-Admins are not allowed to create student accounts", code: 'UNAUTHORIZED' })
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
            if (ctx.session.user.role !== Role.ADMIN)
                throw new TRPCError({ message: "Non-Admins are not allowed to create instructor accounts", code: 'UNAUTHORIZED' })
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

        }),

    deleteUserById: protectedProcedure
        .input(
            z.object({
                userId: z.string()
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.role !== Role.ADMIN)
                throw new TRPCError({ message: "Non-Admins are not allowed to delete user accounts", code: 'UNAUTHORIZED' })
            await ctx.prisma.user.delete({ where: { id: input.userId } })
            return input.userId
        })

});
export default usersRouter;
