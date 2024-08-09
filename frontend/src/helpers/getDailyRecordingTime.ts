import type { RecordingTime } from '@angel/interfaces/RecordingTime';

export const getDailyRecordingTime = (
  startTime?: string,
  endTime?: string,
): RecordingTime[] | undefined => {
  if (!startTime || !endTime) {
    return;
  }

  const segments: RecordingTime[] = [];
  let currentStartTime = new Date(startTime);
  const endDate = new Date(endTime);

  while (currentStartTime < endDate) {
    const currentEndTime = new Date(currentStartTime);
    currentEndTime.setDate(currentEndTime.getDate() + 1);

    if (currentEndTime > endDate) {
      currentEndTime.setTime(endDate.getTime());
    }

    segments.push({
      start: currentStartTime.toISOString(),
      end: currentEndTime.toISOString(),
    });

    currentStartTime = new Date(currentEndTime);
  }

  return segments;
};
