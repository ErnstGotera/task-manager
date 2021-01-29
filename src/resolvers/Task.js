function postedBy(parent, args, context) {
  return context.prisma.task
    .findUnique({ where: { id: parent.id } })
    .postedBy();
}

module.exports = {
  postedBy,
};
