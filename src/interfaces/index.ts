export interface PostFromClient {
  id?: string;
  title: string;
  content: string;
  userId: string;
}

export enum TableTypes {
  Modered = 'modered',
  Cluster = 'cluster',
  User = 'user',
  Group = 'group',
  Recomend = 'recomend',
  Post = 'post',
  CommentAndLike = 'commentAndLike',
  ClusterUsers = 'clusterUsers',
}

export enum UserTableTypes {
  User = 'user',
}
