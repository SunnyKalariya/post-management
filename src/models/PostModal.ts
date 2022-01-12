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
  profileImg: string;
}
export const EmployeesModal: IEmployeesModal = {
  name: "",
  email: "",
  address: "",
  id: 0,
  password: "",
  authorization: "",
  profileImg: "",
};

export interface IEmployeeError {
  name: boolean;
  email: boolean;
  address: boolean;
  profileImg: boolean;
  authorization: boolean;
  password: boolean;
}

export const EmployeeError: IEmployeeError = {
  name: false,
  email: false,
  address: false,
  profileImg: false,
  authorization: false,
  password: false,
};

export interface IPostModal {
  body: string;
  id: number;
  likes: number;
  title: string;
  userId: number;
  liked: number[];
  images: string;
}

export const PostModal: IPostModal = {
  body: "",
  id: 0,
  likes: 0,
  title: "",
  userId: 0,
  liked: [],
  images: "",
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
