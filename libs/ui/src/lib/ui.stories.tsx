import type { Meta, StoryObj } from '@storybook/react-vite';
import { EcommerceUi } from './ui';
import { expect } from 'storybook/test';

const meta = {
  component: EcommerceUi,
  title: 'EcommerceUi',
} satisfies Meta<typeof EcommerceUi>;
export default meta;

type Story = StoryObj<typeof EcommerceUi>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/EcommerceUi/gi)).toBeTruthy();
  },
} satisfies Story;
