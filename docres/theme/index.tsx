import Theme from 'rspress/theme';
import {Index} from '@/components/preview';

// 以下展示所有的 Props
const Layout = () => (
  <Theme.Layout
    /* Home 页 Hero 部分之后 */
    afterHero={<div>
        <Index />
    </div>}
  />
);

export default {
  ...Theme,
  Layout,
};

export * from 'rspress/theme';