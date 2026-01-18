import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptionsLanding } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <HomeLayout {...baseOptionsLanding()}>{children}</HomeLayout>;
}
