// src/components/opo-button/opo-button.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Atoms/Button',
  component: 'opo-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: null, // Usamos el archivo .mdx como página principal
      description: {
        component: 'Botón principal del Design System OPO. Soporta variantes, tamaños, estados de carga y modo polymorphic.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
      description: 'Estilo visual del botón',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Tamaño del botón',
      table: { defaultValue: { summary: 'md' } },
    },
    loading: { control: 'boolean', description: 'Muestra estado de carga' },
    fullWidth: { control: 'boolean', description: 'Ocupa el 100% del ancho' },
    disabled: { control: 'boolean' },
    as: {
      control: 'select',
      options: ['button', 'a'],
      description: 'Elemento a renderizar (polymorphic)',
    },
  },
};

export default meta;

type Story = StoryObj;

function renderButton(args: Record<string, unknown>, label = 'Boton Principal') {
  const variant = (args.variant as string) ?? 'primary';
  const size = (args.size as string) ?? 'md';
  const as = (args.as as string) ?? 'button';
  const href = typeof args.href === 'string' ? args.href : '';
  const loading = args.loading ? ' loading' : '';
  const fullWidth = args.fullWidth ? ' full-width' : '';
  const disabled = args.disabled ? ' disabled' : '';
  const hrefAttr = href ? ` href="${href}"` : '';

  return `<opo-button variant="${variant}" size="${size}" as="${as}"${hrefAttr}${loading}${fullWidth}${disabled}>${label}</opo-button>`;
}

// ==================== VARIANTS ====================
export const Primary: Story = {
  args: { variant: 'primary' },
  render: args => renderButton(args, 'Boton Principal'),
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: args => renderButton(args, 'Secundario'),
};

export const Outline: Story = {
  args: { variant: 'outline' },
  render: args => renderButton(args, 'Outline'),
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: args => renderButton(args, 'Ghost'),
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
  render: args => renderButton(args, 'Eliminar'),
};

export const Link: Story = {
  args: { variant: 'link', as: 'a', href: '#' },
  render: args => renderButton(args, 'Enlace como boton'),
};

// ==================== ESTADOS ====================
export const Loading: Story = {
  args: { variant: 'primary', loading: true },
  render: args => renderButton(args, 'Procesando...'),
};

export const WithIcons: Story = {
  render: () => `
    <opo-button variant="primary">
      <span slot="icon-start">🔍</span>
      Buscar
      <span slot="icon-end">→</span>
    </opo-button>
  `,
};

export const IconOnly: Story = {
  render: () => `
    <opo-button size="icon" aria-label="Buscar" variant="primary">
      <span slot="icon-start">🔍</span>
    </opo-button>
  `,
};

export const FullWidth: Story = {
  args: { variant: 'primary', fullWidth: true },
  render: args => `
    <div style="width: 320px;">
      ${renderButton(args, 'Boton de ancho completo')}
    </div>
  `,
  parameters: { layout: 'padded' },
};
