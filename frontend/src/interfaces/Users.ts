import { Roles } from "./Roles";

export interface Users {
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: Roles;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}
