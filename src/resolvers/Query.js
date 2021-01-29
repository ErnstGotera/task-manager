function getTasks(parent, args, context, info) {
  return context.prisma.task.findMany();
}

module.exports = {
  getTasks,
};
