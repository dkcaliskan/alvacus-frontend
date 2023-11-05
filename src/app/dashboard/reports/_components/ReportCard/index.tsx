'use client';

// API & Core
import React, { FunctionComponent } from 'react';

// Components
import ReportStatus from './ReportStatus';

// Contexts, Hooks
import useRelativeTime from '@/hooks/useRelativeTime';

// Types
import type { ReportCardTypes } from '@/types/report.d';

const ReportCardDashboard: FunctionComponent<ReportCardTypes> = ({
  report,
}) => {
  const controlledDate = useRelativeTime(report.createdAt);

  return (
    <div className='rounded-box custom-bg-color hover:shadow-lg hover:opacity-[0.88] transition ease-in-out duration-200  lgMax:rounded-md min-h-[180px] z-10'>
      <div className='card-body px-0 py-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center px-3 pt-[8.5px]'>
            <p className=''>
              Report Date = {report.createdAt.toString()} · {controlledDate}
            </p>
          </div>
          <div className='flex items-center'>
            <ReportStatus
              reportId={report._id}
              reportStatus={report.isReportSeen}
            />
          </div>
        </div>
        <div className=' lgMax:px-1.5 px-3 '>
          <div className='pb-3 pt-1.5 prose max-w-none break-words'>
            <p>
              <span className='underline font-bold'>Username</span>:{' '}
              {report.username ? report.username : '[Anonymous]'}
            </p>
            <p>
              <span className='underline font-bold'>Email</span>:{' '}
              {report.email ? report.email : '[Anonymous]'}
            </p>
            {report.subject && (
              <p>
                <span className='underline font-bold'>Subject</span>:{' '}
                {report.subject ? report.subject : '[No Subject]'}
              </p>
            )}
            {report.message && (
              <p>
                <span className='underline font-bold break-words '>
                  Message
                </span>
                : {report.message ? report.message : '[No Message]'}
              </p>
            )}
            {report.calculatorTitle && (
              <p>
                <span className='underline font-bold'>Calculator Title</span>:{' '}
                {report.calculatorTitle}
              </p>
            )}
            {report.calculatorId && (
              <p>
                <span className='underline font-bold'>Calculator Id</span>:{' '}
                {report.calculatorId}
              </p>
            )}

            {report.commentContent && (
              <p>
                <span className='underline font-bold'>Comment Content</span>:{' '}
                {report.commentContent}
              </p>
            )}
            {report.commentId && (
              <p>
                <span className='underline font-bold'>Comment Id</span>:{' '}
                {report.commentId}
              </p>
            )}

            {report.commentReportReason && (
              <p>
                <span className='underline font-bold'>
                  Comment Report Reason
                </span>
                : {report.commentReportReason}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardDashboard;
