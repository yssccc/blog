import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">페이지를 찾을 수 없어요</h1>

      <p className="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 주소가 잘못 입력되었습니다.
      </p>

      <Link
        href="/"
        className="px-5 py-2 rounded-md text-white bg-gray-700 hover:bg-gray-700/90 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
