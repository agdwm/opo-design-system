declare module "*.manifest.json" {
  const value: {
    icons: Array<{ name: string }>;
  };

  export default value;
}
