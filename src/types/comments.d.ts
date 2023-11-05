export type GetCommentsTypes = {
  id: string;
  sortType: string;
};

export type CommentResultTypes = {
  _id: string;
  calculatorId: string;
  author?: {
    _id: string;
    username: string;
    avatar: string;
    profession: string;
    company: string;
  };
  text: string;
  likes: [
    {
      userId: string;
    }
  ];
  replies: [
    {
      _id: string;
      author?: {
        _id: string;
        username: string;
        avatar: string;
        profession: string;
        company: string;
      };
      text: string;
      createdAt: Date;
    }
  ];
  createdAt: Date;
};
