import { readonly } from 'vue'
import PostsModule from './posts'
import UsertsModule from './users'
import CommentsModule from './comments'
import TodosModule from './todos'

export default readonly({
  Posts: PostsModule,
  Users: UsertsModule,
  Comments: CommentsModule,
  Todos: TodosModule
})
