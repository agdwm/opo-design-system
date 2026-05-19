// Definición de variants
const buttonVariants = {
  variants: {
    variant: {
      primary: 'opo-button--primary',
      secondary: 'opo-button--secondary',
      outline: 'opo-button--outline',
      ghost: 'opo-button--ghost',
      destructive: 'opo-button--destructive',
      link: 'opo-button--link',
    },
    size: {
      sm: 'opo-button--sm',
      md: 'opo-button--md',
      lg: 'opo-button--lg',
      icon: 'opo-button--icon',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
} as const;

// Función que genera las clases
export function getButtonClasses(props: {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  loading?: boolean;
}) {
  const classes: string[] = ['opo-button'];

  // Variant
  if (props.variant) {
    classes.push(buttonVariants.variants.variant[props.variant] || buttonVariants.variants.variant.primary);
  } else {
    classes.push(buttonVariants.variants.variant[buttonVariants.defaultVariants.variant]);
  }

  // Size
  if (props.size) {
    classes.push(buttonVariants.variants.size[props.size] || buttonVariants.variants.size.md);
  } else {
    classes.push(buttonVariants.variants.size[buttonVariants.defaultVariants.size]);
  }

  // Modificadores booleanos
  if (props.fullWidth) classes.push('opo-button--full-width');
  if (props.loading) classes.push('opo-button--loading');

  return classes.join(' ');
}
