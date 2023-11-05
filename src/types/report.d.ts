export type ReportTypes = {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  username?: string;
  email?: string;
  subject: string;
  message: string;
  calculatorTitle?: string;
  calculatorId?: string;
  commentContent?: string;
  commentId?: string;
  commentReportReason?: string;
  isReportSeen: boolean;
};

export type ReportCardTypes = {
  report: ReportTypes;
};
