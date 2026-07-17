
export type ProjectDTO = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  techStack: string;
  githubLink: string;
  liveLink: string;
  createdAt: string; 
  updatedAt: string | null; 
};

export type CreateProjectDTO = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  techStack: string;
  githubLink: string;
  liveLink: string;
};

export type UpdateProjectDTO = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  techStack: string;
  githubLink: string;
  liveLink: string;
};
