export type ContactTypes = {
  _id: string;
  username?: string;
  email?: string;
  subject: string;
  message: string;
  isContactSeen: boolean;
  createdAt: Date;
};

export type ContactCardTypes = {
  contact: ContactTypes;
};
