export interface userModal {
  postId: number;
  id: number;
  email: string;
  name: string;
  body: string;
}

export interface IEmployeesModal {
  id: number;
  name: string;
  email: string;
  address: string;
  password: string;
  authorization: string;
}
export const EmployeesModal: IEmployeesModal = {
  name: "",
  email: "",
  address: "",
  id: 0,
  password: "",
  authorization: "",
};

export interface IPostModal {
  body: string;
  id: number;
  likes: number;
  title: string;
  userId: number;
  liked: number[];
  images:string[];
}

export const PostModal: IPostModal = {
  body: "",
  id: 0,
  likes: 0,
  title: "",
  userId: 0,
  liked: [],
  images: [],
};

export interface IComments {
  id: number;
  email: string;
  name: string;
  body: string;
  postId: number;
}
export const Commnets: IComments = {
  id: 0,
  email: "",
  name: "",
  body: "",
  postId: 1,
};

