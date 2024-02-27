import type { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";
import { CloudinaryInputUi } from "./cloudinary-input-ui.component";

import { theme } from "@app/core/themes";
import { ThemeProvider } from "react-admin";

export default {
  title: "Common/Cloudinary Input",
  component: CloudinaryInputUi,
} as ComponentMeta<typeof CloudinaryInputUi>;

const Template: ComponentStory<typeof CloudinaryInputUi> = (args) => (
  <ThemeProvider theme={theme}>
    <CloudinaryInputUi {...args} />
  </ThemeProvider>
);

export const View = Template.bind({});
View.args = {
  label: "Головне зоображення",
};
