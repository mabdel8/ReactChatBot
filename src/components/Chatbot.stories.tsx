import type { Meta, StoryObj } from "@storybook/react";
import { Chatbot } from "./Chatbot";

const meta: Meta<typeof Chatbot> = {
  title: "Chatbot/Chatbot",
  component: Chatbot,
  tags: ["autodocs"],
  args: {
    title: "AI Chatbot",
    apiKey: "your-api-key-here" // Replace with your actual API key for testing
  }
};

export default meta;

type Story = StoryObj<typeof Chatbot>;

export const Default: Story = {}; 