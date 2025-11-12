'use client';

interface Category {
  name: string;
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryList({
  categories,
  selectedCategory,
  onSelect,
}: CategoryListProps) {
  return (
    <div className="flex flex-col space-y-2 min-w-30 gap-1">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onSelect(category.name)}
          className={`flex items-center p-2 gap-3 text-sm transition 
            ${
              selectedCategory === category.name
                ? 'text-main font-semibold'
                : ''
            }`}
        >
          <span>{category.name}</span>
          <span className="text-gray-400">({category.count})</span>
        </button>
      ))}
    </div>
  );
}
