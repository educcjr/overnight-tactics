const updateListById = <T extends { id: string }>(l: T[], searchId: string, updateFn: (item: T) => Partial<T>) => {
  const filtered = l.filter(({ id }) => id === searchId);

  if (filtered.length > 1) {
    throw "List has duplicated ids.";
  }
  if (filtered.length === 0) {
    throw "Item not found.";
  }

  const item = filtered[0];
  return [
    ...l.filter(({ id }) => id !== searchId),
    { ...item, ...updateFn(item) },
  ];
};

const consumeResource = (res: number, cost: number) => {
  if (res - cost < 0) {
    throw "Unavailable resources.";
  }
  return res - cost;
};

export { updateListById, consumeResource };
