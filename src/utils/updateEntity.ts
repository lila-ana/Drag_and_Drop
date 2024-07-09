export async function updateEntity<T>(
  findEntity: () => Promise<T | null>,
  saveEntity: (entity: T) => Promise<T>,
  updates: Partial<T>
): Promise<T | null> {
  const entity = await findEntity();

  if (!entity) {
    return null;
  }

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      (entity as any)[key] = value;
    }
  }

  return saveEntity(entity);
}
