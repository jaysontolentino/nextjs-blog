import Head from 'next/head'
import Layout from '../../components/layout'
import Date from './../../components/date'
import {getPostData, getPostsId} from './../../lib/posts'
import utilStyles from './../../styles/utils.module.css'

export default function Post({post}) {
    return (
        <Layout>

            <Head>
                <title>{post.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{post.title}</h1>
                <div className={utilStyles.lightText}>
                <Date dateString={post.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </article>
        </Layout>
    )
    
}

export async function getStaticPaths() {

    const paths = getPostsId()

    console.log(paths)

    return {
        fallback: false,
        paths
    }
}

export async function getStaticProps({params}) {

    const post = await getPostData(params.id)

    return {
        props: {
            post
        }
    }
}