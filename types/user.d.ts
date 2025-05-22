import { User as FirebaseUser } from 'firebase/auth';

export interface AppUser extends FirebaseUser {
  isAdmin: boolean;
  // Add other custom fields as needed
}
