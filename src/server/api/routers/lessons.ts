import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
export const lessonsRouter = createTRPCRouter({
    getAvailableLessons: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.lesson.findMany({
                where: {
                    booked: false,
                    startAt: {
                        gte: new Date()
                    }
                }
            });
        }),

    getUserLessons: protectedProcedure
        .query(({ ctx }) => {
            if (ctx.session.user.role === Role.INSTRUCTOR) {
                return ctx.prisma.lesson.findMany({
                    where: {
                        instructor: {
                            userId: ctx.session.user.id
                        }
                    }
                })
            }

            else if (ctx.session.user.role === Role.STUDENT) {
                return ctx.prisma.lesson.findMany({
                    where: {
                        student: {
                            userId: ctx.session.user.id
                        }
                    }
                })

            }
            return ctx.prisma.lesson.findMany();
        }),
    createLesson: protectedProcedure
        .input(z.object({
            startAt: z.string().datetime(),
            endAt: z.string().datetime(),
            pickUpLocation: z.string(),
            dropOffLocation: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            const instructor = await ctx.prisma.instructor.findFirst({
                where: {
                    userId: ctx.session.user.id
                },
                select: {
                    id: true
                }

            })
            if (instructor) {
                const lesson = await ctx.prisma.lesson.create({
                    data: {
                        startAt: input.startAt,
                        endAt: input.endAt,
                        pickUpLocation: input.pickUpLocation,
                        dropOffLocation: input.dropOffLocation,
                        instructorId: instructor.id
                    }
                })
                return lesson;
            }
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Lesson cannot be created, instructor not found',
            });

        }),

    bookLessonById: protectedProcedure
        .input(z.object({
            lessonId: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            const student = await ctx.prisma.student.findFirst({
                where: {
                    userId: ctx.session.user.id
                },
                select: {
                    id: true
                }
            });
            if (student) {
                try {
                    const updatedLesson = await ctx.prisma.lesson.update({
                        where: {
                            id: input.lessonId,
                        },
                        data: {
                            booked: true,
                            studentId: student.id
                        }
                    });
                    return updatedLesson;

                } catch (error) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Lesson could not be canceled',
                        cause: error
                    });
                }
            }

            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Lesson cannot be booked, student not found',
            });

        }),

    cancelLessonById: protectedProcedure
        .input(z.object({
            lessonId: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            const instructor = await ctx.prisma.instructor.findFirst({
                where: {
                    userId: ctx.session.user.id
                },
                select: {
                    id: true
                }
            });
            if (instructor) {
                try {
                    const updatedLesson = await ctx.prisma.lesson.update({
                        where: {
                            id: input.lessonId,
                        },
                        data: {
                            canceled: true
                        }
                    })
                    return updatedLesson;

                } catch (error) {

                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Lesson could not be canceled',
                        cause: error
                    });
                }
            }

            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Lesson cannot be booked, student not found',
            });

        })
});
