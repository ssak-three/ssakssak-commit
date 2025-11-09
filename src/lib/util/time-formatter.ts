const getRemainingSeconds = (unixTime: number): number => {
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, unixTime - now);
};

const formatDuration = (seconds: number): string => {
  if (seconds <= 0) {
    return "0분";
  }

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}시간 ${remainingMinutes}분`
      : `${hours}시간`;
  }

  return `${minutes}분`;
};

const formatRemainingTime = (unixTime: number): string => {
  const remainingSeconds = getRemainingSeconds(unixTime);
  return formatDuration(remainingSeconds);
};

export { getRemainingSeconds, formatDuration, formatRemainingTime };
