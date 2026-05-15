'use server'

export async function submitContactForm(formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  // Aquí integrarías un servicio transaccional como Resend, SendGrid o guardarías en base de datos (Prisma/Drizzle)
  console.log('Nueva solicitud de presupuesto:', data)
 
  // En un entorno real validarías con Zod y devolverías el estado
  // return { success: true, message: "Mensaje enviado correctamente" }
}