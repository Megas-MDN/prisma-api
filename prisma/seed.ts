import { PrismaClient } from '@prisma/client';
import { users } from './seeds/users';
import { clusters } from './seeds/cluster';
import { clusterUsers } from './seeds/clustersUsers';
import { group } from './seeds/group';
import { modered } from './seeds/Modered';
import { recomend } from './seeds/recommend';
import { posts } from './seeds/posts';
import { commentAndLike } from './seeds/commentAndLike';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  await prisma.cluster.createMany({
    data: clusters,
    skipDuplicates: true,
  });

  await prisma.clusterUsers.createMany({
    data: clusterUsers,
    skipDuplicates: true,
  });

  await prisma.group.createMany({
    data: group,
    skipDuplicates: true,
  });

  await prisma.modered.createMany({
    data: modered,
    skipDuplicates: true,
  });

  await prisma.recomend.createMany({
    data: recomend,
    skipDuplicates: true,
  });

  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });

  await prisma.commentAndLike.createMany({
    data: commentAndLike,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
