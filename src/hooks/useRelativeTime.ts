'use client';

import { useState, useEffect } from 'react';

export default function useRelativeTime(rawDate: Date) {
  const [controlledDate, setControlledDate] = useState('');

  useEffect(() => {
    const formatRelativeTime = () => {
      const date = new Date(rawDate);
      const diff = (Date.now() - date.getTime()) / 1000;

      // If the difference is less than 60 seconds, set the date to "just now"
      if (diff < 60) {
        setControlledDate('just now');
      } else if (diff < 3600) {
        setControlledDate(
          new Intl.RelativeTimeFormat('en', { style: 'narrow' }).format(
            -Math.round(diff / 60),
            'minute'
          )
        );
      }
      // If the difference is less than 2 hours, set the date to "1 hour ago" etc.
      else if (diff < 86400) {
        setControlledDate(
          new Intl.RelativeTimeFormat('en', { style: 'narrow' }).format(
            -Math.round(diff / 3600),
            'hour'
          )
        );
      }
      // If the difference is more than 24 hours, set the date to "1 day ago" etc.
      else {
        setControlledDate(
          new Intl.RelativeTimeFormat('en', { style: 'narrow' }).format(
            -Math.round(diff / 86400),
            'day'
          )
        );
      }

      // If the difference is more than 30 days, set the date to the actual date
      if (diff > 2592000) {
        setControlledDate(
          new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(date)
        );
      }
    };
    formatRelativeTime();

    //! Disable the linter because we don't want to run this on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return controlledDate;
}
