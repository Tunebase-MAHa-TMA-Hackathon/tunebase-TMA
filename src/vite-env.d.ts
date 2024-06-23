/// <reference types="vite/client" />

interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    ethereum: any;
}

declare module "*.svg";
declare module "*.png?url";
declare module "*.jpeg?url";
declare module "*.jpg?url";
