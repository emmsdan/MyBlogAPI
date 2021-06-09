import express from 'express';

import routes from '@settings/routes';
import {
  exceptionHandler,
  joiValidatorHandler,
  authorizedAdminUser
} from '@middleware/validation';

import { DataTypes, joify } from '@middleware/datatype';
import { BlogPostSchema as BlogSchemaSample } from '@schema';
// import Response from '@response';

import AllBlog, {
  getBlogInfo, getUsersBlog, updateBlogInfo, deleteBlog, createBlog, 
} from './blog';
const BLOG = routes.BLOG;
export const autoPath = BLOG.path.toLowerCase();
const BlogRoute = express.Router();
/** ------------------ | create new post | --------------- **/
let PostSchema = joify(BlogSchemaSample(DataTypes), [], null);
BlogRoute.post(
  BLOG.FETCH_ALL,
  authorizedAdminUser,
  joiValidatorHandler(PostSchema),
  exceptionHandler(createBlog));

/** ------------------ | End of create post | --------- **/

/** ------------------ | update a post | --------------- **/
PostSchema = joify(BlogSchemaSample, [['blogId', 'string']], null);
BlogRoute.patch(
  BLOG.FETCH,
  authorizedAdminUser,
  joiValidatorHandler(PostSchema),
  exceptionHandler(updateBlogInfo));

/** ------------------ | End of update post | --------- **/

/** ------------------ | delete a post | --------------- **/
PostSchema = joify({}, [['blogId', 'string']], null);
BlogRoute.delete(
  BLOG.FETCH,
  joiValidatorHandler(PostSchema),
  exceptionHandler(deleteBlog));

/** ------------------ | End of delete a post | --------- **/

/** ------------------ | get all  user post (paginated) | --------------- **/
const BlogsSchema = joify({}, [['pageSize', 'number'], ['page', 'number'], ['userId', 'string', 'optional'], ['type', 'string', 'optional']], null);
BlogRoute.get(
  BLOG.FETCH_USER,
  joiValidatorHandler(BlogsSchema),
  exceptionHandler(getUsersBlog));

/** ------------------ | End of get all user post (paginated) | --------- **/

/** ------------------ | get all Blogs (paginated) | --------------- **/
BlogRoute.get(
  BLOG.FETCH_ALL,
  joiValidatorHandler(BlogsSchema),
  authorizedAdminUser,
  exceptionHandler(AllBlog));

/** ------------------ | End of get all Blogs (paginated) | --------- **/

/** ------------------ | get single Blog | --------------- **/
const blogSchema = joify({}, [['blogId', 'string']], null);
BlogRoute.get(
  BLOG.FETCH,
  joiValidatorHandler(blogSchema),
  exceptionHandler(getBlogInfo));
/** ------------------ | End of get single Blog | --------- **/

export default BlogRoute;
