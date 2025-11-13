'use client';

import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
    <Giscus
      repo="yssccc/blog"
      repoId="R_kgDOQSMi_A"
      category="Announcements"
      categoryId="DIC_kwDOQSMi_M4Cxu4F"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="preferred_color_scheme"
      lang="ko"
      loading="lazy"
    />
  );
}
