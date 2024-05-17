export const sliceName = (name: string): string => {
  return name.slice(0, name.length - 5);
};

export const addMinaText = (name: string): string => {
  return `${name}.mina`;
};
