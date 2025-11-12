function CommitBox({
  id,
  message,
  date,
  commitId,
}: {
  id: string;
  message: string;
  date: string;
  commitId: string;
}) {
  return (
    <a
      href={`#commit-${commitId}`}
      className="mb-4 block overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-200 ease-in-out hover:shadow-md"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-100 bg-purple-50 px-4 py-2 text-sm text-gray-500">
          <span className="font-mono text-xs text-gray-400">[{id}]</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>

        <div className="p-4">
          <p className="text-sm leading-snug font-medium text-gray-800">
            {message}
          </p>
        </div>
      </div>
    </a>
  );
}

export default CommitBox;
