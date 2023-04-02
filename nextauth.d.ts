import { Role } from "@prisma/client"; 
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    role?: Role;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
