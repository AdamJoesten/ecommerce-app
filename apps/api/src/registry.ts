import { container } from "tsyringe";

export const rootContainer = container;
export const orderContainer = rootContainer.createChildContainer()