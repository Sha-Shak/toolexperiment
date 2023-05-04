function getStatus (startTime, duration, completedTime, status) {
  if (status === 'failed') return "failed";

  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  const currentStartTime = new Date(todayDate + 'T' + startTime);
  const currentStartTimeMilliSec = currentStartTime.getTime();

  const durationMilliSec = duration * 60 * 1000;

  const completedTimeDate = new Date(completedTime);
  const completedTimeMillisec = completedTimeDate.getTime();

  if ((completedTimeMillisec - currentStartTimeMilliSec) > durationMilliSec) return 'passed late';
  return 'passed';
}

module.exports = { getStatus };