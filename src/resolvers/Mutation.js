const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return {
    token,
    user,
  };
}

async function createTask(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.task.create({
    data: {
      description: args.description,
      completed: args.completed,
      postedBy: { connect: { id: userId } },
    },
  });
}

module.exports = {
  signup,
  login,
  createTask,
};
