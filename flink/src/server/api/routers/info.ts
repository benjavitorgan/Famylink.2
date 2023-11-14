import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const fetchinfoRouter = createTRPCRouter({
    buscarInfoOP: publicProcedure
        .input(z.object({ dni: z.string(), nombre: z.string() }))
        .mutation(async ({ input, ctx }) => {
            
            const { dni } = input;
            

            if (!dni) {
                throw new Error("El número de dni no es válido.");
            }

            const info = await ctx.prisma.user.findMany ({
                where: {
                    dni: dni
                }, select: {
                    bloodType: true,
                    sickness: true,
                    age: true,
                    dni: true,
                    name: true,
                    role: true

                }
            }); 

            if (!info) {
                throw new Error("Error al encontrar informacion del paciente");
            }

            return info;
        }),
});