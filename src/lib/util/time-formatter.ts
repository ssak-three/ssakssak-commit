const formatUnixToKoreanTime = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);

  return date.toLocaleTimeString("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export { formatUnixToKoreanTime };
