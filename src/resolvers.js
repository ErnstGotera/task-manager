const { hash, compare } = require('bcryptjs');
const {sign} = require('jsonwebtoken');

module.exports = {
  Query: {
    getTasks(parent, args, context, info) {
      return context.prisma.task.findMany();
    }
  },

  Mutation: {
    signup: async (parent, args, context, info) => {
      const password = await hash(args.password, 10);
    
      const user = await context.prisma.user.create({
        data: { ...args, password },
      });
    
      const token = sign({ userId: user.id }, process.env.JWT_SECRET);
    
      return {
        token,
        user,
      };
    },
    login: async ( args, context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) {
        throw new Error('No such user found');
      }
    
      const valid = await compare(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
    
      const token = sign({ userId: user.id }, process.env.JWT_SECRET);
    
      return {
        token,
        user,
      };
    },
    createTask: async (parent, args, context, info) => {
      const { userId } = context;
    
      return await context.prisma.task.create({
        data: {
          description: args.description,
          completed: args.completed,
          postedBy: { connect: { id: userId } },
        },
      });
    }
  },
  Task: {
    postedBy(parent, args, context) {
      return context.prisma.task
        .findUnique({ where: { id: parent.id } })
        .postedBy();
    }
  },
  User: {
    tasks: (parent, args, context) => {
      return context.prisma.user.findUnique({ where: { id: parent.id } }).tasks();
    }
  },
};