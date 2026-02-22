type Item = {
  shouldRender?: boolean | (() => boolean);
};

export const shouldRenderItem = <T extends Item>(item: T) => {
  if (typeof item.shouldRender === 'boolean') {
    return item.shouldRender;
  }

  if (typeof item.shouldRender === 'function') {
    return item.shouldRender();
  }

  return true;
};
