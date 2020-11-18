import React from 'react';

export function combine(styles: React.CSSProperties[]) {
  return styles.reduce((acc, style) => {
    return { ...acc, ...style };
  }, {} as React.CSSProperties);
}
