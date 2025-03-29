import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  img: string;
  description: ReactNode;
  alt: string;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'MinecraftLaunch',
    img: 'https://lunova.studio/wp-content/uploads/2025/02/IMG_2186.png',
    description: 'C# 第三方 Minecraft 启动核心',
    alt: 'MinecraftLaunch Logo',
    link: '/docs/MinecraftLaunch'
  },
  {
    title: 'Monet',
    img: 'https://blessing-studio.cn/wp-content/uploads/2025/02/IMG_2337.png',
    description: '.NET Material You 风格颜色库',
    alt: 'Monet Logo',
    link: '/docs/Monet'
  },
  {
    title: 'WonderLab',
    img: 'https://lunova.studio/wp-content/uploads/2025/02/IMG_2200.png',
    description: '第三方 Minecraft 启动器',
    alt: 'WonderLab Logo',
    link: '/docs/WonderLab'
  },
];

function Feature({title, img, description, alt, link}: FeatureItem) {
  return (
    <Link to={link} className={clsx('button button--secondary', styles.feature)}>
        <div className={styles.featureDiv}>
          <img className={styles.featureSvg} src={img} alt={alt}/>
          <div className="text--left padding-horiz--md" style={{ width: "270px" }}>
            <Heading as="h3">{title}</Heading>
            <p style={{ fontWeight: "normal", width: "100%", wordWrap: "break-word", wordBreak: "break-all", overflow: "hidden" }}>{description}</p>
          </div>
        </div>
    </Link>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className={clsx('container', styles.features)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
      </div>
    </section>
  );
}
