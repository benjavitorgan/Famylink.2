//import { error } from "console";
import { z } from "zod";
import { prisma } from "~/server/db";
import {
    createTRPCRouter,
    publicProcedure,
    //protectedProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
    crearEvento: publicProcedure
        .input(z.object({ date: z.string(), type: z.string(), dniPaciente: z.string(), event: z.string(), time: z.string(), desc: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const {date, dniPaciente, event, type, time, desc} = input;

            const existingUser = await prisma.user.findUnique({
                where: {
                  dni: dniPaciente
                }, 
                
            });

            if (!existingUser) {
                throw new Error("El número de dni no corresponde a un paciente dado de alta");
                alert ("El paciente no esta dado de alta, registrelo primero");
            } 

            console.log("Hola")

            const newevent = await ctx.prisma.activities.create({
                data: {
                    date,
                    type,
                    event,
                    dniPaciente,
                    desc,
                    time
                }
            });

            if (!newevent) {
                throw new Error("No se pudo crear el evento");
            }

            return newevent;
        }),
    buscarEvento: publicProcedure
        .input(z.object({ dni: z.string() }))
        .mutation(async ({ input, ctx }) => {

            const { dni } = input;

            const existingUser = await prisma.user.findUnique({
                where: {
                  dni
                }, 
                
            });

            if (!existingUser) {
                throw new Error("El número de dni no corresponde a un paciente dado de alta");
            }

            const act = await ctx.prisma.activities.findMany({
                where: {
                    dniPaciente: dni
                },
                select: {
                    event: true,
                    date: true,
                    type: true,
                    desc: true,
                    time: true
                }
            });

            if (!act) {
                throw new Error("Error al encontrar el evento");
            }

            console.log(act);
            return act;
        }),
    crearSugerencia: publicProcedure
        .input(z.object({ dniPaciente: z.string(), dniMedico: z.string(), suggestion: z.string(), isVerified: z.boolean(), creatorName: z.string(),}))
        .mutation(async ({ input, ctx }) => {
            const { dniPaciente, dniMedico, suggestion, isVerified, creatorName} = input;

            const dniP = await ctx.prisma.user.findUnique({
                where: {
                    dni: dniPaciente
                }
            });

            if (!dniP) {
                throw new Error("El dni ingresado no corresponde a un paciente dado de alta");
            }

            const sugerencia = await ctx.prisma.suggests.create({
                data: {
                    dniPaciente,
                    dniMedico,
                    suggestion,
                    isVerified,
                    creatorName,
                }
            });

            return sugerencia
    }),
    verificarMedico: publicProcedure
        .input(z.object({ dniMedico: z.string(),}))
        .mutation(async ({ input, ctx }) => {
            const { dniMedico } = input;

            const medic = await ctx.prisma.user.findUnique ({
                where: {
                    dni: dniMedico,
                }, select: {
                    role: true
                }
            });

            if (medic?.role == "NS") {
                return true
            } else {
                throw new Error ("El dni no corresponde a un medico o enfermero dado de alta");
                return false
            }
    }),
    verificarSugerencia: publicProcedure
        .input(z.object({ dniSug: z.string()}))
        .mutation(async ({ input, ctx }) => { 
            const { dniSug } = input;

            const id = await ctx.prisma.suggests.findMany ({
                where: {
                    dniPaciente: dniSug
                }, select: {
                    id: true,
                }
            })

            const idSug = id;

            console.log(idSug);


    }),
    buscarSugerencia: publicProcedure
        .input(z.object({ dni: z.string(),}))
        .mutation(async ({ input, ctx }) => { 
            const { dni } = input;

            const existingUser = await prisma.user.findUnique({
                where: {
                  dni
                }, 
                
            });

            if (!existingUser) {
                throw new Error("El número de dni no corresponde a un paciente dado de alta");
            }

            const sug = await ctx.prisma.suggests.findMany ({
                where: {
                    dniPaciente: dni
                }, select: {
                    dniMedico: true,
                    suggestion: true,
                    creatorName: true
                }
            });

            if (!sug) {
                throw new Error("Error al encontrar el evento");
            }

            console.log(sug);
            return sug;
    }),
});
