import type { Meta, StoryObj } from "@storybook/react";
import { Chatbot } from "./Chatbot";

const meta: Meta<typeof Chatbot> = {
  title: "Chatbot/Chatbot",
  component: Chatbot,
  tags: ["autodocs"],
  args: {
    title: "AI Chatbot"
  }
};

export default meta;

type Story = StoryObj<typeof Chatbot>;

export const Default: Story = {}; 