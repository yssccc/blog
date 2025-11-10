import CategoryList from '../category/CategoryList';
import PostList from './PostList';

const dummyPosts = [
  {
    id: '1',
    title: 'WebSocket 서버 구축하기',
    content:
      'WebSocket을 활용하여 실시간 양방향 통신 서버를 구축하는 방법과 관련 기술, 프로토콜 상세 설명을 담은 기술 블로그입니다. 본문에서는 Node.js와 Nest.js를 이용한 예제 코드를 포함하여 서버 설정과 클라이언트 통신 처리 방식에 대해 다룹니다.',
    date: '2025.11.10',
    thumbnail: '/sample.jpeg',
    categories: ['FE'],
  },
  {
    id: '2',
    title:
      'WebSocket 서버 구축하기 in Nest.js: 실시간 데이터 처리와 이벤트 기반 아키텍처 설계 전략',
    content:
      'Nest.js 환경에서 WebSocket 서버를 구현하는 상세 가이드입니다. 실시간 데이터 스트림 처리, 이벤트 핸들링, 에러 관리, 확장성 고려 사항 및 성능 최적화 방법에 대한 심층 분석을 담고 있습니다.',
    date: '2025.11.09',
    thumbnail: '/sample2.jpeg',
    categories: ['Nest.js', 'WebSocket'],
  },
  {
    id: '3',
    title:
      '효율적인 WebSocket 서버 구축하기 in Nest.js: 클러스터링, 로드밸런싱 그리고 스케일링을 고려한 고가용성 실시간 통신 시스템 설계',
    content:
      '고가용성과 확장성을 중점으로 한 Nest.js 기반 WebSocket 서버 아키텍처 설계 방법을 소개합니다. 클러스터링과 로드밸런싱 기법, 트래픽 분산, 장애 조치 전략 등을 포함하여 대규모 실시간 통신 문제를 해결하는 기술적 접근 방법을 다룹니다.고가용성과 확장성을 중점으로 한 Nest.js 기반 WebSocket 서버 아키텍처 설계 방법을 소개합니다. 클러스터링과 로드밸런싱 기법, 트래픽 분산, 장애 조치 전략 등을 포함하여 대규모 실시간 통신 문제를 해결하는 기술적 접근 방법을 다룹니다.',
    date: '2025.11.09',
    thumbnail: '/sample3.png',
    categories: ['Nest.js', '클러스터링'],
  },
];

export default function PostListPage() {
  return (
    <div className="flex justify-center gap-25">
      <PostList posts={dummyPosts} />
      <CategoryList />
    </div>
  );
}
