import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();

    // Verificar si el email ya existe en la base de datos
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear el nuevo usuario
    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        state: data.state ?? 1, // Asignar estado por defecto si no se proporciona
        admin: data.admin ?? 0, // Asignar rol de administrador por defecto si no se proporciona
      },
    });

    // Excluir la contraseña de la respuesta
    const { password, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
