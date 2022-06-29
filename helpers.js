const updateListById = (l, searchId, updateFn) => {
  const filtered = l.filter(({ id }) => id === searchId);

  if (filtered.length > 1) {
    throw "List has duplicated ids.";
  }
  if (filtered.length === 0) {
    throw "Item not found.";
  }

  const player = filtered[0];
  return [
    ...l.filter(({ id }) => id !== searchId),
    { ...player, ...updateFn(player) },
  ];
};

export { updateListById };
