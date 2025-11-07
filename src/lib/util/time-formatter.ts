const formatRemainingTime = (unixTime: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const remainingSeconds = unixTime - now;

  if (remainingSeconds <= 0) {
    return "0분";
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}시간 ${remainingMinutes}분`
      : `${hours}시간`;
  }

  return `${minutes}분`;
};

export { formatRemainingTime };
