import { PrismaClient } from '@prisma/client';
  import { user } from './seeds/user';
import { cluster } from './seeds/cluster';
import { clusterUsers } from './seeds/clusterUsers';
import { group } from './seeds/group';
import { modered } from './seeds/modered';
import { recomend } from './seeds/recomend';
import { post } from './seeds/post';
import { commentAndLike } from './seeds/commentAndLike';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: user,
    skipDuplicates: true,
  });

await prisma.cluster.createMany({
    data: cluster,
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
    data: post,
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