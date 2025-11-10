interface Category {
  name: string;
  count: number;
}

const categories: Category[] = [
  { name: '전체보기', count: 150 },
  { name: 'JavaScript', count: 2 },
  { name: 'FE', count: 4 },
  { name: 'WebSocket', count: 1 },
];

export default function CategoryList() {
  return (
    <div className="flex flex-col space-y-2 min-w-30 gap-1">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex items-center cursor-pointer p-2 gap-3  text-sm"
        >
          <span>{category.name}</span>
          <span className="text-gray-400">({category.count})</span>
        </div>
      ))}
    </div>
  );
}
