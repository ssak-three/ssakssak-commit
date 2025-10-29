import mockdata from "@mocks/data/report.json";

function RequirementList() {
  return (
    <div className="mt-auto flex min-h-[400px] flex-col">
      <div className="mb-3 border-[1px] border-black"></div>
      <div className="flex h-full flex-col rounded-[10px] border-2 border-gray-500 p-4">
        <p className="mb-3 text-center text-2xl font-bold">요구사항 리스트</p>
        <div className="border-[1px] border-gray-300"></div>

        <ul className="mb-3 list-inside list-disc text-left text-lg">
          {mockdata.mockRequirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RequirementList;
