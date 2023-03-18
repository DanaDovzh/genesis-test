export interface CourseInterface {
  id: string;
  title: string;
  description: string;
  previewImageLink: string;
  lessonsCount: number;
  rating: number;
  meta: {
    skills: string[];
    courseVideoPreview: { link: string };
  };
  lessons: any[]
};

export interface PaginatorInterface {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}
