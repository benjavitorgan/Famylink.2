import { error } from "console";
import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
    crearEvento: protectedProcedure
        .input(z.object({ date: z.string(), type: z.string(), dniPaciente: z.string(), event: z.string(), time: z.string(), desc: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const {date, dniPaciente, event, type, time, desc} = input;

            /*
            const nurse = await ctx.db.user.findUnique({
                where: {
                  dni: dni,
                },
                select: {
                  role: true,
                },
              });
              
              if (nurse && nurse.role === "NS") {
                return nurse;
              }

            if (!nurse) {
                throw new Error("No se encontro el usuario");
            }

            if (nurse?.role !== "NS") {
                throw new Error('Solo un medico puede crear eventos, intente cambiando su usuario!');
            }*/


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
        .query(async ({ input, ctx }) => {
            const { dni } = input;

            //const dniPN = parseInt(dni);
            const dniPN = dni;

            if (!dniPN) {
                throw new Error("El número de dni no es válido.");
            }

            const act = await ctx.prisma.activities.findMany({
                where: {
                    dniPaciente: {
                        equals: dniPN
                    }
                },
                select: {
                    event: true,
                    date: true,
                    type: true,
                    desc: true,
                    dniPaciente: true,
                    time: true
                }
            });

            if (!act) {
                throw new Error("Error al encontrar el evento");
            }

            return act;
        }),
    crearSugerencia: protectedProcedure
        .input(z.object({ dniPaciente: z.string(), dniMedico: z.string(), suggestion: z.string(), isVerified: z.boolean(), creatorName: z.string(),}))
        .query(async ({ input, ctx }) => {
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
    }),
    verificarMedico: publicProcedure
        .input(z.object({ dniMedico: z.string(),}))
        .query(async ({ input, ctx }) => {
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
});
