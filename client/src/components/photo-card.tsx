import { createUseStyle } from '@src/config/theme';
import Case from 'case';
import React from 'react';
import { Ripple } from './buttons/ripple';
import { Card } from './card';

export function PhotoCard(props: {
  title: string;
  positionY?: number;
  onClick?: () => void;
}) {
  const { styles } = useStyle();
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  return (
    <Card.Wrapper style={styles.container(!props.onClick)}>
      <Ripple
        style={styles.ripple}
        onClick={props.onClick}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseOut={() => {
          setIsMouseOver(false);
        }}
      >
        <div
          style={styles.background(
            props.title,
            props.positionY || 0.5,
            isMouseOver ? 1.1 : 1
          )}
        />
        <div style={styles.gradient}>
          <div style={styles.title}>{props.title}</div>
        </div>
      </Ripple>
    </Card.Wrapper>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: (disabled: boolean) => ({
    height: 160,
    borderWidth: 2,
    borderStyle: disabled ? undefined : 'solid',
    borderColor: theme.accent.main,
  }),
  background: (title: string, positionY: number, scale: number) => ({
    width: '100%',
    height: '100%',
    backgroundImage: `url("/assets/images/${Case.kebab(title)}.jpg")`,
    backgroundSize: 'cover',
    backgroundPositionY: `${positionY * 100}%`,
    position: 'absolute',
    transform: `scale(${scale})`,
    transition: `transform 0.2s`,
  }),
  ripple: {
    width: '100%',
    height: '100%',
    color: 'white',
  },
  gradient: {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 75%)`,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
  },
  title: {
    ...shared.typography.h1,
    color: 'white',
    margin: dimensions.gutterMedium,
    marginBottom: dimensions.gutterLarge,
  },
}));
