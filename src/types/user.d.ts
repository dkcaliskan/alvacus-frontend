type FollowerSchema = {
  userId: string;
};

type CalculatorsSavedByUsersSchema = {
  calculatorId: string;
  userId: string;
};
type LikedCommentsByUsersSchema = {
  commentId: string;
  userId: string;
  text: string;
};

type PrivacySettingsSchema = {
  showSavedCalculators: boolean;
  showComments: boolean;
};

export type UserTypes = {
  _id: string;
  userId: string;
  username: string;
  email: string;
  avatar?: string;
  role?: string;
  profession?: string;
  company?: string;
  isActivated?: boolean;
  followers: FollowerSchema[];
  likedCommentsByUsers: LikedCommentsByUsersSchema[];
  calculatorsSavedByUsers: CalculatorsSavedByUsersSchema[];
  privacySettings: PrivacySettingsSchema;
  error?: {
    message?: string;
  };
  userIp: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCardTypes = {
  user: UserTypes;
};

export type GetUserFromTokenType = {
  avatar?: string;
  userId: string;
  email?: string;
  profession?: string;
  username: string;
  company?: string;
  isActivated?: boolean;
  role: string;
};
