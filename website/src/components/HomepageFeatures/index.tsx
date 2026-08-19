import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Strongly Typed',
    emoji: '🦾',
    description: (
      <>
        Mocks, stubs, and argument matchers are all backed by TypeScript's type
        system, with full IDE autocomplete.
      </>
    ),
  },
  {
    title: 'A Familiar Mockito API',
    emoji: '💖',
    description: (
      <>
        <code>mock</code>, <code>when</code>, and <code>verify</code> bring the
        readable, expressive mocking style of Java's Mockito to TypeScript.
      </>
    ),
  },
  {
    title: 'Spy on Real Objects',
    emoji: '🔎',
    description: (
      <>
        Partially mock a real instance with <code>spy</code>, stubbing only the
        methods you need while the rest call through to the real implementation.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={'text--center ' + styles.featureEmoji}>
          {emoji}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
