function LayoutHeader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-2 pr-12 text-[40px] font-bold">🧹싹싹커밋</div>
      <div className="text-center">
        <span className="text-gray-400">복잡한 커밋을</span>
        <span className="text-yellow-500"> 싹싹 </span>
        <span className="text-gray-400">모아서 한 눈에 이해할 수 있게</span>
        <span className="text-yellow-500"> 리포트</span>
        <span className="text-gray-400">로 만들어 드립니다</span>
      </div>
    </div>
  );
}

export default LayoutHeader;
