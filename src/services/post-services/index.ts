import axios from "axios";
import { IComments, IPostModal } from "../../models/PostModal";
class PostServices {
  getPost = async (): Promise<any> => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  getPostById = async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  addPost = async (data: IPostModal): Promise<any> => {
    try {
      const response = await axios.post(`http://localhost:3001/posts`, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  updatePost = async (data: IPostModal): Promise<any> => {
    try {
      const response = await axios.put(
        `http://localhost:3001/posts/${data.id}`,
        data
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  deletePostById = async (id: number): Promise<any> => {
    try {
      const response = await axios.delete(`http://localhost:3001/posts/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  getCommentsByID = async (postId: number): Promise<any> => {
    try {
      const response = await axios.get(
        `http://localhost:3001/comments?postId=${postId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  addCommentsByPostId = async (data: IComments): Promise<any> => {
    try {
      const response = await axios.post("http://localhost:3001/comments", data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  deleteCommentsByPostId = async (id: number): Promise<any> => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/comments/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export default PostServices;
