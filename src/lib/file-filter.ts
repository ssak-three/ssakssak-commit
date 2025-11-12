const shouldExcludeFile = (
  filename: string,
  excludeList: (string | RegExp)[],
): boolean => {
  return excludeList.some((excludedFile) =>
    typeof excludedFile === "string"
      ? filename === excludedFile
      : excludedFile.test(filename),
  );
};

export { shouldExcludeFile };
