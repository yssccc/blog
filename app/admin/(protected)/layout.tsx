import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin')?.value === 'true';

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
