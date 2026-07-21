export type HomeDTO = {
  homeImageUrl: string;
  fullName: string;
  title: string;
  bio: string;
  email: string;
  githubLink: string;
  linkedInLink: string;
  cvUrl: string;
};
export type CreateHomeDTO = {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  githubLink: string;
  linkedInLink: string;
};
export type UpdateHomeDTO = {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  githubLink: string;
  linkedInLink: string;
};
export type AddHomeFiles = {
  homeImage?: File ;
  cv?: File ;
}