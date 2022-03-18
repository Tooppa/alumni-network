import type { NextPage } from 'next'
import { useQuery, useQueryClient } from 'react-query'
import Post from '../../Components/Post'
import CreatePost from './CreatePost'
import { getPosts } from '../../Queries/Post'
import PostList from '../../Components/PostList'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Previews from './Previews'
import { PostType } from '../../Types/Data'

const Timeline: NextPage = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<Array<PostType>>('posts', () => getPosts(token), {enabled: !!token})

    if (status === 'success')
        return (
            <>
                <Previews />
                {/* TODO: Get current topic, group, reply or user id here */}
                {/* Using topic id 1 for now */}
                <CreatePost topicId={1} />  
                <PostList data={data} />
            </>
        )
    else {
        return (
          <>
            <Previews />
            {/* TODO: Get current topic, group, reply or user id here */}
            {/* Using topic id 1 for now */}
            <CreatePost topicId={1} />
          </>
        );
    }
}

export default Timeline