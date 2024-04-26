export enum BAG_VARIANTS {
  GREY = "grey",
  GRADIENT = "gradient",
}

export type BagProps = {
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
  variant?: BAG_VARIANTS;
};
