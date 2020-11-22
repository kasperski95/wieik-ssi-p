import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';

export function Stepper(props: {
  steps: {
    label: string;
    renderer?: () => React.ReactNode;
    onClick?: () => void;
  }[];
  activeIndex: number;
  style?: React.CSSProperties;
}) {
  const { styles } = useStyle();
  const shouldRenderBody = !!props.steps[props.activeIndex].renderer;

  return (
    <React.Fragment>
      <div style={combine([styles.container, props.style])}>
        {props.steps.map((step, index) => {
          const isActive = index === props.activeIndex;
          const isClickable = index < props.activeIndex && !!step.onClick;
          return (
            <div
              key={step.label}
              style={styles.stepWrapper}
              onClick={index < props.activeIndex ? step.onClick : undefined}
            >
              <div style={styles.circle(isActive)}>{index + 1}</div>
              <div style={styles.label(isActive, isClickable)}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>

      {shouldRenderBody && props.steps[props.activeIndex].renderer!()}
    </React.Fragment>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  stepWrapper: {
    display: 'inline-block',
  },
  circle: (active: boolean) => ({
    ...shared.typography.h2,
    display: 'inline-flex',
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: active ? theme.accent.main : theme.active.contrast.weak,
    color: active ? theme.accent.main : theme.active.contrast.weak,
    borderStyle: 'solid',
    borderRadius: '100%',
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: dimensions.gutterSmall,
    marginRight: dimensions.gutterSmall,
  }),
  label: (active: boolean, clickable: boolean) => ({
    ...shared.typography.h2,
    color: active
      ? theme.accent.main
      : clickable
      ? theme.clickable.main
      : theme.active.contrast.weak,
    userSelect: 'none',
    display: 'inline-flex',
  }),
}));
