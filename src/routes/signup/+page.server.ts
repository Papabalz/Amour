import { request } from "http";
import type { Actions } from "./$types";
import { createUser } from "$lib/action/user";


export const actions = {
        default: async (event) => {
          
            return  createUser({request: event.request});
        }
    
} satisfies Actions;