import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import Case from 'case';
import React from 'react';
import { Ripple } from './buttons/ripple';
import { Card } from './card';

export function PhotoCard(props: {
  imageFileName: string;
  title?: string;
  style?: React.CSSProperties;
  positionY?: number;
  onClick?: () => void;
  format?: 'jpg' | 'png';
}) {
  const { styles } = useStyle();
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const shouldRenderTitle = !!props.title;

  return (
    <Card.Wrapper
      style={combine([
        styles.container(!props.onClick, isMouseOver),
        props.style,
      ])}
    >
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
            props.imageFileName,
            props.positionY || 0.5,
            isMouseOver ? 1.1 : 1,
            props.format
          )}
        />

        {shouldRenderTitle && (
          <div style={styles.gradient}>
            <div style={styles.title}>{props.title}</div>
          </div>
        )}
      </Ripple>
    </Card.Wrapper>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: (disabled: boolean, isMouseOver: boolean) => ({
    height: 160,
    borderWidth: 2,
    borderStyle: disabled ? undefined : 'solid',
    borderColor: isMouseOver ? theme.clickable.strong : theme.clickable.main,
    boxShadow: isMouseOver
      ? `0 0 3px 0 ${theme.clickable.main}`
      : shared.shadow.boxShadow,
  }),
  background: (
    title: string,
    positionY: number,
    scale: number,
    format: 'jpg' | 'png' = 'jpg'
  ) => ({
    width: '100%',
    height: '100%',
    backgroundImage: `url("/assets/images/${Case.kebab(title)}.${format}")`,
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
    ...shared.typography.title,
    color: 'white',
    margin: dimensions.gutterMedium,
    marginBottom: dimensions.gutterLarge,
  },
}));
