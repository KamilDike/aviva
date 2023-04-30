export async function wait(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1100));
}
